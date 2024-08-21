import React, { useState } from "react";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/image10-removebg.png";
import { postLogin } from "../api/login";
import { findAllInfluencersPag } from "../api/influencer";
import { useTheme } from "../context/ThemeContext";
import { jwtDecode } from "jwt-decode";
import { Company, Influencer } from "../types";
import { findAllCompanyPag } from "../api/company";
import StatusModal from "../components/StatusModal";

const Login = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalStatus, setModalStatus] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 10vw",
      fontFamily: "Montserrat, sans-serif",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: darkMode ? "#FFF" : "#000",
    },
    card: {
      padding: "20px",
      backgroundColor: darkMode ? "#3e3e3e" : "#BBC1DC",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    title: {
      color: darkMode ? "#FFF" : "#C071B9",
      textAlign: "center",
      marginBottom: "20px",
      fontWeight: "bold",
      fontSize: "24px",
    },
    label: {
      color: darkMode ? "#FFF" : "#000",
    },
    button: {
      backgroundColor: "#C071B9",
      color: "#FFF",
      fontWeight: "bold",
      width: "100%",
    },
    spinner: {
      marginLeft: "5px",
    },
    feedback: {
      color: "#D32F2F",
    },
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const loginData = { username: email, password };
      const response = await postLogin(loginData);

      if (response && response.token) {
        localStorage.setItem("token", response.token);
        const token = response.token;

        const decodedToken = jwtDecode<{ role: string; sub: string }>(token);
        const role = decodedToken.role;
        const emailSub = decodedToken.sub;

        const fetchByEmail = async (email: string) => {
          try {
            if (role === "ROLE_INFLUENCER") {
              const influencers = await findAllInfluencersPag();
              const influencer = influencers.find(
                (influencer: Influencer) => influencer.email === email
              );

              if (influencer && influencer.statusAvaliation === "APPROVED") {
                navigate("/feed");
              } else {
                setModalStatus("error");
                setModalMessage("Seu cadastro ainda não foi aprovado.");
                setModalShow(true);
              }
            } else if (role === "ROLE_EMPRESA") {
              const companies = await findAllCompanyPag();
              const company = companies.find(
                (company: Company) => company.email === email
              );

              if (company && company.statusAvaliation === "APPROVED") {
                navigate("/feed");
              } else {
                setModalStatus("error");
                setModalMessage("Seu cadastro ainda não foi aprovado.");
                setModalShow(true);
              }
            } else if (role === "ROLE_ADMINISTRADOR") {
              navigate("/feed");
            }
          } catch (error) {
            console.error("Failed to fetch by email:", error);
            setModalStatus("error");
            setModalMessage("Erro ao buscar dados do usuário.");
            setModalShow(true);
          }
        };

        await fetchByEmail(emailSub);
        localStorage.setItem("userType", role);
      } else {
        setEmailError("Credenciais inválidas");
        setPasswordError("Credenciais inválidas");
        setModalStatus("error");
        setModalMessage("Erro ao logar.");
        setModalShow(true);
      }
    } catch (error) {
      console.error("Login failed", error);
      setEmailError("Erro ao realizar login");
      setPasswordError("Erro ao realizar login");
      setModalStatus("error");
      setModalMessage("Erro ao logar.");
      setModalShow(true);
    }

    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Card.Body>
          <div style={styles.cardContent}>
            <h6 style={styles.title} tabIndex={0} aria-label="Login">
              Login
            </h6>
            <Form.Group controlId="formEmail">
              <Form.Label style={styles.label}>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                isInvalid={!!emailError}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                tabIndex={0}
                aria-label="Campo de Email"
              />

              <Form.Control.Feedback type="invalid" style={styles.feedback}>
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label style={styles.label}>Senha</Form.Label>
              <Form.Control
                type="password"
                value={password}
                isInvalid={!!passwordError}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                tabIndex={0}
                aria-label="Campo de Senha"
              />

              <Form.Control.Feedback type="invalid" style={styles.feedback}>
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </Card.Body>
        <Card.Footer>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              style={styles.button}
              tabIndex={0}
              aria-label="Botão Entrar"
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span style={styles.spinner}>Carregando...</span>
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </div>
        </Card.Footer>
        <StatusModal
          show={modalShow}
          handleClose={() => setModalShow(false)}
          status={modalStatus}
          message={modalMessage}
        />
      </Card>
    </div>
  );
};

export default Login;
