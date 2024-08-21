package br.org.serratec.influencerforyou.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.org.serratec.influencerforyou.model.SocialMedias;

public interface SocialMediasRepository extends JpaRepository<SocialMedias, Long> {
	List<SocialMedias>findByCompanyId(Long company);

}


