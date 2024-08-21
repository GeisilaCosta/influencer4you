import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import FormCompany from "../components/FormCompany";
import { postCompany, getNiches, getMarketingFocus } from "../api/company";
import { SocialMedia } from "../types";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const styles = {
  textAlign: "center",
  marginBottom: "30px",
} as React.CSSProperties;

export default function NewCompany() {
  const [company, setCompany] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [niches, setNiches] = useState([]);
  const [niche, setNiche] = useState("");
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [listMarketingFocus, setListMarketingFocus] = useState([]);
  const [marketingFocus, setMarketingFocus] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState<File>(new File([], ""));
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [modalShow, setModalShow] = useState(false);
  const [modalStatus, setModalStatus] = useState("success"); // success or error
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

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

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Company name validation
    if (!company) {
      errors.company = "Company name is required.";
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.\w{2,3}$/;
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }

    // Niche selection validation
    if (!niche) {
      errors.niche = "Please select a niche.";
    }

    // Social media validation (example only)
    if (socialMedia.length === 0) {
      errors.socialMedia = "At least one social media link is required.";
    }

    // Marketing focus selection validation
    if (!marketingFocus) {
      errors.marketingFocus = "Please select a marketing focus.";
    }

    // Contact number validation (basic example)
    if (!contact) {
      errors.contact = "Contact number is required.";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const companyObj = {
      nameCompany: company,
      cnpjCpf: cnpj.replace(/\D/g, ""),
      email: email,
      idNiche: Number(niche),
      socialMedias: socialMedia,
      idTargetAudience: Number(marketingFocus),
      cel: contact.replace(/\D/g, ""),
      password,
      date: new Date().toISOString().slice(0, 10),
    };

    const formData = new FormData();
    formData.append(
      "company",
      new Blob([JSON.stringify(companyObj)], { type: "application/json" })
    );
    formData.append("file", photo);

    try {
      const response = await postCompany(formData);
      console.log(response);

      setModalStatus("success");
      setModalMessage("Cadastro realizado com sucesso.");
      setModalShow(true);

      // Navegar após um curto período
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error('Erro ao postar empresa:', err);

      // Verificar se o erro é uma instância de Error
      const error = err as Error;

      if ((error as any).response?.status === 409) {
        setModalStatus("error");
        setModalMessage("Cadastro falhou: CNPJ já cadastrado.");
      } else {
        setModalStatus("error");
        setModalMessage("Erro ao cadastrar a empresa. Tente novamente.");
      }
      setModalShow(true);
    }
  };

  return (
    <Container>
      <h1 style={styles}>Registre aqui sua empresa</h1>
      <FormCompany
        company={company}
        setCompany={setCompany}
        cnpj={cnpj}
        setCnpj={setCnpj}
        email={email}
        setEmail={setEmail}
        niches={niches}
        setNiche={setNiche}
        socialMedia={socialMedia}
        setSocialMedia={setSocialMedia}
        listMarketingFocus={listMarketingFocus}
        setMarketingFocus={setMarketingFocus}
        contact={contact}
        setContact={setContact}
        photo={photo}
        setPhoto={setPhoto}
        photoUrl={photoUrl}
        setPhotoUrl={setPhotoUrl}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleSubmit={handleSubmit}
        validationErrors={validationErrors}
      />
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalStatus === "success" ? "Sucesso" : "Erro"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
