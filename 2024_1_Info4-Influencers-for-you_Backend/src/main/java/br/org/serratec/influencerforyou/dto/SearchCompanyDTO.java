package br.org.serratec.influencerforyou.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public record SearchCompanyDTO(
			    Long idCompany,
			    String nameCompany,
			    String email,
			    String cel,
			    LocalDate dateRegister,
			    Optional<ImageDto> image,
			    //byte[] image,
			    String cnpjCpf,
			    String roleCompany,
			    String statusAvaliation,
			    String nicheName,
			    String targetAudienceName,
			    List<SocialMediasDto> socialMedias
			) {
	

}

