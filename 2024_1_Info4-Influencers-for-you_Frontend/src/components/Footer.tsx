import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "../App.css";

const Footer: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <footer className={`footer ${darkMode ? "footer-dark" : "footer-light"}`}>
      <div className="footer-logo">
        <img src="/info4.png" alt="Logo da Info4" tabIndex={0} />
      </div>
      <div className="footer-social">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          aria-label="link para o facebook"
        >
          <FaFacebook />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          aria-label="link para o twitter"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          aria-label="link para o instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          aria-label="link para o linkedin"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://youtube"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          aria-label="link para o youtube"
        >
          <FaYoutube />
        </a>
      </div>
      <div className="footer-legal">
        <a
          href="/terms"
          className="footer-link"
          tabIndex={0}
          aria-label="link para os termos de serviços"
        >
          Termos de Serviço
        </a>
        <a
          href="/privacy"
          className="footer-link"
          tabIndex={0}
          aria-label="link para a politica de privacidade"
        >
          Política de Privacidade
        </a>
      </div>
      <div className="footer-copyright">
        <p tabIndex={0}>&copy; 2024 Empresa. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
