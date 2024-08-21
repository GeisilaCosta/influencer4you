import React from "react";
const ErrorPage: React.FC = () => {
  const styles: { [key: string]: React.CSSProperties } = {
    conteiner: {
      textAlign: "center",
      marginTop: "50px",
      margin: 160,
    },
  };

  return (
    <div style={styles.conteiner}>
      <h1>Erro 404</h1>
      <p>A página que você está tentando acessar não existe.</p>
    </div>
  );
};

export default ErrorPage;
