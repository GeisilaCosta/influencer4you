package br.org.serratec.influencerforyou.dto;



import br.org.serratec.influencerforyou.model.Campaign;
import br.org.serratec.influencerforyou.model.Company;
import br.org.serratec.influencerforyou.model.Image;
import br.org.serratec.influencerforyou.model.StatusAvaliation;
import br.org.serratec.influencerforyou.model.StatusDb;
import br.org.serratec.influencerforyou.util.Mapper;

public class CampaignDto {

    private Long id;
    private String budget;
    private Image image;
    private String name;
    private NicheDto niche; 
    private StatusAvaliation statusAvaliation;
    private StatusDb statusdb;
    private String tasks;
    private Double wage;
    private Company company;

    public CampaignDto() {
        // Construtor padrão
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
  
    public NicheDto getNiche() {
		return niche;
	}

	public void setNiche(NicheDto niche) {
		this.niche = niche;
	}

	public StatusAvaliation getStatusAvaliation() {
        return statusAvaliation;
    }

    public void setStatusAvaliation(StatusAvaliation statusAvaliation) {
        this.statusAvaliation = statusAvaliation;
    }

    public StatusDb getStatusdb() {
        return statusdb;
    }

    public void setStatusdb(StatusDb statusdb) {
        this.statusdb = statusdb;
    }

    public String getTasks() {
        return tasks;
    }

    public void setTasks(String tasks) {
        this.tasks = tasks;
    }

    public Double getWage() {
        return wage;
    }

    public void setWage(Double wage) {
        this.wage = wage;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Campaign toEntity() {
        return Mapper.getMapper().convertValue(this, Campaign.class);
    }

    public static CampaignDto toDto(Campaign campaignEntity) {
        return Mapper.getMapper().convertValue(campaignEntity, CampaignDto.class);
    }
}

