package br.org.serratec.influencerforyou.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.org.serratec.influencerforyou.model.Influencer;

@Repository
public interface InfluencerRepository extends JpaRepository<Influencer, Long> {

	Influencer findByEmail(String email);

	boolean existsByEmail(String email);
	
	 Page<Influencer> findByNicheId(Long nicheId, Pageable pageable);

}
