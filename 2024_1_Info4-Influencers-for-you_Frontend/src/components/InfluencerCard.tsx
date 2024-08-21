import { Card, Button } from "react-bootstrap";
import { Influencer } from "../types";
import { formatPhone } from "../utils";
import "../css/InfluencerCard.css";

type Props = {
  influencer: Influencer;
  handleApproveInfluencer: (id: number) => void;
  handleDenyInfluencer: (id: number) => void;
};

export default function InfluencerCard({
  influencer,
  handleApproveInfluencer,
  handleDenyInfluencer,
}: Props) {
  return (
    <Card
      key={influencer.id}
      tabIndex={0}
      aria-label={`Card de Influenciador ${influencer.name}`}
      className="influencer-card"
    >
      <Card.Body className="influencer-card-body">
        <div className="card-img-container">
          <img
            src={influencer.imageUrl}
            alt={`Imagem de ${influencer.name}`}
            className="card-img"
          />
        </div>
        <div className="card-content">
          <Card.Title className="card-title">{influencer.name}</Card.Title>
          <Card.Text className="contact-info">{influencer.email}</Card.Text>
          <Card.Text className="status-text">
            Contato: {formatPhone(influencer.cel)}
          </Card.Text>
        </div>
      </Card.Body>
      {influencer.statusAvaliation === "PENDING" && (
        <div className="action-button-container">
          <Button
            size="sm"
            className="action-button action-button-approve"
            onClick={() => handleApproveInfluencer(influencer.id)}
            aria-label={`Aprovar Influenciador ${influencer.name}`}
          >
            Aprovar
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="action-button action-button-deny"
            onClick={() => handleDenyInfluencer(influencer.id)}
            aria-label={`Negar Influenciador ${influencer.name}`}
          >
            Negar
          </Button>
        </div>
      )}
    </Card>
  );
}
