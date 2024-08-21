package br.org.serratec.influencerforyou.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import br.org.serratec.influencerforyou.model.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

	@Query(value = """
			SELECT 
			i.id_image AS imageId, 
			c.id_company AS entityId, 
			c.name_company AS entityName
			FROM image i  
			INNER JOIN company c 
			ON i.id_image = c.id_image
				""", nativeQuery = true)
	Page<Object[]> findCompanyImages(Pageable pageable);

		
	@Query(value = """
			SELECT 
			i.id_image AS imageId, 
			c.id_campaign AS entityId, 
			c.name_campaign AS entityName
			FROM image i  
			INNER JOIN campaign c 
			ON i.id_image = c.id_image
				""", nativeQuery = true)
	Page<Object[]> findCampaignImages(Pageable pageable);

	@Query(value = """
			SELECT 
			i.id_image AS imageId, 
			f.id_influencer AS entityId, 
			f.name_influencer AS entityName
			FROM image i  
			INNER JOIN influencer f 
			ON i.id_image = f.id_image
				""", nativeQuery = true)
	Page<Object[]> findInfluencerImages(Pageable pageable);
	
	
}

