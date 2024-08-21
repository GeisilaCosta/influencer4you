package br.org.serratec.influencerforyou.dto;

import br.org.serratec.influencerforyou.model.StatusAvaliation;

public class InfluencerCDto {

	private Long id;
	private String name;
	private StatusAvaliation status;

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

	public StatusAvaliation getStatus() {
		return status;
	}

	public void setStatus(StatusAvaliation status) {
		this.status = status;
	}

}
