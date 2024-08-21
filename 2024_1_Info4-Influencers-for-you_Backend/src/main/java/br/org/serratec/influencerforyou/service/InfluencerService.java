package br.org.serratec.influencerforyou.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

import com.fasterxml.jackson.core.JsonProcessingException;

import br.org.serratec.influencerforyou.dto.AddressDto;
import br.org.serratec.influencerforyou.dto.ImageDto;
import br.org.serratec.influencerforyou.dto.InfluencerDto;
import br.org.serratec.influencerforyou.dto.InfluencerRegisterDto;
import br.org.serratec.influencerforyou.dto.InfluencerRetornoDto;
import br.org.serratec.influencerforyou.dto.SocialMediasDto;
import br.org.serratec.influencerforyou.model.Image;
import br.org.serratec.influencerforyou.model.Influencer;
import br.org.serratec.influencerforyou.model.Niche;
import br.org.serratec.influencerforyou.model.Role;
import br.org.serratec.influencerforyou.model.SocialMedias;
import br.org.serratec.influencerforyou.model.StatusAvaliation;
import br.org.serratec.influencerforyou.model.StatusDb;
import br.org.serratec.influencerforyou.model.TargetAudience;
import br.org.serratec.influencerforyou.repository.ImageRepository;
import br.org.serratec.influencerforyou.repository.InfluencerRepository;
import br.org.serratec.influencerforyou.repository.NicheRepository;
import br.org.serratec.influencerforyou.repository.SocialMediasRepository;
import br.org.serratec.influencerforyou.repository.TargetAudienceRepository;
import br.org.serratec.influencerforyou.util.ConsumoApi;
import br.org.serratec.influencerforyou.util.Mapper;
import jakarta.validation.Valid;

@Service
public class InfluencerService {

	private ConsumoApi consumoApi;

	@Autowired
	private InfluencerRepository influencerRepository;

	@Autowired
	private NicheRepository nicheRepository;

	@Autowired
	private TargetAudienceRepository targetAudienceRepository;

	@Autowired
	private SocialMediasRepository socialMediasRepository;

	@Autowired
	private BCryptPasswordEncoder encoder;

	@Autowired
	private ImageService imageService;

	@Autowired
	private ImageRepository imageRepository;

	@Autowired
	private DetailsImp detailsImp;

	@Transactional(readOnly = true)
	public Page<InfluencerRetornoDto> allInfluencer(Pageable pageable) {
		Page<Influencer> influencers = influencerRepository.findAll(pageable);
		return influencers.map(this::convertToDto);

	}

	@Transactional(readOnly = true)
	public InfluencerRetornoDto getInfluencerById(Long id) {
		Influencer influencer = influencerRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Influencer não encontrado com o ID: " + id));
		return convertToDto(influencer);
	}
	
	@Transactional(readOnly = true)
	public Page<InfluencerRetornoDto> findbyStatusActive(Pageable pageable) {
		Page<Influencer> influencers = influencerRepository.findAll(pageable);
		List<InfluencerRetornoDto> dtos = influencers.getContent().stream()
				.filter(influencer -> influencer.getStatusDb() == StatusDb.ACTIVE).map(this::convertToDto)
				.collect(Collectors.toList());

		return new PageImpl<>(dtos, pageable, influencers.getTotalElements());
	}

	@Transactional
	public InfluencerDto registerInfluencer(@Valid InfluencerRegisterDto influencer, MultipartFile file)
			throws IOException {
		Influencer influencerEntity = influencer.toEntity();

		influencerEntity.setStatusDb(StatusDb.ACTIVE);
		influencerEntity.setStatusAvaliation(StatusAvaliation.PENDING);
		influencerEntity.setRole(Role.INFLUENCER);
		influencerEntity.setPassword(encoder.encode(influencer.password()));

		// Salva a imagem e associa ao influenciador
		ImageDto savedImageDto = imageService.insert(file);
		Optional<Image> imageOpt = imageRepository.findById(savedImageDto.getId());
		if (!imageOpt.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"Imagem não encontrada com o ID: " + savedImageDto.getId());
		}
		Image savedImage = imageOpt.get();
		influencerEntity.setImage(savedImage);

		// Associa o nicho ao influenciador
		Optional<Niche> nicheEntity = nicheRepository.findById(influencer.idNiche());
		if (nicheEntity.isPresent()) {
			influencerEntity.setNiche(nicheEntity.get());
		}

