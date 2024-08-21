package br.org.serratec.influencerforyou.dto;

public class PostDto {

	private Long id;
	private Long influencerCampaignId;
	private String content;
	private Long imageId;
	private String imageUrl;

	public PostDto() {
	}

	public PostDto(Long id, Long influencerCampaignId, String content, Long imageId, String imageUrl) {
		super();
		this.id = id;
		this.influencerCampaignId = influencerCampaignId;
		this.content = content;
		this.imageId = imageId;
		this.imageUrl = imageUrl;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getInfluencerCampaignId() {
		return influencerCampaignId;
	}

	public void setInfluencerCampaignId(Long influencerCampaignId) {
		this.influencerCampaignId = influencerCampaignId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getImageId() {
		return imageId;
	}

	public void setImageId(Long imageId) {
		this.imageId = imageId;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

}
