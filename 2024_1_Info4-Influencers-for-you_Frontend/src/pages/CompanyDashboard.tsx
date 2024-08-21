import React, { useState, useEffect } from "react";
import { Tabs, Tab, Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { findAllCampaignsPag } from "../api/campaign";
import { findAllInfluencersPag } from "../api/influencer";
import { useNavigate } from "react-router-dom";
import { CampaignDto2, Company, Influencer, Niche } from "../types";
import { jwtDecode } from "jwt-decode";
import { Line, Bar } from "react-chartjs-2";
import { findAllCompanyPag } from "../api/company";
import { getNiches } from "../api/niche";
import "../css/CompanyDashboard.css";

const CompanyDashboard: React.FC = () => {
  const [key, setKey] = useState<string>("profile");
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<CampaignDto2[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [niches, setNiches] = useState<Niche[]>([]);
  const [selectedNiche, setSelectedNiche] = useState<number | null>(null);

  interface JwtPayload {
    sub: string;
  }

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

  const engagementData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
    datasets: [
      {
        label: "Engajamento",
        data: [65, 63, 70, 75, 70, 77, 89],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const businessData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
    datasets: [
      {
        label: "Negócios Feitos",
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const dataToken = localStorage.getItem("token");
    if (!dataToken) {
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode<JwtPayload>(dataToken);
    const companyEmail = decodedToken.sub;

    const fetchCompanyByEmail = async (email: string) => {
      try {
        const companies = await findAllCompanyPag();
        const company = companies.find((company: Company) => company.email === email);
        console.log("Fetched company by email:", company);
        setCompany(company);
      } catch (error) {
        console.error("Failed to fetch company by email:", error);
      }
    };

    fetchCompanyByEmail(companyEmail);
  }, [navigate]);

  useEffect(() => {
    if (company) {
      const fetchCompanyData = async (id: number) => {
        try {
          // Fetch all campaigns
          const campaigns = await findAllCampaignsPag();
          const filteredCampaigns = campaigns.filter(
            (campaign: CampaignDto2) => campaign.company.id === id
          );

          console.log("All campaigns:", campaigns);
          console.log("Filtered campaigns:", filteredCampaigns);

          setCampaigns(filteredCampaigns);

          // Fetch all influencers
          const fetchedInfluencers = await findAllInfluencersPag();
          setInfluencers(fetchedInfluencers);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchCompanyData(company.idCompany);
    }
  }, [company]);

  const filteredInfluencers = selectedNiche
    ? influencers.filter((influencer) => influencer.niche?.id === selectedNiche)
    : influencers;

  const filteredApprovedInfluencers = filteredInfluencers.filter(
    (influencer) => influencer.statusAvaliation === "APPROVED"
  );

  return (
    <Container className="mt-4">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k || "profile")}
        className="custom-tabs"
      >
        <Tab eventKey="profile" title="Perfil">
          {company && (
            <Card className="custom-card-container">
              <Card.Body>
                <Row>
                  <Col md={14}>
                    <Card.Title>{company.nameCompany}</Card.Title>
                    <Card.Text>{company.email}</Card.Text>
                    <Card.Text>{company.cnpjCpf}</Card.Text>
                    <Card.Text>{company.cel}</Card.Text>
                    <div className="action-button-container">
                      <Button
                        variant="primary"
                        className="action-button"
                        onClick={() => setShowEditForm(true)}
                      >
                        Editar Perfil
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {showEditForm && (
            <Card className="form-container">
              <Card.Body>
                <h4>Editar Perfil</h4>
                <Form>
                  <Form.Group controlId="formName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" defaultValue={company?.nameCompany} />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" defaultValue={company?.email} />
                  </Form.Group>
                  <Form.Group controlId="formCnpj">
                    <Form.Label>CNPJ</Form.Label>
                    <Form.Control type="text" defaultValue={company?.cnpjCpf} />
                  </Form.Group>
                  <Form.Group controlId="formContact">
                    <Form.Label>Contato</Form.Label>
                    <Form.Control type="text" defaultValue={company?.cel} />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Salvar
                  </Button>
                  <Button
                    variant="secondary"
                    className="ml-2"
                    onClick={() => setShowEditForm(false)}
                  >
                    Cancelar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Tab>

        <Tab eventKey="campaigns" title="Campanhas">
          <Button
            variant="primary"
            onClick={() => navigate("/campanha")}
            className="mb-3"
            style={{ marginTop: 15 }}
          >
            Criar Nova Campanha
          </Button>
          <Row>
            {campaigns.map((campaign) => (
              <Col md={4} key={campaign.id} className="mb-3">
                <Card className="custom-card-container">
                  {campaign.image && (
                    <Card.Img
                      variant="top"
                      src={`data:${campaign.image.type};base64,${campaign.image.data}`}
                      alt={campaign.name}
                    />
                  )}
                  <Card.Body style={{ height: 184 }}>
                    <Card.Title>{campaign.name}</Card.Title>
                    <Card.Text>
                      <strong>Salário: </strong>
                      {campaign.wage}
                    </Card.Text>
                    <Card.Text>
                      <strong>Orçamento: </strong>
                      {campaign.budget}
                    </Card.Text>
                    <Card.Text>
                      <strong>Status:</strong> {campaign.statusAvaliation}
                    </Card.Text>
                    <Card.Text>
                      <strong>Tarefas</strong> {campaign.tasks}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        <Tab eventKey="statistics" title="Visualizar Estatísticas">
          <Card className="custom-card-container">
            <Card.Body>
              <h4>Estatísticas:</h4>
              <Row>
                <Col md={18}>
                  <Card className="mb-4">
                    <Card.Body>
                      <h3 className="texto-estatistica">Engajamento ao Longo do Ano</h3>
                      <Line data={engagementData} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="custom-card-container">
            <Card.Body>
              <h4>Estatísticas </h4>
              <Row>
                <Col md={18}>
                  <Card className="mb-4">
                    <Card.Body>
                      <h3 className="texto-estatistica">Negócios Feitos</h3>
                      <Bar
                        style={{ height: "300px", width: "500px" }}
                        data={businessData}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="hire" title="Contratar Influencers">
          <Form.Group controlId="nicheFilter" className="form-group">
            <Form.Label className="form-label">Buscar Influencers por nicho</Form.Label>
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
          <Row>
            {filteredApprovedInfluencers.map((influencer) => (
              <Col md={4} key={influencer.id} className="mb-4">
                <Card className="custom-card-container">
                  <Card.Body style={{ height: 186, justifyContent: "start" }}>
                    <Card.Title>{influencer.name}</Card.Title>
                    <Card.Text>Email: {influencer.email}</Card.Text>
                    <Card.Text>
                      Mídias Sociais:
                      <ul>
                        {influencer.socialMedias.map((media, index) => (
                          <li key={index}>
                            Nome: {media.socialMediaName}, Link: {media.link}
                          </li>
                        ))}
                      </ul>
                    </Card.Text>
                    <Button variant="primary">Contratar</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default CompanyDashboard;
