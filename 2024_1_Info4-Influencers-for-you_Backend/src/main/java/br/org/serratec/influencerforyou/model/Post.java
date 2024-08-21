package br.org.serratec.influencerforyou.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "post")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_post")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "id_influencer_campaign")
	private InfluencerCampaign influencerCampaign;

	@Column(name = "content", length = 1000)
	private String content;

	@ManyToOne
	@JoinColumn(name = "id_image")
	private Image image;

	public Post() {
	}

	public Post(Long id, InfluencerCampaign influencerCampaign, String content, Image image) {
		super();
		this.id = id;
		this.influencerCampaign = influencerCampaign;
		this.content = content;
		this.image = image;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public InfluencerCampaign getInfluencerCampaign() {
		return influencerCampaign;
	}

	public void setInfluencerCampaign(InfluencerCampaign influencerCampaign) {
		this.influencerCampaign = influencerCampaign;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}

}
