package br.org.serratec.influencerforyou.controller;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.org.serratec.influencerforyou.dto.ImageDto;
import br.org.serratec.influencerforyou.dto.InfluencerDto;
import br.org.serratec.influencerforyou.dto.InfluencerRegisterDto;
import br.org.serratec.influencerforyou.dto.InfluencerRetornoDto;
import br.org.serratec.influencerforyou.service.InfluencerService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/influencers")
public class InfluencerController {

	@Autowired
	private InfluencerService service;

	@GetMapping
	@Operation(summary = "Buscar todos os influencers", description = "Buscar todos os influencers")
	public ResponseEntity<Page<InfluencerRetornoDto>> getAllInfluencers(Pageable pageable) {
		Page<InfluencerRetornoDto> influencer = service.allInfluencer(pageable);
		return ResponseEntity.ok(influencer);
	}

	@GetMapping("/{id}")
	@Operation(summary = "Buscar influenciador por id", description = "Buscar um influenciador com base no ID")
	public ResponseEntity<InfluencerRetornoDto> getInflurncerById(@PathVariable Long id) {
		InfluencerRetornoDto result = service.getInfluencerById(id);
		return ResponseEntity.ok(result);
	}
	

	@GetMapping("/active")
	@Operation(summary = "Buscar influenciador ativos no banco de dados", description = "Buscar um influenciador ativos no banco de dados")
	public ResponseEntity<Page<InfluencerRetornoDto>> getActiveInfluencers(Pageable pageable){
		Page<InfluencerRetornoDto> influencers = service.findbyStatusActive(pageable);
		return new ResponseEntity<>(influencers, HttpStatus.OK);
	}
	

	@GetMapping("/niche/{nicheId}")
	@Operation(summary = "Buscar influencers por nicho", description = "Buscar influencers por nicho")
	public ResponseEntity<Page<InfluencerRetornoDto>> getInfluencersByNiche(@PathVariable Long nicheId, Pageable pageable) {
	   Page<InfluencerRetornoDto> result = service.getInfluencersByNiche(nicheId,pageable);
	   return ResponseEntity.ok(result);
	}


	@PostMapping
	@Operation(summary = "Registrar um novo influencer", description = "Registra um novo influencer junto com uma imagem")
	public ResponseEntity<InfluencerDto> registerInfluencer(
			@Valid @RequestPart("influencer") InfluencerRegisterDto influencer, @RequestPart("file") MultipartFile file)
			throws IOException {
		try {
			InfluencerDto savedInfluencer = service.registerInfluencer(influencer, file);
			return ResponseEntity.ok(savedInfluencer);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

//		return new ResponseEntity<>(service.registerInfluencer(influencer, file), HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	@Operation(summary = "Altera um influenciador", description = "Altera um influenciador com base no ID")
	public ResponseEntity<InfluencerDto> alterInfluencer(@PathVariable Long id,
			@RequestBody InfluencerRegisterDto influencer) {
		Optional<InfluencerDto> dto = service.alterInfluencer(id, influencer);

		if (dto.isPresent()) {
			return ResponseEntity.ok(dto.get());
		}

		return ResponseEntity.notFound().build();
	}

	@PutMapping("/aprovar/{id}")
	@Operation(summary = "Alterar o status para APROVADO do influencer por ID", description = "Altera o status de Avaliação de um influencer para APROVADO com base no seu ID")
	public ResponseEntity<InfluencerRetornoDto> approveInfluencer(@PathVariable Long id) {
		Optional<InfluencerRetornoDto> approvedInfluencer = service.approveInfluencer(id);
		return approvedInfluencer.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PutMapping("/reprovar/{id}")
	@Operation(summary = "Alterar o status para APROVADO do influencer por ID", description = "Altera o status de Avaliação de um influencer para APROVADO com base no seu ID")
	public ResponseEntity<InfluencerRetornoDto> rejectInfluencer(@PathVariable Long id) {
		Optional<InfluencerRetornoDto> approvedInfluencer = service.rejectInfluencer(id);
		return approvedInfluencer.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	@Operation(summary = "Alterar o status do influencer para DELETADO", description = "Altera o status do banco de dados de um influenciador para DELETADO com base no seu id")
	public ResponseEntity<Void> deleteInfluencer(@PathVariable Long id) {
		service.deleteInfluencer(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/image")
	@Operation(summary = "Atualizar imagem de um influencidaro logado", description = "Atualiza a imagem associada a um influenciador")
	public ResponseEntity<ImageDto> updateInfluencerImage(@RequestParam("file") MultipartFile file) {
		try {
			ImageDto updatedImage = service.updateInfluencerImage(null, file);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(updatedImage.getId()).toUri();
			return ResponseEntity.created(uri).body(updatedImage);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}