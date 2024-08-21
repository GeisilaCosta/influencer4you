package br.org.serratec.influencerforyou.model;

import java.util.stream.Stream;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

public enum Role {
	INFLUENCER("Influencer"), ADMINISTRADOR("Administrador"), EMPRESA("Empresa");

	private String role;

	private Role(String role) {
		this.role = role;
	}

	public String getRole() {
		return this.role;
	}
	
	public static Role of(String role) {
        return Stream.of(Role.values())
          .filter(p -> p.getRole().equals(role))
          .findFirst()
          .orElseThrow(() -> new IllegalArgumentException("Unknown value: " + role));
    }
	
	@Converter(autoApply = true)
	public static class RoleConverter implements AttributeConverter<Role, String> {
		@Override
		public String convertToDatabaseColumn(Role status) {
			if (status == null) {
				return null;
			}
			return status.name();
		}

		@Override
		public Role convertToEntityAttribute(String role) {
			if (role == null) {
				return null;
			}
			try {
				return Role.of(role);
			} catch (IllegalArgumentException e) {
				throw new RuntimeException("Unknown value for Role: " + role, e);
			}
		}
	}
}
