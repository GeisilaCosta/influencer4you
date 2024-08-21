package br.org.serratec.influencerforyou.dto;

import java.util.List;

public class InfluencerCampaignDto {

	private Long campaignId;
	private String campaignName;
	private String companyName;
	private List<InfluencerCDto> influencers;

	public Long getCampaignId() {
		return campaignId;
	}

	public void setCampaignId(Long campaignId) {
		this.campaignId = campaignId;
	}

	public String getCampaignName() {
		return campaignName;
	}

	public void setCampaignName(String campaignName) {
		this.campaignName = campaignName;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public List<InfluencerCDto> getInfluencers() {
		return influencers;
	}

	public void setInfluencers(List<InfluencerCDto> influencers) {
		this.influencers = influencers;
	}

}
