import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getNiches } from "../api/campaign";
import { Niche } from "../types";

type Props = {
  handleSearch: (campaignName: string) => void;
  setNiche: (niche: string) => void;
  isDarkMode: boolean;
};

const SearchCampaign: React.FC<Props> = ({ handleSearch, setNiche, isDarkMode }) => {
  const [campaignName, setCampaignName] = useState("");
  const [niches, setNiches] = useState<Niche[]>([]);
  const [selectedNiche, setSelectedNiche] = useState<string>("");

  useEffect(() => {
    const fetchNiches = async () => {
      try {
        const fetchedNiches = await getNiches();
        setNiches(fetchedNiches);
      } catch (error) {
        console.error("Erro ao buscar nichos:", error);
      }
    };
    fetchNiches();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(campaignName);
    setNiche(selectedNiche);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <Form.Group className="form-group">
        <Form.Label>Nome da Campanha:</Form.Label>
        <Form.Control
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          type="text"
          placeholder="Digite o nome da campanha..."
          aria-label="nome da campanha"
        />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label>Nicho:</Form.Label>
        <Form.Select
          value={selectedNiche}
          onChange={(e) => setSelectedNiche(e.target.value)}
        >
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

      <Button
        className={`submit-button ${isDarkMode ? "dark-mode" : ""}`}
        type="submit"
        aria-label="botao de pesquisar"
      >
        Pesquisar
      </Button>
    </Form>
  );
};

export default SearchCampaign;
