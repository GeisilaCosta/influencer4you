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

import br.org.serratec.influencerforyou.dto.TargetAudienceDto;
import br.org.serratec.influencerforyou.service.TargetAudienceService;
import jakarta.validation.Valid;

@RestController
@RequestMapping ("/targetAudience")
public class TargetAudienceController {
	
	@Autowired
	private TargetAudienceService service;
	
	@GetMapping
	public ResponseEntity<Page<TargetAudienceDto>> allTarget(
			@PageableDefault(size = 10, page = 0, sort = "name", direction = Sort.Direction.ASC) Pageable pageable){
		Page<TargetAudienceDto> target = service.localizeTarget(pageable);
		return ResponseEntity.ok(target);
	}

	@GetMapping ("/{id}")
	public ResponseEntity<Optional<TargetAudienceDto>> localizeForId(@PathVariable Long id){
		return ResponseEntity.ok(service.findForId(id));
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<TargetAudienceDto> createTargetAudience(@RequestBody @Valid TargetAudienceDto target){
		return ResponseEntity.ok(service.create(target));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<TargetAudienceDto> updateTargetAudience(@PathVariable Long id,
			@RequestBody @Valid TargetAudienceDto targetAtl){
		return ResponseEntity.of(service.updateTarget(id,targetAtl));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteTargetAudience(@PathVariable Long id) {
		if (service.excludeTargetAudience(id)) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
	
}
