package br.org.serratec.influencerforyou.dto;

import br.org.serratec.influencerforyou.model.SocialMediaName;
import br.org.serratec.influencerforyou.model.SocialMedias;
import br.org.serratec.influencerforyou.util.Mapper;

public record SocialMediasDto(
		Long id,
		SocialMediaName socialMediaName,
		String link) {
	
	public SocialMedias toEntity() {
		return Mapper.getMapper().convertValue(this, SocialMedias.class);
	}

	public static SocialMediasDto toDto(SocialMedias socialEntity) {
		return Mapper.getMapper().convertValue(socialEntity, SocialMediasDto.class);
	}
}