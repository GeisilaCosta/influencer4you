package br.org.serratec.influencerforyou.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.org.serratec.influencerforyou.dto.ImageDetailDto;
import br.org.serratec.influencerforyou.dto.ImageDto;
import br.org.serratec.influencerforyou.model.Campaign;
import br.org.serratec.influencerforyou.model.Company;
import br.org.serratec.influencerforyou.model.Image;
import br.org.serratec.influencerforyou.repository.CampaignRepository;
import br.org.serratec.influencerforyou.repository.CompanyRepository;
import br.org.serratec.influencerforyou.repository.ImageRepository;

@Service
public class ImageService {

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private CampaignRepository campaignRepository;

	@Autowired
	private ImageRepository imageRepository;

	public String getBaseUrl() {
		return ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString() + "/images/";
	}

	public Page<ImageDto> findAll(Pageable pageable) {
		Page<Image> images = imageRepository.findAll(pageable);
		String url = getBaseUrl();
		return images.map(image -> new ImageDto(image.getId(), url + image.getId()));
	}

	public Optional<ImageDto> findById(Long id) {
		Optional<Image> imageOpt = imageRepository.findById(id);
		if (imageOpt.isPresent()) {
			Image image = imageOpt.get();
			String url = getBaseUrl() + image.getId();
			return Optional.of(new ImageDto(image.getId(), url));
		} else {
			return Optional.empty();
		}
	}

	@Transactional
	public ImageDto insert(MultipartFile file) throws IOException {
		Image img = new Image();
		img.setName(file.getOriginalFilename());
		img.setType(file.getContentType());
		img.setData(file.getBytes());

		img = imageRepository.save(img);
		String url = getBaseUrl() + img.getId();

		return new ImageDto(img.getId(), url);
	}

	@Transactional
	public ImageDto update(Long id, MultipartFile file) throws IOException {
		Optional<Image> imageOpt = imageRepository.findById(id);
		if (imageOpt.isPresent()) {
			Image existingImage = imageOpt.get();
			existingImage.setName(file.getOriginalFilename());
			existingImage.setType(file.getContentType());
			existingImage.setData(file.getBytes());

			Image updatedImage = imageRepository.save(existingImage);
			String url = getBaseUrl() + updatedImage.getId();

			return new ImageDto(updatedImage.getId(), url);
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imagem não encontrada com o ID: " + id);
		}
	}

	@Transactional
	public void delete(Long id) {
		Optional<Image> imageOpt = imageRepository.findById(id);
		if (imageOpt.isPresent()) {
			// Remover o vínculo com Company
			Optional<Company> companyOpt = companyRepository.findByImageId(id);
			if (companyOpt.isPresent()) {
				Company company = companyOpt.get();
				company.setImage(null);
				companyRepository.save(company);
			}

			// Remover o vínculo com Campaign
			Optional<Campaign> campaignOpt = campaignRepository.findByImageId(id);
			if (campaignOpt.isPresent()) {
				Campaign campaign = campaignOpt.get();
				campaign.setImage(null);
				campaignRepository.save(campaign);
			}

			imageRepository.deleteById(id);
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imagem não encontrada com o ID: " + id);
		}
	}

	@Transactional(readOnly = true)
	public Page<ImageDetailDto> getCompanyImages(Pageable pageable) {
		Page<Object[]> results = imageRepository.findCompanyImages(pageable);
		List<ImageDetailDto> dtos = new ArrayList<>();

		for (Object[] result : results) {
			Long imageid = ((Number) result[0]).longValue();
			Long entityId = ((Number) result[1]).longValue();
			String entityName = (String) result[2];
			String url = getBaseUrl() + imageid;

			ImageDetailDto dto = new ImageDetailDto(imageid, entityId, entityName, url);
			dtos.add(dto);
		}
		return new PageImpl<>(dtos, pageable, results.getTotalElements());
	}

	@Transactional(readOnly = true)
	public Page<ImageDetailDto> getCampaignImages(Pageable pageable) {
		Page<Object[]> results = imageRepository.findCampaignImages(pageable);
		List<ImageDetailDto> dtos = new ArrayList<>();

		for (Object[] result : results) {
			Long imageid = ((Number) result[0]).longValue();
			Long entityId = ((Number) result[1]).longValue();
			String entityName = (String) result[2];
			String url = getBaseUrl() + imageid;

			ImageDetailDto dto = new ImageDetailDto(imageid, entityId, entityName, url);
			dtos.add(dto);
		}
		return new PageImpl<>(dtos, pageable, results.getTotalElements());
	}

	@Transactional(readOnly = true)
	public Page<ImageDetailDto> getInfluencerImages(Pageable pageable) {
		Page<Object[]> results = imageRepository.findInfluencerImages(pageable);
		List<ImageDetailDto> dtos = new ArrayList<>();

		for (Object[] result : results) {
			Long imageid = ((Number) result[0]).longValue();
			Long entityId = ((Number) result[1]).longValue();
			String entityName = (String) result[2];
			String url = getBaseUrl() + imageid;

			ImageDetailDto dto = new ImageDetailDto(imageid, entityId, entityName, url);
			dtos.add(dto);
		}
		return new PageImpl<>(dtos, pageable, results.getTotalElements());
	}
	
	
	

}