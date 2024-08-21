package br.org.serratec.influencerforyou.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.org.serratec.influencerforyou.model.Company;
import br.org.serratec.influencerforyou.model.Influencer;
import br.org.serratec.influencerforyou.repository.CompanyRepository;
import br.org.serratec.influencerforyou.repository.InfluencerRepository;

@Service
public class DetailsImp implements UserDetailsService {

	@Autowired
	private InfluencerRepository influencerRepository;

	@Autowired
	private CompanyRepository companyRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Influencer influencer = influencerRepository.findByEmail(username);
		if (influencer != null) {
			return influencer;
		}
	
		
		Company company = companyRepository.findByEmail(username);
		if (company != null) {
			return company;
		}

		throw new UsernameNotFoundException("User not found with email: " + username);
	}

}
