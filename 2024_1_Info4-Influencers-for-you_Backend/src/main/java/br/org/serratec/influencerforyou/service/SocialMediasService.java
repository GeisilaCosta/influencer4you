package br.org.serratec.influencerforyou.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.org.serratec.influencerforyou.dto.SocialMediasDto;
import br.org.serratec.influencerforyou.model.SocialMedias;
import br.org.serratec.influencerforyou.repository.SocialMediasRepository;
import jakarta.validation.Valid;

@Service
public class SocialMediasService {

    @Autowired
    private SocialMediasRepository socialMediasRepository;

    public List<SocialMediasDto> getAllSocialMedias() {
        return socialMediasRepository.findAll().stream()
               .map(sm -> SocialMediasDto.toDto(sm)).toList();
    }

    public SocialMediasDto createSocialMedias(@Valid SocialMediasDto socialMedias) {
        SocialMedias socialMediasEntity = socialMedias.toEntity();
        SocialMedias savedSocialMedias = socialMediasRepository.save(socialMediasEntity);
        return SocialMediasDto.toDto(savedSocialMedias);
    }

    public Optional<SocialMediasDto> getSocialMediasById(Long id) {
    	Optional<SocialMedias> social = socialMediasRepository.findById(id);
    	if(social.isPresent()) {
    		return Optional.of(SocialMediasDto.toDto(social.get()));
    	}
    	return Optional.empty();
             
    }

    public Optional<SocialMediasDto> updateSocialMedias(Long id, @Valid SocialMediasDto socialAtl) {
    	Optional<SocialMedias> social = socialMediasRepository.findById(id);
    	
    	if(social.isPresent()) {
    	SocialMedias socialEntity = socialAtl.toEntity();
    	socialEntity.setId(id);
    	socialMediasRepository.save(socialEntity);
    	return Optional.of(SocialMediasDto.toDto(socialEntity));
    	}
    	
        return Optional.empty();
        
    }

    public boolean deleteSocialMedias(Long id) {
        if (socialMediasRepository.existsById(id)) {
            socialMediasRepository.deleteById(id);
            return true;
        }
        return false;
    }
}