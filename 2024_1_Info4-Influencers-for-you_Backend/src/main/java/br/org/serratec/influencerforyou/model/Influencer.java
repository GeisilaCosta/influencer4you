package br.org.serratec.influencerforyou.model;

import java.io.Serializable;
import java.util.ArrayList;
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
@Table(name = "Influencer")
public class Influencer implements UserDetails, Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_influencer")
	private Long id;
	@Column(name = "name_Influencer")
	private String name;
	@Column(unique = true)
	private String email;
	private int age;
	@Column(unique = true)
	private String cnpjCpf;
	@Column(name = "passwordInfluencer")
	private String password;
	@Enumerated(EnumType.STRING)
	private StatusDb statusDb;
	@Enumerated(EnumType.STRING)
	private StatusAvaliation statusAvaliation;
	@OneToOne
	@JoinColumn(name = "id_image")
	private Image image;
	@OneToMany(mappedBy = "influencer", cascade = CascadeType.ALL)
	private List<SocialMedias> socialMedias;
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "id_niche")
	private Niche niche;
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "id_target_audience")
	private TargetAudience targetAudience;
	private String cel;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_address")
	private Address address;
	@Column(name = "roleInfluencer")
	@Enumerated(EnumType.STRING)
	private Role role;

	@OneToMany(mappedBy = "influencer")
	@JsonIgnore
	private List<InfluencerCampaign> influencerCampaigns = new ArrayList<>();

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

	public void setPassword(String password) {
		this.password = password;
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

	public List<SocialMedias> getSocialMedias() {
		return socialMedias;
	}

	public void setSocialMedias(List<SocialMedias> socialMedias) {
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

	public List<InfluencerCampaign> getInfluencerCampaigns() {
		return influencerCampaigns;
	}

	public void setInfluencerCampaigns(List<InfluencerCampaign> influencerCampaigns) {
		this.influencerCampaigns = influencerCampaigns;
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

	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}