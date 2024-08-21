import { Card, Button } from "react-bootstrap";
import { Company } from "../types";
import { formatPhone } from "../utils";
import imgDefault from "../assets/image6.png";
import "../css/CompanyCard.css";

type Props = {
  company: Company;
  handleApproveCompany: (idCompany: number) => void;
  handleDenyCompany: (idCompany: number) => void;
};

export default function CompanyCard({
  company,
  handleApproveCompany,
  handleDenyCompany,
}: Props) {
  return (
    <Card
      key={company.idCompany}
      tabIndex={0}
      aria-label={`Card da Empresa ${company.nameCompany}`}
      className="company-card"
    >
      <Card.Body className="company-card-body">
        <div className="company-card-img-container">
          <img
            src={company.image?.url || imgDefault}
            alt={`Imagem da Empresa ${company.nameCompany}`}
            className="card-img"
          />
        </div>
        <div className="card-content">
          <Card.Title className="card-title">{company.nameCompany}</Card.Title>
          <Card.Text className="contact-info">{company.email}</Card.Text>
          <Card.Text className="status-text">
            Contato: {formatPhone(company.cel)}
          </Card.Text>
        </div>
      </Card.Body>
      {company.statusAvaliation === "PENDING" && (
        <div className="action-button-container">
          <Button
            size="sm"
            className="action-button action-button-approve"
            onClick={() => handleApproveCompany(company.idCompany)}
            aria-label={`Aprovar Empresa ${company.nameCompany}`}
          >
            Aprovar
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="action-button action-button-deny"
            onClick={() => handleDenyCompany(company.idCompany)}
            aria-label={`Negar Empresa ${company.nameCompany}`}
          >
            Negar
          </Button>
        </div>
      )}
    </Card>
  );
}
