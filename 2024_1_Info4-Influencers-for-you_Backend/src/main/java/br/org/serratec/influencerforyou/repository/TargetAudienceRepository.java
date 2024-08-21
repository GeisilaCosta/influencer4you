package br.org.serratec.influencerforyou.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.org.serratec.influencerforyou.model.TargetAudience;

@Repository
public interface TargetAudienceRepository extends JpaRepository <TargetAudience,Long> {

}
