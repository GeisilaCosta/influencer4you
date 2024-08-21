import { useState, ChangeEvent, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { getNiches, getMarketingFocus } from "../api/company";
import { MarketingFocus, Niche, SocialMedia } from "../types";
import { postInfluencer } from "../api/influencer";
import ListGroup from "react-bootstrap/ListGroup";
import SelectSocialMedia from "../components/SelectSocialMedia";
import axios from "axios";
import StatusModal from "../components/StatusModal";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const sendEmail = async (emailData: { para: string; assunto: string; texto: string }) => {
  try {
    await axios.post("http://34.31.132.210:8008/enviar-email", emailData);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
  }
};

export default function NewInfluencer() {
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    targetAudience: "",
    niche: "",
    socialNetwork: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    cpf: "",
    photo: null as File | null,
    cep: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [modalStatus, setModalStatus] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [cpfValid, setCpfValid] = useState(true);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [niches, setNiches] = useState<Niche[]>([]);
  const [listMarketingFocus, setListMarketingFocus] = useState<MarketingFocus[]>([]);
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);

  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [x, setX] = useState("");
  const [youtube, setYoutube] = useState("");
  const [kwai, setKwai] = useState("");
  const [koo, setKoo] = useState("");

  const socialMediaList = [
    { name: "INSTAGRAM", value: instagram, setValue: setInstagram },
    { name: "TIKTOK", value: tiktok, setValue: setTiktok },
    { name: "LINKEDIN", value: linkedin, setValue: setLinkedin },
    { name: "FACEBOOK", value: facebook, setValue: setFacebook },
    { name: "X", value: x, setValue: setX },
    { name: "YOUTUBE", value: youtube, setValue: setYoutube },
    { name: "KWAI", value: kwai, setValue: setKwai },
    { name: "KOO", value: koo, setValue: setKoo },
  ];

  const addSocialMedia = (social: SocialMedia) => {
    if (socialMedia.length === 0) return setSocialMedia([social]);
    const exists = socialMedia.find(
      (item) => item.socialMediaName === social.socialMediaName
    );
    if (exists) {
      const filtered = socialMedia.filter(
        (item) => item.socialMediaName !== social.socialMediaName
      );
      return setSocialMedia([...filtered, social]);
    }

    return setSocialMedia([...socialMedia, social]);
  };

  const removeSocialMedia = (social: SocialMedia) => {
    const filtered = socialMedia.filter(
      (item) => item.socialMediaName !== social.socialMediaName
    );
    setSocialMedia(filtered);
  };

  useEffect(() => {
    const fetchNiches = async () => {
      const { content } = await getNiches();
      setNiches(content);
    };

    fetchNiches();
  }, []);

  useEffect(() => {
    const fetchMarketingFocus = async () => {
      const { content } = await getMarketingFocus();
      setListMarketingFocus(content);
    };

    fetchMarketingFocus();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      const formattedValue = formatCPF(value);
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
      setCpfValid(validateCPF(formattedValue));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);
    if (!cpfValid) {
      alert("O CPF não é válido");
      return;
    }

    const InfluencerObj = {
      name: formData.username,
      age: formData.age,
      cnpjCpf: formData.cpf,
      email: formData.email,
      idNiche: Number(formData.niche),
      socialMedias: socialMedia, // Use the socialMedia state here
      idTargetAudience: Number(formData.targetAudience),
      cel: formData.contact,
      password: formData.password,
      cep: formData.cep,
    };

    const formPayload = new FormData();
    formPayload.append(
      "influencer",
      new Blob([JSON.stringify(InfluencerObj)], { type: "application/json" })
    );
    if (formData.photo) {
      formPayload.append("file", formData.photo);
    }

    try {
      const response = await postInfluencer(formPayload);
      console.log(response);
      setModalStatus("success");
      setModalMessage("Cadastro realizado com sucesso");
      setModalShow(true);

      // Only send the email if the registration was successful
      const emailData = {
        para: 'robox222@hotmail.com',
        assunto: 'Novo Cadastro de Influencer',
        texto: `Um novo influencer foi cadastrado com os seguintes dados:
        - Nome: ${formData.username}
        - Idade: ${formData.age}
        - Público Alvo: ${formData.targetAudience}
        - Nicho: ${formData.niche}
        -  Redes Sociais: ${socialMedia.map(social => `${social.socialMediaName}: ${social.link}`).join(', ')}
        - Email: ${formData.email}
        - Contato: ${formData.contact}
        - CPF: ${formData.cpf}`
      };

      await sendEmail(emailData);
      alert('Cadastro realizado com sucesso e email enviado para o administrador para aprovação.');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao postar influenciador:', error.response?.data || error.message);
        setModalStatus("error");
        setModalMessage(error.response?.data || "Falha ao cadastrar o influenciador.");
      } else {
        console.error('Erro desconhecido ao postar influenciador:', error);
        setModalStatus("error");
        setModalMessage("Erro desconhecido ao postar influenciador.");
      }
      setModalShow(true);
    }
  };


  const formatCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length > 9) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (cpf.length > 6) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
    } else if (cpf.length > 3) {
      cpf = cpf.replace(/(\d{3})(\d{3})/, "$1.$2");
    } else if (cpf.length > 0) {
      cpf = cpf.replace(/(\d{3})/, "$1");
    }

    return cpf;
  };

  const validateCPF = (cpf: string) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
  };

  const { darkMode } = useTheme();

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: darkMode ? "#333" : "#FFF",
      padding: "20px",
    },
    formContainer: {
      backgroundColor: darkMode ? "#444" : "#FFF",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: darkMode ? "0 0 10px rgba(0, 0, 0, 0.5)" : "0 0 10px rgba(0, 0, 0, 0.1)",
      width: "100%",
    },
    submitButton: {
      width: "100%",
      backgroundColor: darkMode
        ? buttonHovered
          ? "#B6B3E5"
          : "#6f42c1"
        : buttonHovered
          ? "#B6B3E5"
          : "#6f42c1",
      borderColor: darkMode ? "#B6B3E5" : "#B6B3E5",
      fontSize: "18px",
      fontWeight: "bold",
      padding: "10px",
      transition: "background-color 0.3s ease",
      color: darkMode ? "#FFF" : "#000",
    },
  } as { [key: string]: React.CSSProperties };

  return (
    <div style={styles.container}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <div style={styles.formContainer}>
              <h2>Cadastro de Influencers</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Informe seu nome completo*"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>CPF</Form.Label>
                  <Form.Control
                    type="text"
                    className={`${!cpfValid ? "is-invalid" : ""}`}
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    placeholder="Informe seu CPF*"
                    required
                  />
                  {!cpfValid && (
                    <Form.Control.Feedback type="invalid">
                      CPF inválido. O formato correto é 123.456.789-09.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Idade</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Informe sua idade*"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Público Alvo</Form.Label>
                  <Form.Control
                    as="select"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleChange}
                    placeholder="Selecione o Público alvo do Influenciador*"
                    required
                  >
                    <option value="">Selecione...</option>
                    {listMarketingFocus.map((item: MarketingFocus) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nicho</Form.Label>
                  <Form.Control
                    as="select"
                    name="niche"
                    value={formData.niche}
                    onChange={handleChange}
                    placeholder="Selecione o Nicho do Influenciador*"
                    required
                  >
                    <option value="">Selecione...</option>
                    {niches.map((item: Niche) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Redes sociais</Form.Label>
                  {socialMediaList.map((item) => (
                    <SelectSocialMedia
                      key={item.name}
                      addSocialMedia={addSocialMedia}
                      setSocialMedia={item.setValue}
                      socialMediaLink={item.value}
                      socialMediaName={item.name}
                    >
                      {item.name}
                    </SelectSocialMedia>
                  ))}
                  <Form.Control.Feedback type="invalid">
                    {"Inválido"}
                  </Form.Control.Feedback>
                  {socialMedia.length > 0 && (
                    <>
                      <Form.Text className="text-muted">
                        {"Redes sociais adicionadas: (Clique para excluir)"}
                      </Form.Text>
                      <ListGroup>
                        {socialMedia.map((item) => (
                          <ListGroup.Item
                            onClick={() => removeSocialMedia(item)}
                            action
                            key={item.socialMediaName}
                          >
                            {item.socialMediaName}: {item.link}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Informe seu email*"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    className={`${!passwordMatch ? "is-invalid" : ""}`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Crie uma senha*"
                    required
                  />
                  {!passwordMatch && (
                    <Form.Control.Feedback type="invalid">
                      As senhas não coincidem.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirmação de Senha</Form.Label>
                  <Form.Control
                    type="password"
                    className={`${!passwordMatch ? "is-invalid" : ""}`}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirme sua senha*"
                    required
                  />
                  {!passwordMatch && (
                    <Form.Control.Feedback type="invalid">
                      As senhas não coincidem.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contato (telefone)</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Informe seu telefone com DDD (ex: 11987654321)*"
                    pattern="[0-9]{10,11}"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Foto (opcional)</Form.Label>
                  <Form.Control type="file" name="photo" onChange={handleFileChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>CEP</Form.Label>
                  <Form.Control
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    placeholder="Informe seu CEP*"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  style={styles.submitButton}
                  onMouseEnter={() => setButtonHovered(true)}
                  onMouseLeave={() => setButtonHovered(false)}
                >
                  Enviar
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
        />
      </Container>
    </div>
  );
}
