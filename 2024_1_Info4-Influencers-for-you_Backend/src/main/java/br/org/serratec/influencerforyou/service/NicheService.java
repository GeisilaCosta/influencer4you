package br.org.serratec.influencerforyou.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.org.serratec.influencerforyou.dto.NicheDto;
import br.org.serratec.influencerforyou.model.Niche;
import br.org.serratec.influencerforyou.repository.NicheRepository;
import jakarta.validation.Valid;



@Service
public class NicheService {

	@Autowired
	private NicheRepository repository;

	public Page<NicheDto> localizeNiche(Pageable pageable) {
		return repository.findAll(pageable)
				.map(n -> NicheDto.toDto(n));
	}

	public NicheDto create(NicheDto niche) {
		Niche nicheEntity = niche.toEntity();
		repository.save(nicheEntity);
		return NicheDto.toDto(nicheEntity);
	}

	public Optional<NicheDto> findForId(Long id) {
		Optional<Niche> niche = repository.findById(id);
		
		if(niche.isPresent()) {
			return Optional.of(NicheDto.toDto(niche.get()));
		}
		return Optional.empty();
	}

	public Optional<NicheDto> updateCompany(Long id, @Valid NicheDto nicheAtl) {
		Optional<Niche> niche = repository.findById(id);
		
		if(niche.isPresent()) {
			Niche nicheEntity = nicheAtl.toEntity();
			nicheEntity.setId(id);
			repository.save(nicheEntity);
			return Optional.of(NicheDto.toDto(nicheEntity));
		}
		
		return Optional.empty();
	}

	public boolean excludeNiche(Long id) {
		if (repository.existsById(id)) {
			repository.deleteById(id);
		}
		return false;
	}
	

}
