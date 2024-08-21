package br.org.serratec.influencerforyou.service;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import br.org.serratec.influencerforyou.dto.CampaignDto;
import br.org.serratec.influencerforyou.dto.ImageDto;
import br.org.serratec.influencerforyou.model.Campaign;
import br.org.serratec.influencerforyou.model.Company;
import br.org.serratec.influencerforyou.model.Image;
import br.org.serratec.influencerforyou.model.Niche;
import br.org.serratec.influencerforyou.model.Role;
import br.org.serratec.influencerforyou.model.StatusAvaliation;
import br.org.serratec.influencerforyou.model.StatusDb;
import br.org.serratec.influencerforyou.repository.CampaignRepository;
import br.org.serratec.influencerforyou.repository.CompanyRepository;
import br.org.serratec.influencerforyou.repository.ImageRepository;
import br.org.serratec.influencerforyou.repository.NicheRepository;
import jakarta.validation.Valid;

@Service
public class CampaignService {

	@Autowired
	private CampaignRepository repository;

	@Autowired
	private DetailsImp detailsImp;

	@Autowired
	private ImageService imageService;

	@Autowired
	private ImageRepository imageRepository;

	@Autowired
	private NicheRepository nicheRepository;

	@Transactional(readOnly = true)
	public Page<CampaignDto> findAll(Pageable pageable) {
		return repository.findAll(pageable).map(campaign -> CampaignDto.toDto(campaign));
	}

	@Transactional(readOnly = true)
	public Optional<CampaignDto> findForId(Long id) {
		Optional<Campaign> campaign = repository.findById(id);
		return campaign.map(CampaignDto::toDto);
	}

	@Transactional
	public Optional<CampaignDto> registerCampaign(@Valid CampaignDto campaignDto, Long companyId, MultipartFile file)
			throws IOException {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		UserDetails details = detailsImp.loadUserByUsername(username);

		if (!(details instanceof Company)) {
			throw new UsernameNotFoundException("Company not found " + username);
		}

		Company company = (Company) details;
		Role userRole = company.getRole();

		if (userRole != Role.EMPRESA && userRole != Role.ADMINISTRADOR) {
			throw new AccessDeniedException("User does not have permission to create campaigns");
		}

		Campaign campaignEntity = campaignDto.toEntity();
		campaignEntity.setCompany(company);

		campaignEntity.setStatusdb(StatusDb.ACTIVE);
		campaignEntity.setStatusAvaliation(StatusAvaliation.PENDING);

		Optional<Niche> nicheOpt = nicheRepository.findById(campaignDto.getNiche().id());
		if (!nicheOpt.isPresent()) {
			throw new IllegalStateException("Niche not found with id " + campaignDto.getNiche());
		}
		campaignEntity.setNiche(nicheOpt.get());

		// Adicionando logs para depuração
		if (file == null || file.isEmpty()) {
			throw new IllegalArgumentException("File is null or empty");
		}

		// Inserir a imagem usando o serviço de imagem
		ImageDto savedImageDto = imageService.insert(file);

		if (savedImageDto == null || savedImageDto.getId() == null) {
			throw new IllegalStateException("Failed to save image");
		}

		// Buscar a imagem salva no repositório
		Optional<Image> imageOpt = imageRepository.findById(savedImageDto.getId());

		if (!imageOpt.isPresent()) {
			throw new IllegalStateException("Image not found with id " + savedImageDto.getId());
		}

		// Associar a imagem salva à entidade de campanha
		campaignEntity.setImage(imageOpt.get());

		// Salvar a entidade de campanha no repositório
		Campaign savedCampaign = repository.save(campaignEntity);

		// Converter a entidade de campanha salva para DTO e retornar como Optional
		return Optional.of(CampaignDto.toDto(savedCampaign));

	}
	 public CampaignService(CampaignRepository repository, NicheRepository nicheRepository) {
	        this.repository = repository;
	        this.nicheRepository = nicheRepository;
	    }

