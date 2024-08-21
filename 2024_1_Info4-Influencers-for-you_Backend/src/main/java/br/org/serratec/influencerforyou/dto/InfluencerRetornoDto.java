package br.org.serratec.influencerforyou.dto;

import java.util.ArrayList;
import java.util.List;

import br.org.serratec.influencerforyou.model.Address;

import br.org.serratec.influencerforyou.model.Niche;

import br.org.serratec.influencerforyou.model.StatusAvaliation;
import br.org.serratec.influencerforyou.model.StatusDb;
import br.org.serratec.influencerforyou.model.TargetAudience;

public class InfluencerRetornoDto {

	private Long id;

	private String name;

	private String email;

	private int age;

	private String cnpjCpf;

	private StatusDb statusDb;

	private StatusAvaliation statusAvaliation;

	private Long imageId;

	private String imageUrl;

	private List<SocialMediasDto> socialMedias = new ArrayList<>();;

	private Niche niche;

	private TargetAudience targetAudience;

	private String cel;

	private Address address;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getCnpjCpf() {
		return cnpjCpf;
	}

	public void setCnpjCpf(String cnpjCpf) {
		this.cnpjCpf = cnpjCpf;
	}

	public StatusDb getStatusDb() {
		return statusDb;
	}

	public void setStatusDb(StatusDb statusDb) {
		this.statusDb = statusDb;
	}

	public StatusAvaliation getStatusAvaliation() {
		return statusAvaliation;
	}

	public void setStatusAvaliation(StatusAvaliation statusAvaliation) {
		this.statusAvaliation = statusAvaliation;
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

	public List<SocialMediasDto> getSocialMedias() {
		return socialMedias;
	}

	public void setSocialMedias(List<SocialMediasDto> socialMedias) {
		this.socialMedias = socialMedias;
	}

	public Niche getNiche() {
		return niche;
	}

	public void setNiche(Niche niche) {
		this.niche = niche;
	}

	public TargetAudience getTargetAudience() {
		return targetAudience;
	}

	public void setTargetAudience(TargetAudience targetAudience) {
		this.targetAudience = targetAudience;
	}

	public String getCel() {
		return cel;
	}

	public void setCel(String cel) {
		this.cel = cel;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

}
