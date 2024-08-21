package br.org.serratec.influencerforyou.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.org.serratec.influencerforyou.dto.TargetAudienceDto;
import br.org.serratec.influencerforyou.model.TargetAudience;
import br.org.serratec.influencerforyou.repository.TargetAudienceRepository;
import jakarta.validation.Valid;

@Service
public class TargetAudienceService {

	@Autowired
	private TargetAudienceRepository repository;

	public Page<TargetAudienceDto> localizeTarget(Pageable pageable) {
		return repository.findAll(pageable).map(t -> TargetAudienceDto.toDto(t));
	}

	public Optional<TargetAudienceDto> findForId(Long id) {
		Optional<TargetAudience> target = repository.findById(id);

		if (target.isPresent()) {
			return Optional.of(TargetAudienceDto.toDto(target.get()));
		}
		return Optional.empty();
	}

	public TargetAudienceDto create(@Valid TargetAudienceDto target) {
		TargetAudience targetAudienceEntity = target.toEntity();
		repository.save(targetAudienceEntity);
		return TargetAudienceDto.toDto(targetAudienceEntity);
	}

	public Optional<TargetAudienceDto> updateTarget(Long id, @Valid TargetAudienceDto targetAtl) {
		Optional<TargetAudience> target = repository.findById(id);
		
		if(target.isPresent()) {
			TargetAudience targetAudienceEntity = targetAtl.toEntity();
			targetAudienceEntity.setId(id);
			repository.save(targetAudienceEntity);
			return Optional.of(TargetAudienceDto.toDto(targetAudienceEntity));
		}
		return Optional.empty();
	}

	public boolean excludeTargetAudience(Long id) {
		if (repository.existsById(id)) {
			repository.deleteById(id);
		}
		return false;
	}

}
