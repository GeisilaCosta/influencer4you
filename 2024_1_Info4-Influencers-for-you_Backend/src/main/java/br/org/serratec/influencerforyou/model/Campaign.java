package br.org.serratec.influencerforyou.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "campaign")
public class Campaign implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_campaign")
	private Long id;
	private String budget;
	@OneToOne
	@JoinColumn(name = "id_image")
	private Image image;
	@Column(name = "name_campaign")
	private String name;
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "id_niche")
	private Niche niche;
	@Convert(converter = StatusAvaliation.StatusAvaliationConverter.class)
	@Column(name = "status_avaliation")
	private StatusAvaliation statusAvaliation;
	@Convert(converter = StatusDb.StatusDbConverter.class)
	@Column(name = "statusdb")
	private StatusDb statusdb;
	private String tasks;
	private Double wage;
	@ManyToOne
	@JoinColumn(name = "id_company")
	private Company company;

	@OneToMany(mappedBy = "campaign")
	@JsonIgnore
	private List<InfluencerCampaign> influencerCampaigns = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBudget() {
		return budget;
	}

	public void setBudget(String budget) {
		this.budget = budget;
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	

	public Niche getNiche() {
		return niche;
	}

	public void setNiche(Niche niche) {
		this.niche = niche;
	}

	public StatusAvaliation getStatusAvaliation() {
		return statusAvaliation;
	}

	public void setStatusAvaliation(StatusAvaliation statusAvaliation) {
		this.statusAvaliation = statusAvaliation;
	}

	public StatusDb getStatusdb() {
		return statusdb;
	}

	public void setStatusdb(StatusDb statusdb) {
		this.statusdb = statusdb;
	}

	public String getTasks() {
		return tasks;
	}

	public void setTasks(String tasks) {
		this.tasks = tasks;
	}

	public Double getWage() {
		return wage;
	}

	public void setWage(Double wage) {
		this.wage = wage;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public List<InfluencerCampaign> getInfluencerCampaigns() {
		return influencerCampaigns;
	}

	public void setInfluencerCampaigns(List<InfluencerCampaign> influencerCampaigns) {
		this.influencerCampaigns = influencerCampaigns;
	}

}