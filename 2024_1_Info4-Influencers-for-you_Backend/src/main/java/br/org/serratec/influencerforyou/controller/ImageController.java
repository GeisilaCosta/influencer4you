package br.org.serratec.influencerforyou.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.org.serratec.influencerforyou.dto.ImageDetailDto;
import br.org.serratec.influencerforyou.dto.ImageDto;
import br.org.serratec.influencerforyou.model.Image;
import br.org.serratec.influencerforyou.repository.ImageRepository;
import br.org.serratec.influencerforyou.service.ImageService;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/images")
public class ImageController {

	@Autowired
	private ImageService imageService;


	@Autowired
	private ImageRepository imageRepository;

	@GetMapping
	@Operation(summary = "Buscar todas as imagens", description = "Retorna uma lista paginada de todas as imagens")
	public ResponseEntity<Page<ImageDto>> getAllImages(Pageable page) {
		Page<ImageDto> images = imageService.findAll(page);
		return ResponseEntity.ok(images);
	}

	@GetMapping("/{id}")
	@Operation(summary = "Buscar imagem por ID", description = "Retorna uma imagem com o ID especificado")

	public ResponseEntity<byte[]> getImageById(@PathVariable Long id) {
		Optional<Image> imageOpt = imageRepository.findById(id);
		if (imageOpt.isPresent()) {
			Image image = imageOpt.get();

			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-type", image.getType());
			headers.add("Content-length", String.valueOf(image.getData().length));

			return new ResponseEntity<>(image.getData(), headers, HttpStatus.OK);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/companys")
	@Operation(summary = "Buscar todas as imagens vinculadas as empresas", description = "Retorna uma lista paginada de todas as imagens vincuadas as empresas")
	public ResponseEntity<Page<ImageDetailDto>> findCompanyImages(Pageable page) {
		try {
			Page<ImageDetailDto> images = imageService.getCompanyImages(page);
			return ResponseEntity.ok(images);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar imagens de empresas",
					e);
		}
	}

	@GetMapping("/campaigns")
	@Operation(summary = "Buscar todas as imagens vinculadas as campanhas", description = "Retorna uma lista paginada de todas as imagens vincuadas as campanhas")
	public ResponseEntity<Page<ImageDetailDto>> findCampaignImages(Pageable page) {
		try {
			Page<ImageDetailDto> images = imageService.getCampaignImages(page);
			return ResponseEntity.ok(images);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar imagens de campanhas",
					e);

		}
	}
	
	@GetMapping("/influencers")
	@Operation(summary = "Buscar todas as imagens vinculadas aos influencers", description = "Retorna uma lista paginada de todas as imagens vincuadas aos influencers")
	public ResponseEntity<Page<ImageDetailDto>> findInfluencerImages(Pageable page) {
		try {
			Page<ImageDetailDto> images = imageService.getInfluencerImages(page);
			return ResponseEntity.ok(images);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar imagens de influencers",
					e);
		}
	}
	

	@DeleteMapping("/{id}")
	@Operation(summary = "Deletar imagem por ID", description = "Deleta a imagem com o ID especificado")

	public ResponseEntity<Void> deleteImage(@PathVariable Long id) {

		try {
			imageService.delete(id);
			return ResponseEntity.noContent().build();
		} catch (ResponseStatusException e) {
			return ResponseEntity.status(e.getStatusCode()).build();
		}
	}
}

