package br.org.serratec.influencerforyou.repository;


import java.util.List;

import java.util.Optional;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.org.serratec.influencerforyou.model.Company;

@Repository
public interface CompanyRepository extends JpaRepository <Company,Long> {

	Company findByEmail(String email);

	Optional<Company> findByImageId(Long imageId);
	

	@Query(value = """
			SELECT
           c.id_company As idCompany,
           c.name_company As nameCompany,
           c.email as email,
           c.cel As cel,
           c.date_register as dateRegister,
           i.data as image,
           c.cnpj_cpf as cnpjCpf,
           c.role_company as roleCompany,
           c.status_avaliation as statusAvaliation,
           n.name AS nicheName,
           ta.name AS targetAudienceName,
           sm.social_media_name as socialMediaName,
           sm.link as link
           FROM
           public.company c
		   LEFT jOIN
		   public.image i ON c.id_image = i.id_image
           LEFT JOIN
           public.niche n ON c.id_niche = n.id_niche
           LEFT JOIN
           public.target_audience ta ON c.id_target_audience = ta.id_target_audience
           LEFT JOIN
           public.social_medias sm ON c.id_company = sm.id_company
           WHERE
           c.status_db = 'ACTIVE'
           ORDER BY
           c.id_company, nameCompany asc
			""",nativeQuery = true)

    Page<Object[]> searchAllCompanies(Pageable pageable);
    
    @Query(value = """
            SELECT
           c.id_company As idCompany,
           c.name_company As nameCompany,
           c.email as email,
           c.cel As cel,
           c.date_register as dateRegister,
           i.data as image,
           c.cnpj_cpf as cnpjCpf,
           c.role_company as roleCompany,
           c.status_avaliation as statusAvaliation,
           n.name AS nicheName,
           ta.name AS targetAudienceName,
           sm.social_media_name as socialMediaName,
           sm.link as link
           FROM
           public.company c
		   LEFT jOIN
		   public.image i ON c.id_image = i.id_image
           LEFT JOIN
           public.niche n ON c.id_niche = n.id_niche
           LEFT JOIN
           public.target_audience ta ON c.id_target_audience = ta.id_target_audience
           LEFT JOIN
           public.social_medias sm ON c.id_company = sm.id_company
            WHERE
            c.status_db = 'ACTIVE'
            AND c.id_company = :id
            """, nativeQuery = true)
     List<Object[]> searchCompanyById(Long id);

}

