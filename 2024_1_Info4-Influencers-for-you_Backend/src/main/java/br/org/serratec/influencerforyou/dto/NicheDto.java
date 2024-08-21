package br.org.serratec.influencerforyou.dto;

import br.org.serratec.influencerforyou.model.Niche;
import br.org.serratec.influencerforyou.util.Mapper;
import jakarta.validation.constraints.NotBlank;

public record NicheDto (
		Long id,
		@NotBlank(message = "O nome não pode ser vazio.")
		String name){
	
	public Niche toEntity() {
		return Mapper.getMapper().convertValue(this,Niche.class);
	}
	
	public static NicheDto toDto(Niche nicheEntity) {
		return Mapper.getMapper().convertValue(nicheEntity, NicheDto.class);
	}
}
