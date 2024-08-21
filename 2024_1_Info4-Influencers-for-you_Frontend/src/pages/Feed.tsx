import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import { findAllPosts } from "../api/post";
import RecentPostCard from "../components/RecentPostCard";

const mockInfluencers = [
  {
    id: 1,
    name: "Gabriel da Costa",
    description: "Atleta, gosta de jogar futebol e vôlei ",
    image: "/inflh1.jpg",
  },
  {
    id: 2,
    name: "Daniel Pereira",
    description: "Engenheiro de software, ama tecnologia e afins",
    image: "/inflh2.jpg",
  },
  {
    id: 3,
    name: "Isabella Reiz",
    description: "Maquiadora das estrelas",
    image: "/inflm1.jpg",
  },
  {
    id: 4,
    name: "Alice Silva",
    description: "Administradora, a mulher dos melhores negócios",
    image: "/inflm2.jpg",
  },
];

const mockCampaigns = [
  {
    id: 1,
    name: "Vencer",
    company: "Nike",
    description:
      "“No esporte, cada desafio é uma oportunidade para superação e cada derrota é um passo em direção à vitória.",
    image: "/esportes.jpg",
  },
  {
    id: 2,
    name: "Futuro",
    company: "Ifood",
    description:
      "A tecnologia é a linguagem universal que conecta o mundo e nos permite sonhar além das fronteiras.",
    image: "/futuro.jpeg",
  },
  {
    id: 3,
    name: "Mulher",
    company: "Marisa",
    description:
      "Com determinação, inteligência e paixão, ela transforma desafios em oportunidades e lidera com excelência.",
    image: "/negocios.jpg",
  },
  {
    id: 4,
    name: "Linda",
    company: "Avon",
    description:
      "A maquiagem é a arte de realçar a beleza, transformando o comum em extraordinário.",
    image: "/maquiagem.jpeg",
  },
];

const mockCompanies = [
  {
    id: 1,
    name: "Nike",
    description: "A marca nº 1 em produtos esportivos",
    image: "/nike.png",
  },
  { id: 2, name: "Ifood", description: "Pediu, Chegou", image: "/ifood.png" },
  {
    id: 3,
    name: "Marisa",
    description: "De mulher para mulher",
    image: "/marisa.png",
  },
  {
    id: 4,
    name: "Avon",
    description: "A sua melhor marca",
    image: "/avon.png",
  },
];

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [buttonHovered, setButtonHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await findAllPosts();
        const data = response.content;
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log("Posts state:", posts);
  }, [posts]);

  const handleButtonClick = () => {
    setButtonHovered(!buttonHovered);
    navigate("/post");
  };

  const submitButtonStyle = {
    width: "100%",
    backgroundColor: buttonHovered ? "#B6B3E5" : "#6f42c1",
    borderColor: "#B6B3E5",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px",
    transition: "background-color 0.3s ease",
  };

  const engagementData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
    datasets: [
      {
        label: "Engajamento",
        data: [65, 59, 80, 81, 56, 55, 40],
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

  const buttonStyle = {
    backgroundColor: "#00000071",
    color: "#f1e9e9",
    fontSize: "1.5rem",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    margin: "20px 0",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const handleProfileRedirect = () => {
    const userType = localStorage.getItem("userType");
    if (userType === "ROLE_INFLUENCER") {
      navigate("/influencer");
    } else if (userType === "ROLE_ADMINISTRADOR") {
      navigate("/admmaster");
    } else if (userType === "ROLE_EMPRESA") {
      navigate("/feed-company");
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Button onClick={handleProfileRedirect} variant="primary" style={buttonStyle}>
              Ir para o Perfil
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div style={{ position: "relative", textAlign: "center" }}>
            <img
              src="/influencers.jpeg"
              alt="Influencers"
              style={{ width: "100%", height: "auto" }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "20px",
                borderRadius: "5px",
                color: "#fff",
                textAlign: "center",
                width: "80%",
              }}
            >
              <h1>Influencers4You</h1>
              <h2 style={{ fontSize: "20px" }}>
                Conectando as melhores marcas com os principais influenciadores para
                impulsionar campanhas bem-sucedidas.
              </h2>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <h3 className="text-center mb-3">Post mais Recentes</h3>
          <Row>
            {posts.length > 0 ? (
              posts.map((post, index) => <RecentPostCard key={index} post={post} />)
            ) : (
              <Col md={12}>
                <p className="text-center">Nenhum post disponível.</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <Button
            type="button"
            variant="primary"
            style={submitButtonStyle}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            onClick={handleButtonClick}
          >
            Crie uma nova postagem
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <h3 className="text-center mb-3">Principais Influenciadores</h3>
          <Carousel>
            {mockInfluencers.map((influencer) => (
              <Carousel.Item key={influencer.id}>
                <img
                  src={influencer.image}
                  alt={influencer.name}
                  className="d-block w-100"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <h5>{influencer.name}</h5>
                  <p>{influencer.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={4}>
          <h3 className="text-center mb-3">Principais Empresas</h3>
          <Carousel>
            {mockCompanies.map((company) => (
              <Carousel.Item key={company.id}>
                <img
                  src={company.image}
                  alt={company.name}
                  className="d-block w-100"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <h5>{company.name}</h5>
                  <p>{company.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={4}>
          <h3 className="text-center mb-3">Campanhas Recentes</h3>
          <Carousel>
            {mockCampaigns.map((campaign) => (
              <Carousel.Item key={campaign.id}>
                <img
                  src={campaign.image}
                  alt={campaign.name}
                  className="d-block w-100"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <h5>{campaign.name}</h5>
                  <p>{campaign.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <h3 className="text-center mb-3">Estatísticas de Engajamento</h3>
          <Line data={engagementData} />
        </Col>
        <Col md={6}>
          <h3 className="text-center mb-3">Estatísticas de Negócios</h3>
          <Bar data={businessData} />
        </Col>
      </Row>
    </Container>
  );
};

export default Feed;
