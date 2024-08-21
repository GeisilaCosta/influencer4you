package br.org.serratec.influencerforyou.model;

import java.io.Serializable;
import java.sql.Types;

import org.hibernate.annotations.JdbcTypeCode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Transient;

@Entity
public class Image implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_image")
	private Long id;

	@Lob
	@JdbcTypeCode(Types.BINARY)
	private byte[] data;

	private String type;

	private String name;
	
	@Transient
	private String url;

	public Image() {
	}

	public Image(Long id, byte[] data, String type, String name) {
		super();
		this.id = id;
		this.data = data;
		this.type = type;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
