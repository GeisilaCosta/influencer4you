import { Card, Button } from "react-bootstrap";
import { CampaignDto } from "../types";
import imgDefault from "../assets/image6.png";
import "../css/CompanyCard.css";
import { getImageUrl } from "../utils/imageUtil";

type Props = {
  campaign: CampaignDto;
  handleApproveCampaign: (idCampaign: number) => void;
  handleDenyCampaign: (idCampaign: number) => void;
};

export default function CampaignCard({
  campaign,
  handleApproveCampaign,
  handleDenyCampaign,
}: Props) {
  const imageUrl = getImageUrl(campaign.image);

  return (
    <Card
      key={campaign.id}
      tabIndex={0}
      aria-label={`Card da Campanha ${campaign.name}`}
      className="company-card"
    >
      <Card.Body className="company-card-body">
        <div className="company-card-img-container">
          <img
            src={imageUrl || imgDefault}
            alt={`Imagem da Campanha ${campaign.name}`}
            className="card-img"
          />
        </div>
        <div className="card-content">
          <Card.Title className="card-title">{campaign.name}</Card.Title>
          <Card.Text className="contact-info">
            {campaign.company.nameCompany}
          </Card.Text>
          <Card.Text className="status-text">
            Nicho: {campaign.niche.name}
          </Card.Text>
        </div>
      </Card.Body>
      {campaign.statusAvaliation === "PENDING" && (
        <div className="action-button-container">
          <Button
            size="sm"
            className="action-button action-button-approve"
            onClick={() => handleApproveCampaign(campaign.id)}
            aria-label={`Aprovar Campanha ${campaign.name}`}
          >
            Aprovar
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="action-button action-button-deny"
            onClick={() => handleDenyCampaign(campaign.id)}
            aria-label={`Negar Campanha ${campaign.name}`}
          >
            Negar
          </Button>
        </div>
      )}
    </Card>
  );
}
