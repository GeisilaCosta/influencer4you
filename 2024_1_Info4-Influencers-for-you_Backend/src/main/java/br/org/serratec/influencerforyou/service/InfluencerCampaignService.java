package br.org.serratec.influencerforyou.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.org.serratec.influencerforyou.model.Campaign;
import br.org.serratec.influencerforyou.model.Influencer;
import br.org.serratec.influencerforyou.model.InfluencerCampaign;
import br.org.serratec.influencerforyou.model.StatusAvaliation;
import br.org.serratec.influencerforyou.repository.InfluencerCampaignRepository;


@Service
public class InfluencerCampaignService {

	@Autowired
	private InfluencerCampaignRepository influencerCampaignRepository;

	@Transactional
	public void joinCampaign(Long influencerId, Long campaignId) {
		if (influencerCampaignRepository.existsByInfluencerIdAndCampaignId(influencerId, campaignId)) {
			throw new RuntimeException("Influenciador já participa desta campanha");
		}

		Influencer influencer = new Influencer();
		influencer.setId(influencerId);

		Campaign campaign = new Campaign();
		campaign.setId(campaignId);

		InfluencerCampaign influencerCampaign = new InfluencerCampaign(influencer, campaign);
		influencerCampaignRepository.save(influencerCampaign);
	}

	public List<InfluencerCampaign> findAll(){
		return influencerCampaignRepository.findAll();
	}
	
    public Optional<InfluencerCampaign> findById(Long id) {
        return influencerCampaignRepository.findById(id);
    }
    
    @Transactional
    public InfluencerCampaign updteStatus(Long id, StatusAvaliation status) {
    	InfluencerCampaign influencerCampaign = influencerCampaignRepository.findById(id)
    			.orElseThrow(()-> new RuntimeException("Vínculo não encontrado"));
    	
    	influencerCampaign.setStatus(status);
    	return influencerCampaignRepository.save(influencerCampaign);	
    }
    
    public void delete(Long id) {
        Optional<InfluencerCampaign> optionalInfluencerCampaign = influencerCampaignRepository.findById(id);
        if (optionalInfluencerCampaign.isPresent()) {
            influencerCampaignRepository.deleteById(id);
        } else {
            throw new RuntimeException("Vínculo não encontrado");
        }
    }

}
