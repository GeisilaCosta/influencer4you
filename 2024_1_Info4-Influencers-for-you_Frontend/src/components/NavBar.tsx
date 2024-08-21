import React from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const NavBar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav
      className={`navbar ${darkMode ? "navbar-dark" : "navbar-light"} navbar-transparent`}
    >
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" tabIndex={0} aria-label="link para a pagina home">
            <img
              src="public/logo2.jpg"
              width="200"
              height="200"
              className="rounded-logo"
              alt="Logo"
              tabIndex={0}
              aria-label="logo do site influencers for you"
            />
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/" tabIndex={0} aria-label="link para a pagina home">
            Home
          </Link>
          <Link
            to="/sign-up-company"
            tabIndex={0}
            aria-label="link para cadastrar empresas"
          >
            Cadastro de Empresas
          </Link>
          <Link
            to="/sign-up-influencer"
            tabIndex={0}
            aria-label="link para cadastro de influencers"
          >
            Cadastro de Influenciadores
          </Link>
          <Link to="/login" tabIndex={0} aria-label="link para a pagina de login">
            Login
          </Link>
        </div>
        <button
          onClick={toggleDarkMode}
          className="btn btn-link"
          tabIndex={0}
          aria-label="botão para alterar os modos claro e escuro da pagina"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
