import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { Niche } from "../types";

const photoDivStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "200%",
  height: "150px",
  border: "1px solid #ccc",
  cursor: "pointer",
  borderRadius: "10px",
} as React.CSSProperties;

const photoDisplayStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "200%",
  maxHeight: "200px",
  overflow: "hidden",
} as React.CSSProperties;

type Props = {
  campaignName: string;
  setCampaignName: (campaignName: string) => void;
  setNiche: (niche: string) => void;
  niches: Niche[];
  budget: string;
  setBudget: (budget: string) => void;
  salary: string;
  setSalary: (salary: string) => void;
  taskOrder: string;
  setTaskOrder: (taskOrder: string) => void;
  logo: File;
  setLogo: (logo: File) => void;
  logoUrl: string;
  setLogoUrl: (logoUrl: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isDarkMode: boolean;
};

const FormCampaign: React.FC<Props> = ({
  campaignName,
  setCampaignName,
  setNiche,
  niches,
  budget,
  setBudget,
  salary,
  setSalary,
  taskOrder,
  setTaskOrder,
  logo,
  setLogo,
  logoUrl,
  setLogoUrl,
  handleSubmit,
  isDarkMode,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/feed-company");
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      {logo.name ? (
        <div style={photoDisplayStyles}>
          <Image src={logoUrl} fluid onClick={() => setLogo(new File([], ""))} />
          <p>(Clique para remover)</p>
        </div>
      ) : (
        <div style={photoDivStyles}>
          <p>Adicione a foto da empresa</p>
          <Form.Control
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files?.[0];
              console.log(file);
              if (file) {
                setLogo(file);
                setLogoUrl(URL.createObjectURL(file));
              }
            }}
            type="file"
          />
        </div>
      )}
      <Form.Group className="form-group">
        <Form.Label>Nome da Campanha:</Form.Label>
        <Form.Control
          required
          value={campaignName}
          onChange={({ target }) => setCampaignName(target.value)}
          type="text"
          maxLength={50}
          placeholder="Digite o nome da campanha..."
          aria-label="nome da campanha"
        />
        <Form.Control.Feedback type="invalid">
          Nome da campanha é obrigatório!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label>Nicho:</Form.Label>
        <Form.Select defaultValue="" onChange={({ target }) => setNiche(target.value)}>
          <option disabled value="" aria-label="campo para o nicho">
            Selecione o nicho da empresa...
          </option>
          {niches.map((niche) => (
            <option key={niche.id} value={niche.id}>
              {niche.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label>Orçamento:</Form.Label>
        <Form.Control
          required
          value={budget}
          onChange={({ target }) => setBudget(target.value.replace(/\D/g, ""))}
          type="text"
          placeholder="Digite o orçamento da campanha..."
          aria-label="orçamento da campanha"
        />
        <Form.Control.Feedback type="invalid">
          Orçamento é obrigatório!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label>Salário:</Form.Label>
        <Form.Control
          required
          value={salary}
          onChange={({ target }) => setSalary(target.value.replace(/\D/g, ""))}
          type="text"
          placeholder="Digite o salário da campanha..."
          aria-label="salário da campanha"
        />
        <Form.Control.Feedback type="invalid">
          Salário é obrigatório!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label>Ordenação de Tarefas:</Form.Label>
        <Form.Control
          required
          value={taskOrder}
          onChange={({ target }) => setTaskOrder(target.value)}
          type="text"
          placeholder="Digite a ordenação de tarefas..."
          aria-label="ordenação de tarefas"
        />
        <Form.Control.Feedback type="invalid">
          Ordenação de tarefas é obrigatória!
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        className={`submit-button ${isDarkMode ? "dark-mode" : ""}`}
        type="submit"
        aria-label="botao de registrar"
      >
        Registrar
      </Button>
      <Button
        className={`submit-button ${isDarkMode ? "dark-mode" : ""}`}
        type="button"
        aria-label="botao de voltar"
        onClick={handleBack}
      >
        Voltar
      </Button>
    </Form>
  );
};

export default FormCampaign;
