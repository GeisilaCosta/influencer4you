package br.org.serratec.influencerforyou.dto;

public class ImageDetailDto {

	private Long imageId;
	private Long entityId;
	private String entityName;
	private String url;

	public ImageDetailDto(Long imageId, Long entityId, String entityName, String url) {
		this.imageId = imageId;
		this.entityId = entityId;
		this.entityName = entityName;
		this.url = url;
	}

	public Long getImageId() {
		return imageId;
	}

	public void setImageId(Long imageId) {
		this.imageId = imageId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Long getEntityId() {
		return entityId;
	}

	public void setEntityId(Long entityId) {
		this.entityId = entityId;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

}
