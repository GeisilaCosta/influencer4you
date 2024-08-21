package br.org.serratec.influencerforyou.model;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "influencer_campaign")
public class InfluencerCampaign {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_influencer_campaign")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "id_influencer")
	private Influencer influencer;

	@ManyToOne
	@JoinColumn(name = "id_campaign")
	private Campaign campaign;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private StatusAvaliation status;

	public InfluencerCampaign() {
		this.status = StatusAvaliation.PENDING;
	}

	public InfluencerCampaign(Influencer influencer, Campaign campaign) {
		this.influencer = influencer;
		this.campaign = campaign;
		this.status = StatusAvaliation.PENDING;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Influencer getInfluencer() {
		return influencer;
	}

	public void setInfluencer(Influencer influencer) {
		this.influencer = influencer;
	}

	public Campaign getCampaign() {
		return campaign;
	}

	public void setCampaign(Campaign campaign) {
		this.campaign = campaign;
	}

	public StatusAvaliation getStatus() {
		return status;
	}

	public void setStatus(StatusAvaliation status) {
		this.status = status;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		InfluencerCampaign other = (InfluencerCampaign) obj;
		return Objects.equals(id, other.id);
	}

}