		// Associa o público-alvo ao influenciador
		Optional<TargetAudience> targetAudienceEntity = targetAudienceRepository
				.findById(influencer.idTargetAudience());
		if (targetAudienceEntity.isPresent()) {
			influencerEntity.setTargetAudience(targetAudienceEntity.get());
		}

		// Busca e associa o endereço via CEP se o influenciador ainda não estiver
		// cadastrado
		String json = consumoApi.buscarCEP(influencer.cep());
		try {
			if (!influencerRepository.existsByEmail(influencerEntity.getEmail())) {
				AddressDto enderecoViaCep = Mapper.getMapper().readValue(json, AddressDto.class);
				AddressDto completeAddress = new AddressDto(enderecoViaCep.cep(), enderecoViaCep.logradouro(),
						enderecoViaCep.bairro(), enderecoViaCep.localidade(), enderecoViaCep.uf());

				influencerEntity.setAddress(completeAddress.toEntity());
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		// Salva o influenciador
		Influencer savedInfluencer = influencerRepository.save(influencerEntity);

		// Cria e associa as mídias sociais ao influenciador
		List<SocialMedias> socialMediasList = influencer.socialMedias().stream().map(smDto -> {
			SocialMedias socialMediasEntity = smDto.toEntity();
			socialMediasEntity.setInfluencer(savedInfluencer); // Associa com o influenciador salvo
			return socialMediasEntity;
		}).collect(Collectors.toList());

		socialMediasRepository.saveAll(socialMediasList);

		// Retorna o influenciador convertido para DTO
		return InfluencerDto.toDto(savedInfluencer);
	}

	@Transactional
	public Optional<InfluencerDto> alterInfluencer(Long id, InfluencerRegisterDto influencer) {
		if (influencerRepository.existsById(id)) {
			Influencer influencerEntity = influencerRepository.findById(id).get();
			influencerEntity.setName(influencer.name());
			influencerEntity.setAge(influencer.age());
			influencerEntity.setCel(influencer.cel());
			influencerEntity.setEmail(influencer.email());
			influencerEntity.setCnpjCpf(influencer.cnpjCpf());
			influencerEntity.setImage(influencerEntity.getImage());

			if (influencer.password() != null) {
				influencerEntity.setPassword(encoder.encode(influencer.password()));
			}

			Optional<Niche> nicheEntity = nicheRepository.findById(influencer.idNiche());

			if (nicheEntity.isPresent()) {
				influencerEntity.setNiche(nicheEntity.get());
			}

			Optional<TargetAudience> targetAudienceEntity = targetAudienceRepository
					.findById(influencer.idTargetAudience());

			if (targetAudienceEntity.isPresent()) {
				influencerEntity.setTargetAudience(targetAudienceEntity.get());
			}

			String json = consumoApi.buscarCEP(influencer.cep());
			try {
				AddressDto enderecoViaCep = Mapper.getMapper().readValue(json, AddressDto.class);
				AddressDto completeAddress = new AddressDto(enderecoViaCep.cep(), enderecoViaCep.logradouro(),
						enderecoViaCep.bairro(), enderecoViaCep.localidade(), enderecoViaCep.uf());

				if (influencerEntity.getAddress() == null) {
					influencerEntity.setAddress(completeAddress.toEntity());
				} else {
					influencerEntity.getAddress().setCep(completeAddress.cep());
					influencerEntity.getAddress().setLogradouro(completeAddress.logradouro());
					influencerEntity.getAddress().setBairro(completeAddress.bairro());
					influencerEntity.getAddress().setLocalidade(completeAddress.localidade());
					influencerEntity.getAddress().setUf(completeAddress.uf());
				}

			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}

			Influencer savedInfluencer = influencerRepository.save(influencerEntity);

			// Optional<SocialMediasDto> socials =
			// socialMediasService.updateSocialMedias(id, influencer.socialMedias());

			saveSocialMedias(influencer, savedInfluencer);

			influencerRepository.save(savedInfluencer);

			return Optional.of(InfluencerDto.toDto(savedInfluencer));
		}

		return Optional.empty();
	}

	private void saveSocialMedias(InfluencerRegisterDto influencer, Influencer influencerEntity) {
		List<SocialMedias> socials = influencer.socialMedias().stream().map(s -> socialConfig(s, influencerEntity))
				.toList();

		socialMediasRepository.saveAll(socials);
	}

	private SocialMedias socialConfig(SocialMediasDto socialDto, Influencer influencer) {
		SocialMedias entity = socialDto.toEntity();

		entity.setInfluencer(influencer);
		return entity;
	}

	@Transactional
	public Optional<InfluencerRetornoDto> approveInfluencer(Long id) {
		Optional<Influencer> influencerOpt = influencerRepository.findById(id);
		if (influencerOpt.isPresent()) {
			Influencer influencer = influencerOpt.get();
			influencer.setStatusAvaliation(StatusAvaliation.APPROVED);
			influencerRepository.save(influencer);
			return Optional.of(convertToDto(influencer));
		} else {
			return Optional.empty();
		}
	}

	@Transactional
	public Optional<InfluencerRetornoDto> rejectInfluencer(Long id) {
		Optional<Influencer> influencerOpt = influencerRepository.findById(id);
		if (influencerOpt.isPresent()) {
			Influencer influencer = influencerOpt.get();
			influencer.setStatusAvaliation(StatusAvaliation.REJECTED);
			influencerRepository.save(influencer);
			return Optional.of(convertToDto(influencer));
		} else {
			return Optional.empty();
		}
	}

	@Transactional
	public void deleteInfluencer(Long id) {
		Optional<Influencer> influencer = influencerRepository.findById(id);

		if (influencer.isPresent()) {
			Influencer influencerEntity = influencer.get();
			influencerEntity.setStatusDb(StatusDb.DELETED);
			influencerRepository.save(influencerEntity);
		}
	}

	@Transactional
	public ImageDto updateInfluencerImage(Long imageId, MultipartFile file) throws IOException {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		UserDetails details = detailsImp.loadUserByUsername(username);

		if (!(details instanceof Influencer)) {
			throw new UsernameNotFoundException("Company not found " + username);
		}
		Influencer influencer = (Influencer) details;

		ImageDto updatedImageDto = imageService.update(influencer.getImage().getId(), file);
		Optional<Image> updatedImageOpt = imageRepository.findById(updatedImageDto.getId());

		if (updatedImageOpt.isPresent()) {
			Image updatedImage = updatedImageOpt.get();
			influencer.setImage(updatedImage);
			influencerRepository.save(influencer);
			return updatedImageDto;
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"Imagem não encontrada com o id: " + updatedImageDto.getId());
		}
	}

