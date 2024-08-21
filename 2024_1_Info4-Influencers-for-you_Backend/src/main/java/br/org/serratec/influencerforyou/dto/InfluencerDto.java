package br.org.serratec.influencerforyou.dto;

import java.util.List;

import br.org.serratec.influencerforyou.model.Address;
import br.org.serratec.influencerforyou.model.Image;
import br.org.serratec.influencerforyou.model.Influencer;
import br.org.serratec.influencerforyou.model.Niche;
import br.org.serratec.influencerforyou.model.Role;
import br.org.serratec.influencerforyou.model.StatusAvaliation;
import br.org.serratec.influencerforyou.model.StatusDb;
import br.org.serratec.influencerforyou.model.TargetAudience;
import br.org.serratec.influencerforyou.util.Mapper;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record InfluencerDto (
		 Long id,
		 @NotBlank 
		 String name,
		 @Email(message = "E-mail inválido. Informe o e-mail no padrão incluindo @ e .") 
	     @NotBlank 
		 String email,
		 @NotNull
		 int age,
		 @NotBlank(message = "O campo deve conter 11 dígitos em caso de CPF, ou 14 digitos em caso de CNPJ") 
		 String cnpjCpf,
		 StatusDb statusDb, 
		 StatusAvaliation statusAvaliation,
		 Image image,
		 List <SocialMediasDto> socialMedias,
		 Niche niche, 
		 TargetAudience targetAudience,
		 @NotBlank
		 String cel,
		 Address address,
		 Role role) {
	

	public Influencer toEntity() {
		return Mapper.getMapper().convertValue(this, Influencer.class);
	}

	public static InfluencerDto toDto(Influencer influencerEntity) {
		return Mapper.getMapper().convertValue(influencerEntity, InfluencerDto.class);
	}
}