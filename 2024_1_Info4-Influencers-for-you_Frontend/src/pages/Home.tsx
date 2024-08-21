import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Carousel, Container, Row, Col, Card, Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";

import image1 from "../assets/image6.png";
import image2 from "../assets/image7.jpg";
import image3 from "../assets/image9.jpg";
import image4 from "../assets/image4.png";
import image8 from "../assets/image8.png";

import marisa from "../assets/marisa.png";
import nike from "../assets/nike.png";
import shopee from "../assets/shopee.png";
import mercadolivre from "../assets/mercadolivre.png";
import uber from "../assets/uber.png";
import ifood from "../assets/ifood.png";

const Home = () => {
  const { darkMode } = useTheme();

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      color: darkMode ? "#FFF" : "#000",
      backgroundColor: darkMode ? "#333" : "#FFF",
      fontFamily: "Montserrat, sans-serif",
      padding: "20px",
    },
    header: {
      color: darkMode ? '#FFF' : '#000',
      textAlign: 'center' as 'center',
      marginBottom: '20px',
    },
    highlightText: {
      textAlign: 'center' as 'center',
      marginTop: '40px',
      marginBottom: '40px',
    },
    button: {
      marginBottom: "20px",
    },
    carouselItem: {
      height: '500px',
      alignItems: 'center' as 'center',
    },
    carouselImage: {
      objectFit: 'cover' as 'cover',
      width: '100%',
      height: '100%',
      maxHeight: '500px',
    },
    brandCarousel: {
      marginTop: "40px",
      marginBottom: "40px",
    },
    brandImage: {
      width: '190px',
      height: '100px',
      objectFit: 'contain' as 'contain',
      display: 'block',
      margin: '0 auto',
    },
    influencerSection: {
      textAlign: 'center' as 'center',
      padding: '40px 0',
      marginTop: '40px',
      marginBottom: '40px',
    },
    influencerImage: {
      width: "80%",
      height: "auto",
      maxWidth: "80%",
      display: "block",
      margin: "0 auto",
    },
    inviteSection: {
      textAlign: 'center' as 'center',
      padding: '40px 0',
      marginTop: '40px',
      marginBottom: '40px',
    },
    inviteButton: {
      backgroundColor: darkMode ? '#444' : '#836dab',
      borderColor: darkMode ? '#444' : '#836dab',
      color: '#FFF',
      marginBottom: '10px',
      fontWeight: 'bold' as 'bold',
    },
    highlightImage: {
      display: "block",
      margin: "20px auto",
      maxWidth: "100%",
      height: "300px",
    },
    footer: {
      textAlign: 'center' as 'center',
      marginTop: '40px',
    },
    cardTitle: {
      color: darkMode ? "#FFF" : "#000",
    },
    modalTitle: {
      marginBottom: "20px",
    },
    carouselTitle: {
      textAlign: 'center' as 'center',
      fontSize: '28px',
      fontWeight: 'bold' as 'bold',
      color: darkMode ? '#FFF' : '#000',
      marginBottom: '20px',
    },
    carouselCaption: {
      textAlign: 'center' as 'center',
      color: '#FFFF',
      fontWeight: 'bold' as 'bold',
      fontSize: '24px',
    },
    dualSection: {
      marginTop: "40px",
      marginBottom: "40px",
    },
    dualImage: {
      width: "100%",
      height: "auto",
    },
    dualText: {
      textAlign: 'center' as 'center',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column' as 'column',
      justifyContent: 'center' as 'center',
      minHeight: '200px',
    },
    cardBody: {
      backgroundColor: darkMode ? '#444' : '#FFFF',
      color: '#444',
      padding: '20px',
    },
    cardTexto: {
      color: '#444',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header} tabIndex={0} aria-label="Título principal">
        <h1>Contratação de influenciadores de forma simples e eficaz!</h1>
      </header>

      <section
        style={styles.highlightText}
        tabIndex={0}
        aria-label="Descrição sobre a página"
      >
        <p>
          Na Influencers4you, oferecemos um gerenciamento simplificado para
          influenciadores e empresas, tudo em um só lugar. Conectamos marcas aos
          influenciadores ideais para suas campanhas, tornando o processo ágil e
          eficiente. Seja qual for o seu objetivo, somos o ponto de encontro perfeito para
          garantir o sucesso da sua próxima campanha publicitária.
        </p>
      </section>

      <Carousel interval={3000} aria-label="Carrossel de imagens de influenciadores">
        <Carousel.Item style={styles.carouselItem}>
          <img
            className="d-block w-100"
            src={image1}
            alt="Primeiro slide"
            style={styles.carouselImage}
          />
          <Carousel.Caption style={styles.carouselCaption}>
            <p>Cadastre-se</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={styles.carouselItem}>
          <img
            className="d-block w-100"
            src={image2}
            alt="Segundo slide"
            style={styles.carouselImage}
          />
          <Carousel.Caption style={styles.carouselCaption}>
            <p>Faça Login</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={styles.carouselItem}>
          <img
            className="d-block w-100"
            src={image3}
            alt="Terceiro slide"
            style={styles.carouselImage}
          />
          <Carousel.Caption style={styles.carouselCaption}>
            <p>Encontre a campanha perfeita</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Título acima do segundo carrossel */}
      <div
        style={styles.carouselTitle}
        tabIndex={0}
        aria-label="Título do carrossel de marcas"
      >
        Marcas que estão mudando sua forma de gerenciar campanhas
      </div>

      {/* Parte 2: Carrossel com marcas */}
      <Carousel style={styles.brandCarousel} indicators={false} controls={false}>
        <Carousel.Item>
          <Container>
            <Row>
              <Col>
                <img
                  className="d-block"
                  src={marisa}
                  alt="Marca Marisa"
                  style={styles.brandImage}
                />
              </Col>
              <Col>
                <img
                  className="d-block"
                  src={nike}
                  alt="Marca Nike"
                  style={styles.brandImage}
                />
              </Col>
              <Col>
                <img
                  className="d-block"
                  src={shopee}
                  alt="Marca Shopee"
                  style={styles.brandImage}
                />
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container>
            <Row>
              <Col>
                <img
                  className="d-block"
                  src={mercadolivre}
                  alt="Marca Mercado Livre"
                  style={styles.brandImage}
                />
              </Col>
              <Col>
                <img
                  className="d-block"
                  src={uber}
                  alt="Marca Uber"
                  style={styles.brandImage}
                />
              </Col>
              <Col>
                <img
                  className="d-block"
                  src={ifood}
                  alt="Marca iFood"
                  style={styles.brandImage}
                />
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      </Carousel>

      {/* Seção Influencer */}
      <section
        style={styles.influencerSection}
        tabIndex={0}
        aria-label="Seção de destaque para influenciadores"
      >
        <h2>A próxima campanha está a um click!</h2>
        <img src={image4} alt="Influenciador destacado" style={styles.influencerImage} />
      </section>

      {/* Parte 3: Convite para empresas e influenciadores */}
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Card style={{ ...styles.cardBody, marginBottom: "20px" }}>
              <Card.Body>
                <Card.Title style={styles.cardTitle}>
                  Cadastre sua empresa/marca
                </Card.Title>
                <Card.Text>
                  Junte-se a nós para gerenciar suas campanhas de publicidade com
                  eficiência.
                </Card.Text>
                <Link to="/sign-up-company">
                  <Button
                    variant="light"
                    style={{
                      ...styles.inviteButton,
                      backgroundColor: "#FFF",
                      color: "#C071B9",
                    }}
                  >
                    Cadastrar Empresa
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Card style={{ ...styles.cardBody, marginBottom: "20px" }}>
              <Card.Body>
                <Card.Title style={styles.cardTitle}>
                  Cadastre-se como Influenciador
                </Card.Title>
                <Card.Text>
                  Junte-se a nós para fazer parte das campanhas publicitárias de grandes
                  marcas.
                </Card.Text>
                <Link to="/sign-up-influencer">
                  <Button
                    variant="light"
                    style={{
                      ...styles.inviteButton,
                      backgroundColor: "#FFF",
                      color: "#C071B9",
                    }}
                  >
                    Cadastrar Influenciador
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Última seção */}
      <Container style={styles.dualSection}>
        <Row>
          {/* Lado Esquerdo: Imagem */}
          <Col xs={12} md={6}>
            <img src={image8} alt="Imagem" style={styles.dualImage} />
          </Col>
          {/* Lado Direito: Texto e Botão */}
          <Col xs={12} md={6} style={styles.dualText}>
            <h2>Faça login</h2>
            <p>
              Faça login para acessar sua conta e gerenciar suas campanhas com facilidade.
            </p>
            <Link to="/login">
              <Button
                variant="light"
                style={{
                  ...styles.inviteButton,
                  backgroundColor: "#FFF",
                  color: "#C071B9",
                }}
              >
                Fazer Login
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
