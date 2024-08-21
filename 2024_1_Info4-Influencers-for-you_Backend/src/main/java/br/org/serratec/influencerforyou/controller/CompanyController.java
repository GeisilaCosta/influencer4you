package br.org.serratec.influencerforyou.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

import br.org.serratec.influencerforyou.dto.CompanyDto;
import br.org.serratec.influencerforyou.dto.ImageDto;
import br.org.serratec.influencerforyou.dto.SearchCompanyDTO;
import br.org.serratec.influencerforyou.service.CompanyService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/company")
public class CompanyController {

	@Autowired
	private CompanyService service;

	@GetMapping
	@Operation(summary = "Buscar relatório de empresas paginado", description = "Retorna uma lista paginada de todas as empresas cadastradas")
	public ResponseEntity<Page<SearchCompanyDTO>> getCompanyReport(
			@PageableDefault(size = 10, page = 0, sort = "nameCompany", direction = Sort.Direction.ASC) Pageable pageable) {
		Page<SearchCompanyDTO> report = service.getCompanyReport(pageable);
		return ResponseEntity.ok(report);
	}

	@GetMapping("/{id}")
	@Operation(summary = "Buscar empresa por ID", description = "Retorna uma empresa com base no seu ID")
	private ResponseEntity<Optional<SearchCompanyDTO>> getCompanyForId(@PathVariable Long id) {
		return ResponseEntity.ok(service.findForId(id));
	}

	@PostMapping (consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	@Operation(summary = "Registrar nova empresa", description = "Registra uma nova empresa junto com uma imagem opcional")
	public ResponseEntity<CompanyDto> register(@Valid @RequestPart("company") CompanyDto companyDto,
			@RequestPart("file") MultipartFile file) {
		try {
			Optional<CompanyDto> savedCompany = service.registerCompany(companyDto, file);
			return savedCompany.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

	@PutMapping("/{id}")
	@Operation(summary = "Atualizar empresa por ID", description = "Atualiza uma empresa com base no seu ID")
	private ResponseEntity<CompanyDto> updateCompany(@RequestBody @Valid CompanyDto companyAlt, @PathVariable Long id) {
		return ResponseEntity.of(service.updateCompany(companyAlt, id));
	}

	@DeleteMapping("/{id}")
	@Operation(summary = "Deletar empresa por ID", description = "Remove uma empresa com base no seu ID")
	public ResponseEntity<Void> deletarCompany(@PathVariable Long id) {
		service.deletarCompany(id);
		return ResponseEntity.noContent().build();
		// public ResponseEntity<CompanyDto> deletarCompany(@PathVariable @Valid
		// CompanyDto companyAlt,Long id) {
		// return ResponseEntity.of(service.deletarCompany(companyAlt,id));

	}

	@PutMapping("/aprovar/{id}")
	@Operation(summary = "Alterar o status para APROVADO empresa por ID", description = "Altera o status de Avaliação de uma empresa para APROVADO com base no seu ID")
	public ResponseEntity<CompanyDto> approveCompany(@PathVariable Long id) {
		Optional<CompanyDto> approvedCompany = service.approveCompany(id);
		return approvedCompany.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PutMapping("/reprovar/{id}")
	@Operation(summary = "Alterar o status para APROVADO empresa por ID", description = "Altera o status de Avaliação de uma empresa para APROVADO com base no seu ID")
	public ResponseEntity<CompanyDto> rejectCompany(@PathVariable Long id) {
		Optional<CompanyDto> approvedCompany = service.rejectCompany(id);
		return approvedCompany.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PutMapping("/image")
	@Operation(summary = "Atualizar imagem da empresa logada", description = "Atualiza a imagem associada a uma empresa")
	public ResponseEntity<ImageDto> updateCompanyImage(@RequestParam("file") MultipartFile file) {
		try {
			ImageDto updatedImage = service.updateCompanyImage(null, file);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(updatedImage.getId()).toUri();
			return ResponseEntity.created(uri).body(updatedImage);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/image")
	@Operation(summary = "Buscar imagem da empresa logada", description = "Retorna uma imagem da empresa")
	public ResponseEntity<Optional<ImageDto>> findbyId() {
		try {
			Optional<ImageDto> image = service.findImageById(null);
			return ResponseEntity.ok(image);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
