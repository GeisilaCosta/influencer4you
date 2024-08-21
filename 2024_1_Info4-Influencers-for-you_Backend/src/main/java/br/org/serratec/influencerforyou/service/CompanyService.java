package br.org.serratec.influencerforyou.service;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.org.serratec.influencerforyou.dto.CompanyDto;
import br.org.serratec.influencerforyou.dto.ImageDto;
import br.org.serratec.influencerforyou.dto.SearchCompanyDTO;
import br.org.serratec.influencerforyou.dto.SocialMediasDto;
import br.org.serratec.influencerforyou.model.Company;
import br.org.serratec.influencerforyou.model.Image;
import br.org.serratec.influencerforyou.model.Role;
import br.org.serratec.influencerforyou.model.SocialMedias;
import br.org.serratec.influencerforyou.model.StatusAvaliation;
import br.org.serratec.influencerforyou.model.StatusDb;
import br.org.serratec.influencerforyou.repository.CompanyRepository;
import br.org.serratec.influencerforyou.repository.ImageRepository;
import br.org.serratec.influencerforyou.repository.NicheRepository;
import br.org.serratec.influencerforyou.repository.SocialMediasRepository;
import br.org.serratec.influencerforyou.repository.TargetAudienceRepository;
import jakarta.validation.Valid;

@Service
public class CompanyService {

	@Autowired
	private CompanyRepository repository;

	@Autowired
	private NicheRepository nicheRepository;

	@Autowired
	private TargetAudienceRepository targetAudienceRepository;

	@Autowired
	private SocialMediasRepository socialRepository;

	@Autowired
	private ImageService imageService;

	@Autowired
	private ImageRepository imageRepository;

	@Autowired
	private DetailsImp detailsImp;

	@Autowired
	private BCryptPasswordEncoder encoder;

	@Transactional(readOnly = true)
	public Page<SearchCompanyDTO> getCompanyReport(Pageable pageable) {
	    Page<Object[]> results = repository.searchAllCompanies(pageable);
	    List<SearchCompanyDTO> report = results.stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());

	    // Remove duplicates based on idCompany
	    Set<Long> uniqueIds = new HashSet<>();
	    List<SearchCompanyDTO> uniqueReport = report.stream()
	            .filter(dto -> uniqueIds.add(dto.idCompany()))
	            .collect(Collectors.toList());

