package br.org.serratec.influencerforyou.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.org.serratec.influencerforyou.model.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {

	Optional<Campaign> findByImageId(Long imageId);

}
