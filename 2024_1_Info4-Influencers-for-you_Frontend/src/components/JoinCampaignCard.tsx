import { useEffect, useState } from "react";
import { CampaignDto, Influencer, Niche } from "../types";
import { findAllCampaign } from "../api/campaign";
import { Card, Col, Button, Form } from "react-bootstrap";
import { requestParticipation } from "../api/influencerCampaign";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { findAllInfluencers } from "../api/influencer";
import StatusModal from "./StatusModal";
import { getNiches } from "../api/niche";
import "../css/JoinCampaignCard.css";

export default function JoinCampaignCard() {
  const [campaign, setCampaign] = useState<CampaignDto[]>([]);
  const [requestedCampaigns, setRequestedCampaigns] = useState<number[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [influencerId, setInfluencerId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [modalStatus, setModalStatus] = useState<"success" | "error">(
    "success"
  );
  const [modalMessage, setModalMessage] = useState("");
  const [niches, setNiches] = useState<Niche[]>([]);
  const [selectedNiche, setSelectedNiche] = useState<number | null>(null);

  interface JwtPayload {
    sub: string;
  }

  useEffect(() => {
    const dataToken = localStorage.getItem("token");
    if (!dataToken) {
      navigate("/login");
      return;
    }
    setToken(dataToken);

    const decodedToken = jwtDecode<JwtPayload>(dataToken);
    const email = decodedToken.sub;

    const fetchInfluencerId = async (email: string) => {
      try {
        const influencers = await findAllInfluencers();
        const influencer = influencers.find(
          (influencer: Influencer) => influencer.email === email
        );
        setInfluencerId(influencer ? influencer.id : null);
      } catch (error) {
        console.error("Failed to fetch influencer ID:", error);
      }
    };

    fetchInfluencerId(email);
  }, [navigate]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await findAllCampaign();
        if (Array.isArray(data)) {
          setCampaign(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    const fetchNiches = async () => {
      try {
        const response = await getNiches();
        console.log("Fetched Niches:", response);
        if (response && Array.isArray(response.content)) {
          setNiches(response.content);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNiches();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleRequestParticipation = async (campaignId: number) => {
    if (influencerId === null || token === null) {
      console.error("Influencer ID or token not found");
      return;
    }

    if (requestedCampaigns.includes(campaignId)) {
      setModalStatus("error");
      setModalMessage("Você já solicitou participação nesta campanha.");
      setModalShow(true);
      return;
    }

    try {
      await requestParticipation(influencerId, campaignId, token);
      setRequestedCampaigns([...requestedCampaigns, campaignId]);
      setModalStatus("success");
      setModalMessage(
        `Solicitação de participação na campanha enviada com sucesso!`
      );
      setModalShow(true);
    } catch (error) {
      console.error(error);
      setModalStatus("error");
      setModalMessage(`Falha ao solicitar participação na campanha.`);
      setModalShow(true);
    }
  };

  const renderCampaignCard = (campaign: CampaignDto) => (
    <Card
      key={campaign.id}
      tabIndex={0}
      aria-label={`Card da Campanha ${campaign.name}`}
      className="campaign-card"
    >
      <img
        src={`data:${campaign.image.type};base64,${campaign.image.data}`}
        alt={`Imagem da Campanha ${campaign.name}`}
        className="campaign-card-img"
      />
      <Card.Body className="campaign-card-body">
        <Card.Title className="campaign-card-title">{campaign.name}</Card.Title>
        <Card.Text className="campaign-card-text company-info">
          Nicho: {campaign.niche.name}
        </Card.Text>
        <Card.Text className="campaign-card-text company-info">
          Valor: {formatCurrency(campaign.wage)}
        </Card.Text>
        <div className="campaign-card-highlight">
          <Card.Text className="campaign-card-text">
            Tarefas: {campaign.tasks}
          </Card.Text>
        </div>
        <div className="action-button-container">
          <Button
            variant="primary"
            onClick={() => handleRequestParticipation(campaign.id)}
            className="request-participation-button"
          >
            Solicitar Participação
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  const filteredCampaigns = selectedNiche
    ? campaign.filter((c) => c.niche.id === selectedNiche)
    : campaign;

  return (
    <Col lg={12} md={12} sm={12} className="mb-3">
      <div className="filter-container mb-3">
        <Form.Group controlId="nicheFilter" className="form-group">
          <Form.Label className="form-label">
            Buscar campanha por nicho
          </Form.Label>
          <Form.Control
            as="select"
            value={selectedNiche || ""}
            onChange={(e) => setSelectedNiche(Number(e.target.value))}
            className="form-control"
          >
            <option value="">Todos os Nichos</option>
            {niches.map((niche) => (
              <option key={niche.id} value={niche.id}>
                {niche.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
      <div className="card-campaigns-outer-container">
        <div className="card-campaigns-container">
          {filteredCampaigns
            .filter((campaign) => campaign.statusAvaliation === "APPROVED")
            .map(renderCampaignCard)}
        </div>
      </div>
      <StatusModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        status={modalStatus}
        message={modalMessage}
      />
    </Col>
  );
}
