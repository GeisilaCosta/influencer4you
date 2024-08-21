package br.org.serratec.influencerforyou.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.org.serratec.influencerforyou.model.InfluencerCampaign;

@Repository
public interface InfluencerCampaignRepository extends JpaRepository<InfluencerCampaign, Long>{

	boolean existsByInfluencerIdAndCampaignId(Long influencerId, Long campaignId);
	
}
