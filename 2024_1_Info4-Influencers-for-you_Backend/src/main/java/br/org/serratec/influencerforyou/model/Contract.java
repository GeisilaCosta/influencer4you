package br.org.serratec.influencerforyou.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contract")
public class Contract {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "contract")
	private Long id;
	private Campaign id_campaign;
	private Influencer id_influencer;
	private LocalDate date;

	public Contract() {
		super();
	}

	public Contract(Long id, Campaign id_campaign, Influencer id_influencer, LocalDate date) {
		super();
		this.id = id;
		this.id_campaign = id_campaign;
		this.id_influencer = id_influencer;
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Campaign getId_campaign() {
		return id_campaign;
	}

	public void setId_campaign(Campaign id_campaign) {
		this.id_campaign = id_campaign;
	}

	public Influencer getId_influencer() {
		return id_influencer;
	}

	public void setId_influencer(Influencer id_influencer) {
		this.id_influencer = id_influencer;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

}
