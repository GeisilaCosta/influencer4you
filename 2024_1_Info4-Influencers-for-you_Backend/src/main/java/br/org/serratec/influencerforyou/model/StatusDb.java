package br.org.serratec.influencerforyou.model;

import java.util.stream.Stream;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

public enum StatusDb {
    ACTIVE("Active"),
    INACTIVE("Inactive"),
    DELETED("Deleted");
    
    private String statusDb;
    
    private StatusDb(String statusDb) {
        this.statusDb = statusDb;
    }
    
    public String getStatusDb() {
        return this.statusDb;
    }
    
    public static StatusDb of(String statusDb) {
        return Stream.of(StatusDb.values())
          .filter(p -> p.getStatusDb().equals(statusDb))
          .findFirst()
          .orElseThrow(() -> new IllegalArgumentException("Unknown value: " + statusDb));
    }

    @Converter(autoApply = true)
    public static class StatusDbConverter implements AttributeConverter<StatusDb, String> {

        @Override
        public String convertToDatabaseColumn(StatusDb status) {
            if (status == null) {
                return null;
            }
            return status.getStatusDb();
        }

        @Override
        public StatusDb convertToEntityAttribute(String dbData) {
            if (dbData == null) {
                return null;
            }
            try {
                return StatusDb.of(dbData);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Unknown value for StatusDb: " + dbData, e);
            }
        }
    }
}
