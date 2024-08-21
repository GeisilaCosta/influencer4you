import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Tabs, Tab, Form } from "react-bootstrap";
import { CampaignDto, Company, Influencer } from "../types";
import {
  approveCompany,
  findAllCompanyPag,
  rejectCompany,
} from "../api/company";
import StatusModal from "../components/StatusModal";
import {
  approveInfluencer,
  findAllInfluencersPag,
  rejectInfluencer,
} from "../api/influencer";
import { postNiche } from "../api/niche";
import { postTargetAudience } from "../api/targetAudience";
import {
  approveCampaign,
  findAllCampaignsPag,
  rejectCampaign,
} from "../api/campaign";
import { useNavigate } from "react-router-dom";
import InfluencerCard from "../components/InfluencerCard";
import CompanyCard from "../components/CompanyCard";
import CampaignCard from "../components/CampaignCard";
import "../css/AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [campaign, setCampaign] = useState<CampaignDto[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalStatus, setModalStatus] = useState<"success" | "error">(
    "success"
  );
  const [modalMessage, setModalMessage] = useState("");
  const [niche, setNiche] = useState<string>("");
  const [targetAudience, setTargetAudience] = useState<string>("");
  const [token, setToken] = useState("");
  const [currentPage] = useState<number>(0);
  const [pageSize] = useState<number>(50);
  const navigate = useNavigate();

  useEffect(() => {
    const dataToken = localStorage.getItem("token") || "";
    if (!dataToken) {
      return navigate("/login");
    }
    setToken(dataToken);
  }, []);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const data = await findAllInfluencersPag(currentPage, pageSize);
        if (Array.isArray(data)) {
          setInfluencers(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchInfluencers();
  }, [currentPage, pageSize]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await findAllCompanyPag(currentPage, pageSize);
        if (Array.isArray(data)) {
          setCompanies(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
  }, [currentPage, pageSize]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await findAllCampaignsPag(currentPage, pageSize);
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
  }, [currentPage, pageSize]);

  const handleApproveInfluencer = async (id: number) => {
    try {
      await approveInfluencer(id, token);
      setInfluencers((prevInfluencers) =>
        prevInfluencers.map((influencer) =>
          influencer.id === id
            ? { ...influencer, statusAvaliation: "APPROVED" }
            : influencer
        )
      );
      setModalStatus("success");
      setModalMessage("influencer aprovada com sucesso!");
      setModalShow(true);
    } catch (error) {
      console.error("Failed to approve influencer:", error);
      setModalStatus("error");
      setModalMessage("Falha ao aprovar a influencer.");
      setModalShow(true);
    }
  };

  const handleDenyInfluencer = async (id: number) => {
    try {
      await rejectInfluencer(id, token);
      setInfluencers((prevInfluencers) =>
        prevInfluencers.map((influencer) =>
          influencer.id === id
            ? { ...influencer, statusAvaliation: "REJECTED" }
            : influencer
        )
      );
      setModalStatus("success");
      setModalMessage("influencer reprovada com sucesso!");
      setModalShow(true);
    } catch (error) {
      console.error("Failed to reject influencer:", error);
      setModalStatus("error");
      setModalMessage("Falha ao reprovar a influencer.");
      setModalShow(true);
    }
  };

  const handleApproveCompany = async (id: number) => {
    try {
      await approveCompany(id, token);
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.idCompany === id
            ? { ...company, statusAvaliation: "APPROVED" }
            : company
        )
      );
      setModalStatus("success");
      setModalMessage("Empresa aprovada com sucesso!");
      setModalShow(true);
    } catch (error) {
      console.error("Failed to approve company:", error);
      setModalStatus("error");
      setModalMessage("Falha ao aprovar a empresa.");
      setModalShow(true);
    }
  };

  const handleDenyCompany = async (id: number) => {
    try {
      await rejectCompany(id, token);
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.idCompany === id
            ? { ...company, statusAvaliation: "REJECTED" }
            : company
        )
      );
      setModalStatus("success");
      setModalMessage("Empresa reprovada com sucesso!");
      setModalShow(true);
    } catch (error) {
      console.error("Failed to reject company:", error);
      setModalStatus("error");
      setModalMessage("Falha ao reprovar a empresa.");
      setModalShow(true);
    }
  };

  const handleApproveCampaign = async (id: number) => {
    try {
      await approveCampaign(id, token);
      setCampaign((prevCampaigns) =>
        prevCampaigns.map((campaign) =>
          campaign.id === id
            ? { ...campaign, statusAvaliation: "APPROVED" }
            : campaign
        )
      );
      setModalStatus("success");
      setModalMessage("Empresa aprovada com sucesso!");
      setModalShow(true);
    } catch (error) {
      console.error("Failed to approve company:", error);
      setModalStatus("error");
      setModalMessage("Falha ao aprovar a empresa.");
      setModalShow(true);
    }
  };

  const handleDenyCampaign = async (id: number) => {
    try {
      await rejectCampaign(id, token);
      setCampaign((prevCampaigns) =>
        prevCampaigns.map((campaign) =>
          campaign.id === id
            ? { ...campaign, statusAvaliation: "REJECTED" }
            : campaign
        )
      );
      setModalStatus("success");
      setModalMessage("Empresa reprovada com sucesso!");
      setModalShow(true);
    } catch (error) {
      console.error("Failed to reject company:", error);
      setModalStatus("error");
      setModalMessage("Falha ao reprovar a empresa.");
      setModalShow(true);
    }
  };

  const handleNicheSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!niche) {
      setModalStatus("error");
      setModalMessage("O nome do nicho não pode estar vazio.");
      setModalShow(true);
      return;
    }
    try {
      const newNiche = await postNiche({ name: niche }, token);
      console.log("Niche submitted successfully:", newNiche);
      if (newNiche) {
        setModalStatus("success");
        setModalMessage("Nicho cadastrado com sucesso!");
        setModalShow(true);
        setNiche("");
      } else {
        throw new Error("Nicho não foi criado");
      }
    } catch (error) {
      console.error("There was an error submitting the niche:", error);
      setModalStatus("error");
      setModalMessage("Falha ao cadastrar o nicho.");
      setModalShow(true);
    }
  };

  const handleTargetAudienceSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!targetAudience) {
      setModalStatus("error");
      setModalMessage("O nome do público alvo não pode estar vazio.");
      setModalShow(true);
      return;
    }

    try {
      const newAudience = await postTargetAudience(
        { name: targetAudience },
        token
      );
      console.log("Target audience submitted successfully:", newAudience);
      if (newAudience) {
        setModalStatus("success");
        setModalMessage("Público alvo cadastrado com sucesso!");
        setModalShow(true);
        setTargetAudience("");
      } else {
        throw new Error("Público alvo não foi criado");
      }
    } catch (error) {
      console.error(
        "There was an error submitting the target audience:",
        error
      );
      setModalStatus("error");
      setModalMessage("Falha ao cadastrar o público alvo.");
      setModalShow(true);
    }
  };

  return (
    <Container className="mt-4 mb-3 container-fluid">
      <Tabs
        defaultActiveKey="influencers"
        id="justify-tab-example"
        className="custom-tabs"
        justify
        role="tablist"
        tabIndex={0}
      >
        <Tab
          eventKey="influencers"
          title="Influencers"
          aria-controls="influencers-tab"
          role="tab"
        >
          <Row className="justify-content-center">
            <Col lg={4} md={6} sm={12} className="mb-3" role="tabpanel">
              <div className="custom-card-container" tabIndex={0}>
                <h4 className="fixed-headers">Pendentes</h4>
                {influencers
                  .filter(
                    (influencer) => influencer.statusAvaliation === "PENDING"
                  )
                  .map((influencer) => (
                    <InfluencerCard
                      key={influencer.id}
                      influencer={influencer}
                      handleApproveInfluencer={handleApproveInfluencer}
                      handleDenyInfluencer={handleDenyInfluencer}
                    />
                  ))}
              </div>
            </Col>
            <Col lg={4} md={6} sm={12} className="mb-3" role="tabpanel">
              <div className="custom-card-container" tabIndex={0}>
                <h4 className="fixed-headers">Aprovados</h4>
                {influencers
                  .filter(
                    (influencer) => influencer.statusAvaliation === "APPROVED"
                  )
                  .map((influencer) => (
                    <InfluencerCard
                      key={influencer.id}
                      influencer={influencer}
                      handleApproveInfluencer={handleApproveInfluencer}
                      handleDenyInfluencer={handleDenyInfluencer}
                    />
                  ))}
              </div>
            </Col>
            <Col lg={4} md={6} sm={12} className="mb-3">
              <div className="custom-card-container" tabIndex={0}>
                <h4 className="fixed-headers">Negados</h4>
                {influencers
                  .filter(
                    (influencer) => influencer.statusAvaliation === "REJECTED"
                  )
                  .map((influencer) => (
                    <InfluencerCard
                      key={influencer.id}
                      influencer={influencer}
                      handleApproveInfluencer={handleApproveInfluencer}
                      handleDenyInfluencer={handleDenyInfluencer}
                    />
                  ))}
              </div>
            </Col>
          </Row>
        </Tab>
        <Tab
          eventKey="empresas"
          title="Empresas"
          aria-controls="empresas-tab"
          role="tab"
        >
          <Row className="justify-content-center">
            <Col lg={4} md={6} sm={12} className="mb-3">
              <div className="custom-card-container" tabIndex={0}>
                <h4 className="fixed-headers">Pendentes</h4>
                {companies
                  .filter((company) => company.statusAvaliation === "PENDING")
                  .map((company) => (
                    <CompanyCard
                      key={company.idCompany}
                      company={company}
                      handleApproveCompany={handleApproveCompany}
                      handleDenyCompany={handleDenyCompany}
                    />
                  ))}
              </div>
            </Col>
            <Col lg={4} md={6} sm={12} className="mb-3">
              <div className="custom-card-container" tabIndex={0}>
                <h4 className="fixed-headers">Aprovados</h4>
                {companies
                  .filter((company) => company.statusAvaliation === "APPROVED")
                  .map((company) => (
                    <CompanyCard
                      key={company.idCompany}
                      company={company}
                      handleApproveCompany={handleApproveCompany}
                      handleDenyCompany={handleDenyCompany}
                    />
                  ))}
              </div>
            </Col>
            <Col lg={4} md={6} sm={12} className="mb-3">
              <div className="custom-card-container" tabIndex={0}>
                <h4 className="fixed-headers">Negados</h4>
                {companies
                  .filter((company) => company.statusAvaliation === "REJECTED")
                  .map((company) => (
                    <CompanyCard
                      key={company.idCompany}
                      company={company}
                      handleApproveCompany={handleApproveCompany}
                      handleDenyCompany={handleDenyCompany}
                    />
                  ))}
              </div>
            </Col>
          </Row>
        </Tab>
        <Tab
          eventKey="campanhas"
          title="Campanhas"
          aria-controls="campanhas-tab"
          role="tab"
        >
          <Row className="justify-content-center">
            <Col lg={4} md={6} sm={12} className="mb-3">
              <div className="custom-card-container" tabIndex={0}>
                <h4 className="fixed-headers">Pendentes</h4>
                {campaign
                  .filter((campaign) => campaign.statusAvaliation === "PENDING")
                  .map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      handleApproveCampaign={handleApproveCampaign}
                      handleDenyCampaign={handleDenyCampaign}
                    />
                  ))}
              </div>
            </Col>
            <Col lg={4} md={6} sm={12} className="mb-3">
              <div className="custom-card-container" tabIndex={0}>
                <h4 className="fixed-headers">Aprovados</h4>
                {campaign
                  .filter(
                    (campaign) => campaign.statusAvaliation === "APPROVED"
                  )
                  .map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      handleApproveCampaign={handleApproveCampaign}
                      handleDenyCampaign={handleDenyCampaign}
                    />
                  ))}
              </div>
            </Col>
            <Col lg={4} md={6} sm={12} className="mb-3">
              <div className="custom-card-container" tabIndex={0}>
                <h4 className="fixed-headers">Negados</h4>
                {campaign
                  .filter(
                    (campaign) => campaign.statusAvaliation === "REJECTED"
                  )
                  .map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      handleApproveCampaign={handleApproveCampaign}
                      handleDenyCampaign={handleDenyCampaign}
                    />
                  ))}
              </div>
            </Col>
          </Row>
        </Tab>
      </Tabs>
      <Row className="justify-content-center">
        <Col lg={6} md={12} className="mb-3">
          <div className="form-container">
            <h4>Cadastrar Nicho</h4>
            <Form
              onSubmit={handleNicheSubmit}
              aria-label="Formulário de Cadastro de Nicho"
            >
              <Form.Group controlId="formNiche">
                <Form.Label>Nicho</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o nome do nicho"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  aria-label="Nome do Nicho"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                aria-label="Botão para cadastrar nicho"
              >
                Cadastrar
              </Button>
            </Form>
          </div>
        </Col>
        <Col lg={6} md={12} className="mb-3">
          <div className="form-container">
            <h4>Cadastrar Público Alvo</h4>
            <Form
              onSubmit={handleTargetAudienceSubmit}
              aria-label="Formulário de Cadastro de Público Alvo"
            >
              <Form.Group controlId="formTargetAudience">
                <Form.Label>Público Alvo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o público alvo"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  aria-label="Nome do Público Alvo"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                aria-label="Botão para cadastrar público alvo"
              >
                Cadastrar
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
      <StatusModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        status={modalStatus}
        message={modalMessage}
        aria-label="Modal de Status"
      />
    </Container>
  );
};

export default AdminDashboard;
