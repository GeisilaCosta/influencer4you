package br.org.serratec.influencerforyou.model;

import java.util.stream.Stream;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

public enum StatusAvaliation {
    PENDING("Pending"),
    APPROVED("Approved"),
    REJECTED("Rejected");
    
    private String status;
    
    private StatusAvaliation(String status) {
        this.status = status;
    }
    
    public String getStatus() {
        return this.status;
    }
    
    public static StatusAvaliation of(String status) {
    	if(status == null) {
    		return null;
    	}
        return Stream.of(StatusAvaliation.values())
        		
          .filter(p -> p.getStatus().equals(status))
          .findFirst()
          .orElseThrow(() -> new IllegalArgumentException("Unknown value: " + status));
    }

    @Converter(autoApply = true)
    public static class StatusAvaliationConverter implements AttributeConverter<StatusAvaliation, String> {

        @Override
        public String convertToDatabaseColumn(StatusAvaliation status) {
            if (status == null) {
                return null;
            }
            return status.getStatus();
        }

        @Override
        public StatusAvaliation convertToEntityAttribute(String dbData) {
            if (dbData == null) {
                return null;
            }
            try {
                return StatusAvaliation.of(dbData);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Unknown value for StatusAvaliation: " + dbData, e);
            }
        }
    }
}
