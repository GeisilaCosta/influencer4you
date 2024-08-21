package br.org.serratec.influencerforyou.controller;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.org.serratec.influencerforyou.dto.CampaignDto;
import br.org.serratec.influencerforyou.dto.ImageDto;
import br.org.serratec.influencerforyou.model.Company;
import br.org.serratec.influencerforyou.service.CampaignService;
import br.org.serratec.influencerforyou.service.DetailsImp;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/campaigns")
public class CampaignController {

	@Autowired
	private CampaignService campaignService;

	@Autowired
	private DetailsImp details;

	@GetMapping
	@Operation(summary = "Buscar todas as campanhas", description = "Retorna uma lista paginada de todas as campanhas")
	public ResponseEntity<Page<CampaignDto>> getAllCampaigns(Pageable pageable) {
		return ResponseEntity.ok(campaignService.findAll(pageable));
	}

	@GetMapping("/{id}")
	@Operation(summary = "Buscar campanha por ID", description = "Retorna uma campanha pelo seu ID")
	public ResponseEntity<CampaignDto> getCampaignById(@PathVariable Long id) {
		return campaignService.findForId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	@Operation(summary = "Criar nova campanha", description = "Cria uma nova campanha com os dados fornecidos")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<CampaignDto> createCampaign(@RequestPart("campaignDto") @Valid CampaignDto campaignDto,
			@RequestPart("file") MultipartFile file) throws IOException {

		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		UserDetails userDetails = details.loadUserByUsername(username);

		if (!(userDetails instanceof Company)) {
			throw new UsernameNotFoundException("Company not found " + username);
		}

		Long companyId = ((Company) userDetails).getId();

		return ResponseEntity.of(campaignService.registerCampaign(campaignDto, companyId, file));
	}

	@PutMapping("/{id}")
	@Operation(summary = "Atualizar campanha", description = "Atualiza uma campanha existente com os novos dados fornecidos")
	public ResponseEntity<CampaignDto> updateCampaign(@PathVariable Long id,
			@RequestBody @Valid CampaignDto campaignDto) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		UserDetails userDetails = details.loadUserByUsername(username);

		if (!(userDetails instanceof Company)) {
			throw new UsernameNotFoundException("Company not found  " + username);
		}

		Long companyId = ((Company) userDetails).getId();
	

		return ResponseEntity.of(campaignService.updateCampaign(campaignDto, id, companyId));
	}
	
	@PutMapping("/aprovar/{id}")
	@Operation(summary = "Alterar o status para APROVADO da campanha por ID", description = "Altera o status de Avaliação de uma campanha para APROVADO com base no seu ID")
	public ResponseEntity<CampaignDto> approveCompany(@PathVariable Long id) {
	    Optional<CampaignDto> approvedCompany = campaignService.approveCompany(id);
	    return approvedCompany.map(ResponseEntity::ok)
	                          .orElse(ResponseEntity.notFound().build());
	}
	
	@PutMapping("/reprovar/{id}")
	@Operation(summary = "Alterar o status para APROVADO campanha por ID", description = "Altera o status de Avaliação de uma campanha para APROVADO com base no seu ID")
	public ResponseEntity<CampaignDto> rejectCompany(@PathVariable Long id) {
	    Optional<CampaignDto> approvedCompany = campaignService.rejectCompany(id);
	    return approvedCompany.map(ResponseEntity::ok)
	                          .orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	@Operation(summary = "Deletar campanha", description = "Deleta uma campanha existente pelo seu ID")
	public ResponseEntity<Void> deleteCampaign(@PathVariable Long id) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		UserDetails userDetails = details.loadUserByUsername(username);

		if (!(userDetails instanceof Company)) {
			throw new UsernameNotFoundException("Company not found " + username);
		}

		campaignService.deleteCampaign(id);

		return ResponseEntity.noContent().build();
	}

	@PutMapping("/{id}/update-image")
	@Operation(summary = "Atualizar imagem da campanha", description = "Atualiza a imagem de uma campanha existente")

	public ResponseEntity<ImageDto> updateCampaignImage(@RequestPart("file") MultipartFile file,
			@PathVariable Long id) {
		try {
			ImageDto updatedImage = campaignService.updateCampaignImage(file, id);

			URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
					.path("/{id}")
					.buildAndExpand(updatedImage.getId())
					.toUri();
			return ResponseEntity.created(uri).body(updatedImage);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}


}

