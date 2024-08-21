package br.org.serratec.influencerforyou.dto;

import java.util.List;

public record SearchInfluencerDto(
		Long idInfluencer,
		String name_influencer,
		String email,
		int age,
		String cnpjCpf,
		String statusDb, 
		String statusAvaliation,
		String image,
		List <SocialMediasDto> socialMedias,
		String niche, 
		String targetAudience,
		String cel,
		String bairro,
		String cep,
		String localidade,
		String logradouro,
		String uf) {

}
