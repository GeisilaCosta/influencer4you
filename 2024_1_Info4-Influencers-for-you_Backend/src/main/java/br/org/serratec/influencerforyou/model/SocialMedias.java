package br.org.serratec.influencerforyou.model;

import java.io.Serializable;

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
@Table(name = "social_medias")
public class SocialMedias implements Serializable {
	
	 private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_social_medias")
	private Long id;
	@Enumerated(EnumType.STRING)
	private SocialMediaName socialMediaName;
	private String link;
	
	@ManyToOne
	@JoinColumn(name = "id_company")
	private Company company;
	
	@ManyToOne
	@JoinColumn(name = "id_influencer")
	private Influencer influencer;
	
	
	public SocialMedias() {}
	

	public SocialMedias(Long id, SocialMediaName socialMediaName, String link, Company company, Influencer influencer) {

		super();
		this.id = id;
		this.socialMediaName = socialMediaName;
		this.link = link;
		this.company = company;
		this.influencer = influencer;
	}
	
	
	
	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Influencer getInfluencer() {
		return influencer;
	}

	public void setInfluencer(Influencer influencer) {
		this.influencer = influencer;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public SocialMediaName getSocialMediaName() {
		return socialMediaName;
	}
	public void setSocialmediaName(SocialMediaName socialMediaName) {
		this.socialMediaName = socialMediaName;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	
	
	
}