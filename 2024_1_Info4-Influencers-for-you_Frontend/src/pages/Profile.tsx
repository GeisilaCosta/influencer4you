import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Profile: React.FC = () => {
  // Estrutura de dados para o perfil do usuário
  const userProfile = {
    name: "Nome do Usuário",
    email: "usuario@exemplo.com",
    age: 25,
    bio: "Breve biografia do usuário...",
    socialMedia: {
      twitter: "@usuario",
      instagram: "@usuario_insta",
    },
    profilePicture: "https://via.placeholder.com/150", // URL da imagem do perfil
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card>
            <Card.Header className="text-center">
              <img
                src={userProfile.profilePicture}
                alt="Foto do perfil"
                className="rounded-circle"
                width="150"
                height="150"
              />
              <h2>{userProfile.name}</h2>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h4>Email:</h4>
                  <p>{userProfile.email}</p>
                </Col>
                <Col md={6}>
                  <h4>Idade:</h4>
                  <p>{userProfile.age}</p>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <h4>Biografia:</h4>
                  <p>{userProfile.bio}</p>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={6}>
                  <h4>Twitter:</h4>
                  <p>{userProfile.socialMedia.twitter}</p>
                </Col>
                <Col md={6}>
                  <h4>Instagram:</h4>
                  <p>{userProfile.socialMedia.instagram}</p>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="primary">Editar Perfil</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
