import React, { ChangeEvent, useState, useEffect } from "react";
import { postPost } from "../api/post";
import { useNavigate } from "react-router-dom";
import StatusModal from "../components/StatusModal";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { CampaignDto } from "../types";
import { findAllCampaign } from "../api/campaign";
import "../css/PostInfluencer.css";

export default function PostInfluencer() {
  const [formData, setFormData] = useState({
    influencerCampaignId: "",
    content: "",
    file: null as File | null,
  });

  const [modal, setModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [campaigns, setCampaigns] = useState<CampaignDto[]>([]);

  useEffect(() => {
    const dataToken = localStorage.getItem("token") || "";
    if (!dataToken) {
      navigate("/login");
    }
    setToken(dataToken);
  }, [navigate]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await findAllCampaign();
        if (Array.isArray(data)) {
          setCampaigns(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postPayload = new FormData();
    postPayload.append("influencerCampaignId", formData.influencerCampaignId);
    postPayload.append("content", formData.content);
    if (formData.file) {
      postPayload.append("file", formData.file);
    }

    try {
      const response = await postPost(postPayload, token);
      console.log(response);
      setModal(true);
      setModalStatus("success");
      setModalMessage("Post criado com sucesso");
      setTimeout(() => navigate("/feed"), 1000);
    } catch (error) {
      console.error(error);
      setModal(true);
      setModalStatus("error");
      setModalMessage("Falha ao criar o post");
    }
  };

  return (
    <div className="PostInfluencer-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <div className="PostInfluencer-formContainer">
              <h2>Crie sua Postagem</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Campanhas que você está filiado</Form.Label>
                  <Form.Control
                    as="select"
                    name="influencerCampaignId"
                    value={formData.influencerCampaignId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione uma campanha</option>
                    {campaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Escreva sua postagem</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Informe o conteúdo da postagem*"
                    rows={4}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Imagem</Form.Label>
                  <Form.Control type="file" name="file" onChange={handleFileChange} />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="PostInfluencer-submitButton"
                >
                  Enviar
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        <StatusModal
          show={modal}
          handleClose={() => setModal(false)}
          status={modalStatus}
          message={modalMessage}
        />
      </Container>
    </div>
  );
}