	private InfluencerRetornoDto convertToDto(Influencer influencer) {
		InfluencerRetornoDto dto = new InfluencerRetornoDto();
		dto.setId(influencer.getId());
		dto.setName(influencer.getName());
		dto.setEmail(influencer.getEmail());
		dto.setAge(influencer.getAge());
		dto.setCnpjCpf(influencer.getCnpjCpf());
		dto.setStatusDb(influencer.getStatusDb());
		dto.setStatusAvaliation(influencer.getStatusAvaliation());
		dto.setNiche(influencer.getNiche());
		dto.setTargetAudience(influencer.getTargetAudience());
		dto.setCel(influencer.getCel());
		dto.setAddress(influencer.getAddress());

		List<SocialMediasDto> socialMediasDtos = new ArrayList<>();
		for (SocialMedias socialMedia : influencer.getSocialMedias()) {
			socialMediasDtos.add(
					new SocialMediasDto(socialMedia.getId(), socialMedia.getSocialMediaName(), socialMedia.getLink()));
		}

		dto.setSocialMedias(socialMediasDtos);

		Optional<ImageDto> imageDto = imageService.findById(influencer.getImage().getId());
		if (imageDto.isPresent()) {
			dto.setImageId(imageDto.get().getId());
			dto.setImageUrl(imageDto.get().getUrl());
		}
		return dto;
	}

	@Transactional(readOnly = true)
	public Page<InfluencerRetornoDto> getInfluencersByNiche(Long nicheId, Pageable pageable) {
		Page<Influencer> influencers = influencerRepository.findByNicheId(nicheId, pageable);
		List<InfluencerRetornoDto> dtos = influencers.getContent().stream()
				.filter(influencer -> influencer.getStatusDb() == StatusDb.ACTIVE).map(this::convertToDto)
				.collect(Collectors.toList());
		return new PageImpl<>(dtos, pageable, influencers.getTotalElements());
	}

}