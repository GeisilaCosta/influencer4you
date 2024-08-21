package br.org.serratec.influencerforyou.dto;


import br.org.serratec.influencerforyou.model.TargetAudience;
import br.org.serratec.influencerforyou.util.Mapper;
import jakarta.validation.constraints.NotBlank;

public record TargetAudienceDto  (
		Long id,
		@NotBlank(message = "O nome não pode ser vazio.")
		String name){
	
	public TargetAudience toEntity() {
		return Mapper.getMapper().convertValue(this,TargetAudience.class);
	}
	
	public static TargetAudienceDto toDto(TargetAudience targetAudienceEntity) {
		return Mapper.getMapper().convertValue(targetAudienceEntity, TargetAudienceDto.class);
	}

}
