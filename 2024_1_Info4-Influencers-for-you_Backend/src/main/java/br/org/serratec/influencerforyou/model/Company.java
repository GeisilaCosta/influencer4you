package br.org.serratec.influencerforyou.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "company")
public class Company implements UserDetails, Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_company")
	private Long id;
	@Column(name = "name_company")
	private String nameCompany;

	@Column(unique = true)
	private String email;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "id_target_audience")
	private TargetAudience targetAudience;

	@Column(unique = true)
	private String cnpjCpf;

	@Column(name = "passwordCompany")
	private String password;

	@Enumerated(EnumType.STRING)
	@Column(name = "status_db")
	private StatusDb statusDd;

	@Enumerated(EnumType.STRING)
	@Column(name = "status_avaliation")
	private StatusAvaliation statusAvaliation;

	@OneToOne
	@JoinColumn(name = "id_image")
	private Image image;

	@OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
	private List<SocialMedias> socialMedias;
	/*
	 * @OneToMany(cascade= CascadeType.ALL)
	 * 
	 * @JoinColumn(name="id_social_medias") private List<SocialMedias> socialMedias;
	 */

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "id_niche")
	private Niche niche;
	private String cel;
	@Column(name = "date_register")
	private LocalDate date;
	@Enumerated(EnumType.STRING)
	@Column(name = "roleCompany")
	private Role role;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNameCompany() {
		return nameCompany;
	}

	public void setNameCompany(String nameCompany) {
		this.nameCompany = nameCompany;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public TargetAudience getTargetAudience() {
		return targetAudience;
	}

	public void setTargetAudience(TargetAudience targetAudience) {
		this.targetAudience = targetAudience;
	}

	public String getCnpjCpf() {
		return cnpjCpf;
	}

	public void setCnpjCpf(String cnpjCpf) {
		this.cnpjCpf = cnpjCpf;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public StatusDb getStatusDd() {
		return statusDd;
	}

	public void setStatusDd(StatusDb statusDd) {
		this.statusDd = statusDd;
	}

	public StatusAvaliation getStatusAvaliation() {
		return statusAvaliation;
	}

	public void setStatusAvaliation(StatusAvaliation statusAvaliation) {
		this.statusAvaliation = statusAvaliation;
	}

	/*
	 * public List<SocialMedias> getSocialMedias() { return socialMedias; }
	 * 
	 * public void setSocialMedias(List<SocialMedias> socialMedias) {
	 * this.socialMedias = socialMedias; }
	 */

	public Niche getNiche() {
		return niche;
	}

	public void setNiche(Niche niche) {
		this.niche = niche;
	}

	public String getCel() {
		return cel;
	}

	public void setCel(String cel) {
		this.cel = cel;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}

	@JsonIgnore
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));
	}
	@JsonIgnore
	@Override
	public String getUsername() {
		return email;
	}
	@JsonIgnore
	@Override
	public String getPassword() {
		return password;
	}
	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@JsonIgnore
	@Override
	public boolean isEnabled() {
		return true;
	}

}