	public Optional<CampaignDto> updateCampaign(@Valid CampaignDto campaignDto, Long id, Long companyId) {
        Optional<Campaign> existingCampaignOpt = repository.findById(id);
        if (existingCampaignOpt.isPresent()) {
            Campaign existingCampaign = existingCampaignOpt.get();

            // Atualizar campos da entidade existente com os valores do DTO
            existingCampaign.setBudget(campaignDto.getBudget());
            existingCampaign.setName(campaignDto.getName());
            existingCampaign.setTasks(campaignDto.getTasks());
            existingCampaign.setWage(campaignDto.getWage());

            // Atualizar Niche se ID estiver presente no DTO
            if (campaignDto.getNiche() != null) {
                Optional<Niche> nicheOpt = nicheRepository.findById(campaignDto.getNiche().id());
                nicheOpt.ifPresentOrElse(
                    niche -> existingCampaign.setNiche(niche),
                    () -> { throw new IllegalArgumentException("Niche not found with id " + campaignDto.getNiche()); }
                );
            }

            // Atualizar StatusAvaliation se presente no DTO
            if (campaignDto.getStatusAvaliation() != null) {
                existingCampaign.setStatusAvaliation(campaignDto.getStatusAvaliation());
            }

            // Atualizar StatusDb se presente no DTO
            if (campaignDto.getStatusdb() != null) {
                existingCampaign.setStatusdb(campaignDto.getStatusdb());
            }

            // Atualizar Image se presente no DTO
            if (campaignDto.getImage() != null) {
                existingCampaign.setImage(campaignDto.getImage());
            }

            Campaign updatedCampaign = repository.save(existingCampaign);
            return Optional.of(CampaignDto.toDto(updatedCampaign));
        }
        return Optional.empty();
    }
	@Transactional
	public Optional<CampaignDto> approveCompany(Long id) {
		Optional<Campaign> campaignOpt = repository.findById(id);
		if (campaignOpt.isPresent()) {
			Campaign campaign = campaignOpt.get();
			campaign.setStatusAvaliation(StatusAvaliation.APPROVED);
			repository.save(campaign);
			return Optional.of(CampaignDto.toDto(campaign));
		} else {
			return Optional.empty();
		}
	}

	@Transactional
	public Optional<CampaignDto> rejectCompany(Long id) {
		Optional<Campaign> campaignOpt = repository.findById(id);
		if (campaignOpt.isPresent()) {
			Campaign campaign = campaignOpt.get();
			campaign.setStatusAvaliation(StatusAvaliation.REJECTED);
			repository.save(campaign);
			return Optional.of(CampaignDto.toDto(campaign));
		} else {
			return Optional.empty();
		}
	}

	@Transactional
	public void deleteCampaign(Long id) {
		Optional<Campaign> campaign = repository.findById(id);
		if (campaign.isPresent()) {
			Campaign campaignEntity = campaign.get();
			campaignEntity.setStatusdb(StatusDb.DELETED);
			repository.save(campaignEntity);
		}
	}

	public ImageDto updateCampaignImage(MultipartFile file, Long campaignId) throws IOException {

		Optional<Campaign> campaignOpt = repository.findById(campaignId);
		if (!campaignOpt.isPresent()) {
			throw new IllegalArgumentException("Campaign not found");
		}

		Campaign campaign = campaignOpt.get();
		ImageDto updatedImageDto = imageService.update(campaign.getImage().getId(), file);
		Optional<Image> updatedImageOpt = imageRepository.findById(updatedImageDto.getId());

		if (updatedImageOpt.isPresent()) {
			Image updatedImage = updatedImageOpt.get();
			campaign.setImage(updatedImage);
			repository.save(campaign);
			return updatedImageDto;
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"Imagem não encontrada após atualização com o ID: " + updatedImageDto.getId());
		}
	}
}

