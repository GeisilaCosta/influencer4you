package br.org.serratec.influencerforyou.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.org.serratec.influencerforyou.model.Address;

@Repository
public interface AddressRepository extends JpaRepository <Address, Long>{
	//Optional<Address> findByInfluencerId(Long influencer);
}
