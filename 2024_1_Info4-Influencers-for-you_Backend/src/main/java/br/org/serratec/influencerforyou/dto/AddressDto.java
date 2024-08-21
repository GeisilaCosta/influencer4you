package br.org.serratec.influencerforyou.dto;

import br.org.serratec.influencerforyou.model.Address;
import br.org.serratec.influencerforyou.util.Mapper;

public record AddressDto(
		String cep,
		String logradouro,
		String bairro,
		String localidade,
		String uf
		) {
	
	public Address toEntity() {
		return Mapper.getMapper().convertValue(this, Address.class);
	}
	
	public static AddressDto toDto(Address addressEntity) {
		return Mapper.getMapper().convertValue(addressEntity, AddressDto.class);
	}
}