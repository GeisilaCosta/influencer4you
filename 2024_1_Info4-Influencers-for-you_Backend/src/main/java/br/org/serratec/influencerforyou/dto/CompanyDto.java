package br.org.serratec.influencerforyou.dto;

import java.time.LocalDate;
import java.util.List;

import br.org.serratec.influencerforyou.model.Company;
import br.org.serratec.influencerforyou.model.Image;
import br.org.serratec.influencerforyou.model.Role;
import br.org.serratec.influencerforyou.model.StatusAvaliation;
import br.org.serratec.influencerforyou.model.StatusDb;
import br.org.serratec.influencerforyou.util.Mapper;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;



public record CompanyDto (

	Long id,
	@NotBlank
	String nameCompany,
	@Email(message = "E-mail inválido. Informe o e-mail no padrão incluindo @ e .") 
    @NotBlank 
	String email,
	Long idTargetAudience,
	@NotBlank(message = "O campo deve conter 14 digitos em caso de CNPJ")
	String cnpjCpf,
	@NotBlank(message = "Senha obrigatória")
	String password,
	StatusDb statusDd, 
	StatusAvaliation statusAvaliation,
	Image image,
	
	List <SocialMediasDto> socialMedias,
	Long idNiche,
	@NotBlank
	String cel,
	LocalDate date,
	Role role) {
	
	public Company toEntity() {
		return Mapper.getMapper().convertValue(this, Company.class);
	}

	public static CompanyDto toDto(Company companyEntity) {
		return Mapper.getMapper().convertValue(companyEntity, CompanyDto.class);
	}
}