	    return new PageImpl<>(uniqueReport, pageable, results.getTotalElements());
	}
	
	@Transactional(readOnly = true)
	public Optional<SearchCompanyDTO> findForId(Long id) {
		List<Object[]> results = repository.searchCompanyById(id);
		return results.isEmpty() ? Optional.empty() : Optional.of(convertToDTO(results.get(0)));
	}

	@Transactional
	public Optional<CompanyDto> registerCompany(@Valid CompanyDto company, MultipartFile file) throws IOException {
		Company companyEntity = prepareCompanyEntity(company, file);
		Company savedCompany = repository.save(companyEntity);
		saveSocialMedias(company, savedCompany);
		return Optional.of(CompanyDto.toDto(savedCompany));
	}

	@Transactional
	public Optional<CompanyDto> updateCompany(@Valid CompanyDto companyAlt, Long id) {
	    Optional<Company> companyOpt = repository.findById(id);
	    if (companyOpt.isPresent()) {
	        Company companyEntity = companyOpt.get();

	        // Atualiza apenas os campos que foram fornecidos e são permitidos serem alterados
	        companyEntity.setNameCompany(companyAlt.nameCompany());
	        companyEntity.setEmail(companyAlt.email());
	        companyEntity.setCnpjCpf(companyAlt.cnpjCpf());
	        companyEntity.setCel(companyAlt.cel());

	        // Verifica se foi fornecida uma nova senha; se sim, criptografa e atualiza
	        if (companyAlt.password() != null && !companyAlt.password().isEmpty()) {
	            companyEntity.setPassword(encoder.encode(companyAlt.password()));
	        }

	        // Salva as redes sociais, se houver alterações
	        saveSocialMedias(companyAlt, companyEntity);

	        // Salva e retorna a entidade atualizada
	        repository.save(companyEntity);
	        return Optional.of(CompanyDto.toDto(companyEntity));
	    } else {
	        return Optional.empty();
	    }
	}
	
	@Transactional
	public Optional<CompanyDto> approveCompany(Long id) {
		Optional<Company> companyOpt = repository.findById(id);
	    if (companyOpt.isPresent()) {
	        Company company = companyOpt.get();
	        company.setStatusAvaliation(StatusAvaliation.APPROVED);
	        repository.save(company);
	        return Optional.of(CompanyDto.toDto(company));
	    } else {
	        return Optional.empty();
	    }
	}
	
	
	@Transactional
	public Optional<CompanyDto> rejectCompany(Long id) {
		Optional<Company> companyOpt = repository.findById(id);
	    if (companyOpt.isPresent()) {
	        Company company = companyOpt.get();
	        company.setStatusAvaliation(StatusAvaliation.REJECTED);
	        repository.save(company);
	        return Optional.of(CompanyDto.toDto(company));
	    } else {
	        return Optional.empty();
	    }
	}
	
	@Transactional
	public void deletarCompany(Long id) {
		repository.findById(id).ifPresent(company -> {
			company.setStatusDd(StatusDb.DELETED);
			repository.save(company);
		});
	}
	@Transactional(readOnly = true)
    public Optional<ImageDto> findImageById(Long id) {
        Company company = getAuthenticatedCompany();
        return imageService.findById(company.getImage().getId());
    }

	@Transactional
	public ImageDto updateCompanyImage(Long imageId, MultipartFile file) throws IOException {
		Company company = getAuthenticatedCompany();

		ImageDto updatedImageDto = imageService.update(company.getImage().getId(), file);
		Optional<Image> updatedImageOpt = imageRepository.findById(updatedImageDto.getId());

		if (updatedImageOpt.isPresent()) {
			Image updatedImage = updatedImageOpt.get();
			company.setImage(updatedImage);
			repository.save(company);
			return updatedImageDto;

		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"Imagem não encontrada após atualização com o ID: " + updatedImageDto.getId());
		}
	}

	
	private SearchCompanyDTO convertToDTO(Object[] result) {
		return new SearchCompanyDTO((Long) result[0], // idCompany
				(String) result[1], // nameCompany
				(String) result[2], // email
				(String) result[3], // cel
				convertToLocalDate(result[4]), // dateRegister
				fecthImage((Long) result[0]),
				//(byte[]) result[5], // image
				(String) result[6], // cnpjCpf
				(String) result[7], // roleCompany
				(String) result[8], // statusAvaliation
				(String) result[9], // nicheName
				(String) result[10], // targetAudienceName
				fetchSocialMedias((Long) result[0]) // socialMedias
		);
	}

	private LocalDate convertToLocalDate(Object dateObject) {
		return dateObject instanceof Date ? ((Date) dateObject).toLocalDate() : null;
	}

	private List<SocialMediasDto> fetchSocialMedias(Long companyId) {
		List<SocialMedias> socialMediasList = socialRepository.findByCompanyId(companyId);
		return socialMediasList.stream().map(SocialMediasDto::toDto).collect(Collectors.toList());
	}
	
	private String getBaseUrl() {
		return ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString() + "/images/";
	}
	private Optional<ImageDto> fecthImage (Long id) {
		Optional<Image> imageOpt = imageRepository.findById(id);
		if (imageOpt.isPresent()) {
			Image image = imageOpt.get();
			String url = getBaseUrl() + image.getId();
			return Optional.of(new ImageDto(image.getId(), url));
		} else {
			return Optional.empty();
		}
	
	}

	private Company prepareCompanyEntity(CompanyDto companyDto, MultipartFile file) throws IOException {
		Company companyEntity = companyDto.toEntity();
		companyEntity.setRole(Role.EMPRESA);
		companyEntity.setStatusDd(StatusDb.ACTIVE);
		companyEntity.setStatusAvaliation(StatusAvaliation.PENDING);
		companyEntity.setPassword(encoder.encode(companyDto.password()));
		System.out.println(companyEntity.getPassword());
		System.out.println(companyDto.password());
		

		ImageDto savedImageDto = imageService.insert(file);
		Optional<Image> imageOpt = imageRepository.findById(savedImageDto.getId());
		if (!imageOpt.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"Imagem não encontrada com o ID: " + savedImageDto.getId());
		}
		Image savedImage = imageOpt.get();
		companyEntity.setImage(savedImage);

		companyEntity.setImage(savedImage);
		setNicheAndTargetAudience(companyDto, companyEntity);

		return companyEntity;
	}

	private Company prepareCompanyEntity(CompanyDto companyDto, Long id) {
		Company companyEntity = companyDto.toEntity();
		companyEntity.setId(id);
		setNicheAndTargetAudience(companyDto, companyEntity);
		return companyEntity;
	}

	private void setNicheAndTargetAudience(CompanyDto companyDto, Company companyEntity) {
		nicheRepository.findById(companyDto.idNiche()).ifPresent(companyEntity::setNiche);
		targetAudienceRepository.findById(companyDto.idTargetAudience()).ifPresent(companyEntity::setTargetAudience);
	}

	private void saveSocialMedias(CompanyDto companyDto, Company companyEntity) {
		List<SocialMedias> sociais = companyDto.socialMedias().stream().map(s -> socialconfig(s, companyEntity))
				.collect(Collectors.toList());
		socialRepository.saveAll(sociais);
	}

	private SocialMedias socialconfig(SocialMediasDto socialDto, Company company) {
		SocialMedias entity = socialDto.toEntity();
		entity.setCompany(company);
		return entity;
	}

	private Company getAuthenticatedCompany() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		UserDetails details = detailsImp.loadUserByUsername(username);
		if (!(details instanceof Company)) {
			throw new UsernameNotFoundException("Company not found with email: " + username);
		}
		return (Company) details;
	}

	
}
