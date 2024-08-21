package br.org.serratec.influencerforyou.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.org.serratec.influencerforyou.dto.NicheDto;
import br.org.serratec.influencerforyou.service.NicheService;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/niches")
public class NicheController {
	
	@Autowired
	private NicheService service;
	
	
	@GetMapping
	public ResponseEntity<Page<NicheDto>> allNiches(
			@PageableDefault(size = 10, page = 0, sort = "name", direction = Sort.Direction.ASC) Pageable pageable){
		Page<NicheDto> niche = service.localizeNiche(pageable);
		return ResponseEntity.ok(niche);
	}
	
	@GetMapping ("/{id}")
	public ResponseEntity<Optional<NicheDto>> localizeForId(@PathVariable Long id){
		return ResponseEntity.ok(service.findForId(id));
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<NicheDto> createNiche (@RequestBody @Valid NicheDto niche){
		return ResponseEntity.ok(service.create(niche));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<NicheDto> updateCompany(@PathVariable Long id,
			@RequestBody @Valid NicheDto nicheAtl){
		return ResponseEntity.of(service.updateCompany(id,nicheAtl));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteNiche(@PathVariable Long id) {
		if (service.excludeNiche(id)) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}