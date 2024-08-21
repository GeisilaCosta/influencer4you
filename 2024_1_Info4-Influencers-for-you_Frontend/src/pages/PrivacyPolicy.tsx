import { Container } from "react-bootstrap";
import "../css/PrivacyPolity.css";

const PrivacyPolicy = () => {
  return (
    <Container className="mt-4 md-3 privacy-policy-container">
      <h1>Política de Privacidade</h1>
      <p>
        Bem-vindo ao Influencer4you. Esta Política de Privacidade explica como coletamos,
        usamos, divulgamos e protegemos suas informações pessoais quando você utiliza
        nosso site e serviços. Ao acessar ou utilizar nossos serviços, você concorda com
        as práticas descritas nesta política.
      </p>

      <h2>1. Informações que Coletamos</h2>
      <p>
        Coletamos diferentes tipos de informações para fornecer e melhorar nossos
        serviços, incluindo:
      </p>
      <ul>
        <li>
          <strong>Informações Pessoais:</strong> Nome, e-mail, número de telefone,
          endereço e outras informações semelhantes.
        </li>
        <li>
          <strong>Informações de Uso:</strong> Dados sobre como você utiliza nosso site,
          incluindo páginas visitadas, tempo gasto em páginas específicas, links clicados,
          etc.
        </li>
        <li>
          <strong>Informações de Dispositivo:</strong> Informações sobre o dispositivo que
          você usa para acessar nosso site, incluindo tipo de dispositivo, sistema
          operacional, navegador e endereço IP.
        </li>
        <li>
          <strong>Cookies e Tecnologias Semelhantes:</strong> Utilizamos cookies para
          coletar informações e melhorar sua experiência no site.
        </li>
      </ul>

      <h2>2. Uso das Informações</h2>
      <p>Usamos as informações coletadas para os seguintes fins:</p>
      <ul>
        <li>Fornecer, manter e melhorar nossos serviços;</li>
        <li>Personalizar a experiência do usuário;</li>
        <li>Enviar atualizações e informações relevantes;</li>
        <li>Responder a solicitações e suporte ao cliente;</li>
        <li>Realizar pesquisas e análises para aprimorar nossos serviços.</li>
      </ul>

      <h2>3. Compartilhamento de Informações</h2>
      <p>
        Não compartilhamos suas informações pessoais com terceiros, exceto nas seguintes
        circunstâncias:
      </p>
      <ul>
        <li>Para cumprir com a legislação aplicável;</li>
        <li>Para proteger nossos direitos e segurança;</li>
        <li>Com seu consentimento.</li>
      </ul>

      <h2>4. Segurança</h2>
      <p>
        Implementamos medidas de segurança para proteger suas informações pessoais. No
        entanto, nenhuma medida de segurança é infalível e não podemos garantir a
        segurança absoluta das suas informações.
      </p>

      <h2>5. Seus Direitos</h2>
      <p>
        Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Se
        desejar exercer esses direitos, entre em contato conosco usando as informações
        abaixo.
      </p>

      <h2>6. Alterações a esta Política</h2>
      <p>
        Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer
        alterações serão publicadas nesta página e, se necessário, informaremos você por
        e-mail.
      </p>

      <h2>7. Contato</h2>
      <address>
        Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco
        em:
        <br />
        <strong>Email:</strong> contato@influencer4you.com
      </address>
    </Container>
  );
};

export default PrivacyPolicy;
