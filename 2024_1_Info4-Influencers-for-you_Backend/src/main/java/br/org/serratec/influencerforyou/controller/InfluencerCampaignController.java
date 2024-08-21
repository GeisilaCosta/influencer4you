package br.org.serratec.influencerforyou.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.org.serratec.influencerforyou.dto.InfluencerCDto;
import br.org.serratec.influencerforyou.dto.InfluencerCampaignDto;
import br.org.serratec.influencerforyou.model.InfluencerCampaign;
import br.org.serratec.influencerforyou.model.StatusAvaliation;
import br.org.serratec.influencerforyou.service.InfluencerCampaignService;

@RestController
@RequestMapping("/influencerCampaign")
public class InfluencerCampaignController {

	@Autowired
	private InfluencerCampaignService service;

	@GetMapping
	public ResponseEntity<List<InfluencerCampaignDto>> findAll() {
		List<InfluencerCampaign> influencerCampaigns = service.findAll();

		List<InfluencerCampaignDto> dtos = new ArrayList<>();

		for (InfluencerCampaign ic : influencerCampaigns) {
			InfluencerCampaignDto dto = new InfluencerCampaignDto();

			dto.setCampaignId(ic.getCampaign().getId());
			dto.setCampaignName(ic.getCampaign().getName());
			dto.setCompanyName(ic.getCampaign().getCompany().getNameCompany());

			List<InfluencerCDto> influencerDtos = new ArrayList<>();

			for (InfluencerCampaign influencerCampaign : ic.getCampaign().getInfluencerCampaigns()) {
				InfluencerCDto influencerDto = new InfluencerCDto();
				influencerDto.setId(influencerCampaign.getInfluencer().getId());
				influencerDto.setName(influencerCampaign.getInfluencer().getName());
				influencerDto.setStatus(influencerCampaign.getStatus());
				influencerDtos.add(influencerDto);
			}

			dto.setInfluencers(influencerDtos);

			dtos.add(dto);
		}

		return ResponseEntity.ok(dtos);
	}

	@GetMapping("/{id}")
	public ResponseEntity<InfluencerCampaignDto> findById(@PathVariable Long id) {
		Optional<InfluencerCampaign> influencerCampaignOptional = service.findById(id);

		if (influencerCampaignOptional.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		InfluencerCampaign influencerCampaign = influencerCampaignOptional.get();

		InfluencerCampaignDto dto = new InfluencerCampaignDto();
		dto.setCampaignId(influencerCampaign.getCampaign().getId());
		dto.setCampaignName(influencerCampaign.getCampaign().getName());
		dto.setCompanyName(influencerCampaign.getCampaign().getCompany().getNameCompany());

		List<InfluencerCDto> influencerDtos = new ArrayList<>();

		for (InfluencerCampaign ic : influencerCampaign.getCampaign().getInfluencerCampaigns()) {
			InfluencerCDto influencerDto = new InfluencerCDto();
			influencerDto.setId(ic.getInfluencer().getId());
			influencerDto.setName(ic.getInfluencer().getName());
			influencerDto.setStatus(ic.getStatus());
			influencerDtos.add(influencerDto);
		}

		dto.setInfluencers(influencerDtos);

		return ResponseEntity.ok(dto);
	}

	@PostMapping("/join")
	public ResponseEntity<String> joinCampaign(@RequestParam Long influencerId, @RequestParam Long campaignId) {
		try {
			service.joinCampaign(influencerId, campaignId);
			return new ResponseEntity<>("Participação na campanha solicitada com sucesso", HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<String> updateStatus(@PathVariable Long id, @RequestParam StatusAvaliation status) {
	    try {
	        service.updteStatus(id, status);
	        return ResponseEntity.ok("Status do vínculo atualizado com sucesso.");
	    } catch (RuntimeException e) {
	        return ResponseEntity.notFound().build();
	    }
	}
}
