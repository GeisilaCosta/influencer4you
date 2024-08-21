import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const HamburgerMenu = ({ userType }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [buttonColor, setButtonColor] = useState("#020202ae");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setButtonColor(isOpen ? "#02020288" : "#0afcfc4b");
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      const data: any = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            admin: [
              { name: "Gerenciar Usuários", path: "/manage-users" },
              { name: "Gerenciar Campanhas", path: "/manage-campaigns" },
              { name: "Visualizar Estatísticas", path: "/view-stats" },
              { name: "Editar Perfil", path: "/edit-profile" },
            ],
            influencer: [
              { name: "Pesquisar Campanhas", path: "pesquisar-campanhas" },
              { name: "Candidatar-se a Campanhas", path: "/apply-campaigns" },
              { name: "Gerenciar Campanhas Ativas", path: "/manage-active-campaigns" },
              { name: "Editar Perfil", path: "/edit-profile" },
            ],
            company: [
              { name: "Criar Campanha", path: "/campanha" },
              { name: "Gerenciar Campanhas", path: "/manage-campaigns" },
              { name: "Visualizar Estatísticas", path: "/dashboard" },
              { name: "Editar Perfil", path: "/edit-profile" },
              { name: "Contratar Influencers", path: "/hire-influencers" },
            ],
          });
        }, 500);
      });
      setMenuItems(data[userType]);
    };

    fetchMenuItems();
  }, [userType]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        className="btn"
        style={{
          backgroundColor: buttonColor,
          color: "#fff",
          fontSize: "1.5rem",
          cursor: "pointer",
          border: "none",
          borderRadius: "5px",
          padding: "10px",
        }}
        onClick={toggleMenu}
      >
        ☰
      </button>
      <div
        className={`menu-content ${isOpen ? "show" : ""}`}
        style={{
          position: "absolute",
          top: "56px",
          width: "400px",
          backgroundColor: "#0000006e",
          color: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ccc",
          borderRadius: "5px",
          display: isOpen ? "block" : "none",
          zIndex: 1000,
        }}
      >
        <ul className="list-unstyled p-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a className="nav-link" href={item.path}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
