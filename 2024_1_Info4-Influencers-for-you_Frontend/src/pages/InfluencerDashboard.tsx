import { useState, useEffect } from "react";
import { Tabs, Tab, Card, Container, Col, Row } from "react-bootstrap";
import JoinCampaignCard from "../components/JoinCampaignCard";
import { CampaignDto, Influencer, InfluencerCampaignDto } from "../types";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { findAllInfluencers } from "../api/influencer";
import { formatPhone } from "../utils";
import "../css/InfluencerDashboard.css";
import { getInfluencerCampaigns } from "../api/influencerCampaign";
import { getCampaignById } from "../api/campaign";

interface JwtPayload {
  sub: string;
}

const InfluencerDashboard = () => {
  const navigate = useNavigate();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [approvedCampaigns, setApprovedCampaigns] = useState<CampaignDto[]>([]);
  const [pendingCampaigns, setPendingCampaigns] = useState<CampaignDto[]>([]);

  useEffect(() => {
    const dataToken = localStorage.getItem("token");
    if (!dataToken) {
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode<JwtPayload>(dataToken);
    const influencerEmail = decodedToken.sub;

    const fetchInfluencerByEmail = async (email: string) => {
      try {
        const influencers = await findAllInfluencers();
        const influencer = influencers.find(
          (influencer: Influencer) => influencer.email === email
        );
        setInfluencer(influencer || null);
      } catch (error) {
        console.error("Failed to fetch influencer by email:", error);
      }
    };

    fetchInfluencerByEmail(influencerEmail);
  }, [navigate]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const influencerCampaigns: InfluencerCampaignDto[] =
          await getInfluencerCampaigns();

        const uniqueCampaignIds = new Set<number>();
        const approvedCampaignPromises: Promise<CampaignDto>[] = [];
        const pendingCampaignPromises: Promise<CampaignDto>[] = [];

        influencerCampaigns.forEach((ic) => {
          const influencerInCampaign = ic.influencers.find(
            (inf) => inf.id === influencer?.id
          );

          if (influencerInCampaign && !uniqueCampaignIds.has(ic.campaignId)) {
            uniqueCampaignIds.add(ic.campaignId);
            const campaignPromise = getCampaignById(ic.campaignId);
            if (influencerInCampaign.status === "APPROVED") {
              approvedCampaignPromises.push(campaignPromise);
            } else if (influencerInCampaign.status === "PENDING") {
              pendingCampaignPromises.push(campaignPromise);
            }
          }
        });

        const approvedResults = await Promise.all(approvedCampaignPromises);
        const pendingResults = await Promise.all(pendingCampaignPromises);

        setApprovedCampaigns(approvedResults);
        setPendingCampaigns(pendingResults);
      } catch (error) {
        console.error("Error fetching campaigns", error);
      }
    };

    if (influencer) {
      fetchCampaigns();
    }
  }, [influencer]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Container className="mt-4">
      <Tabs
        id="controlled-tab-example"
        defaultActiveKey="profile"
        className="custom-tabs"
      >
        <Tab eventKey="profile" title="Perfil">
          {influencer && (
            <Card className="custom-profile-card">
              <div className="profile-image">
                <img src={influencer.imageUrl} alt={`Imagem de ${influencer.name}`} />
              </div>
              <div className="profile-details">
                <Card.Title className="profile-name">
                  {influencer.name}
                  <Card.Text className="niche-text">
                    Nicho: {influencer.niche.name}
                  </Card.Text>
                </Card.Title>
                <Card.Text className="profile-email">{influencer.email}</Card.Text>
                <Card.Text className="status-text">
                  Contato: {formatPhone(influencer.cel)}
                </Card.Text>
                <div className="social-media-list">
                  {influencer.socialMedias.map((social) => (
                    <span key={social.id} className="social-media-item">
                      {social.socialMediaName.toLocaleLowerCase()}: {social.link}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          )}
          <Row>
            <Col>
              <h4 className="section-title">Campanhas aprovadas</h4>
              {approvedCampaigns.map((campaign) => (
                <Card key={`approved-${campaign.id}`} className="campaign-card">
                  <Card.Body>
                    <div className="card-header">
                      <div className="campaign-name">{campaign.name}</div>
                      <div className="company-name">{campaign.company.nameCompany}</div>
                    </div>
                    <div className="campaign-value">
                      Valor: {formatCurrency(campaign.wage)}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Col>

            <Col>
              <h4 className="section-title">Campanhas pendentes</h4>
              {pendingCampaigns.map((campaign) => (
                <Card key={`pending-${campaign.id}`} className="campaign-card">
                  <Card.Body>
                    <div className="card-header">
                      <div className="campaign-name">{campaign.name}</div>
                      <div className="company-name">{campaign.company.nameCompany}</div>
                    </div>
                    <div className="campaign-value">
                      Valor: {formatCurrency(campaign.wage)}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="campaigns" title="Campanhas">
          <JoinCampaignCard />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default InfluencerDashboard;
