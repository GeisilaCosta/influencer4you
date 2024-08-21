import { Container } from "react-bootstrap";
import "../css/TermsOfService.css";

const TermsOfService = () => {
  return (
    <Container className="terms-of-service-container mt-4 md-3">
      <div className="custom-card-container">
        <h1>Termos de Serviço</h1>
        <p>
          Bem-vindo ao Influencer4you. Estes Termos de Serviço ("Termos") regem o uso do
          nosso site e serviços. Ao acessar ou utilizar nosso site e serviços, você
          concorda com estes Termos.
        </p>

        <h2>1. Uso do Site</h2>
        <p>
          Ao utilizar nosso site, você concorda em cumprir com estes Termos e todas as
          leis e regulamentos aplicáveis.
        </p>

        <h2>2. Contas de Usuário</h2>
        <p>
          Para acessar certas partes do nosso site, pode ser necessário criar uma conta.
          Você é responsável por manter a confidencialidade de sua conta e senha.
        </p>

        <h2>3. Conteúdo do Usuário</h2>
        <p>
          Você é responsável por qualquer conteúdo que você postar no nosso site. Ao
          publicar conteúdo, você concede-nos uma licença mundial, não exclusiva,
          transferível, sublicenciável e livre de royalties para usar, reproduzir,
          modificar, adaptar, publicar, distribuir e exibir esse conteúdo.
        </p>

        <h2>4. Limitação de Responsabilidade</h2>
        <p>
          Em nenhuma circunstância seremos responsáveis por quaisquer danos diretos,
          indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, mas
          não se limitando a, perda de lucros, receita, dados ou uso, incorridos por você
          ou qualquer terceiro, decorrentes de seu uso ou acesso ao nosso site.
        </p>

        <h2>5. Alterações nos Termos</h2>
        <p>
          Podemos revisar estes Termos periodicamente. A data da "última atualização" no
          topo destes Termos será atualizada quando fizermos alterações. Recomendamos que
          você revise estes Termos regularmente.
        </p>

        <h2>6. Lei Aplicável</h2>
        <p>Estes Termos são regidos e interpretados de acordo com as leis do Brasil.</p>

        <h2>7. Contato</h2>
        <p>
          Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco através
          das informações fornecidas abaixo.
        </p>

        <p>
          <strong>Última atualização:</strong> 18/07/2024
        </p>
      </div>
    </Container>
  );
};

export default TermsOfService;
