import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import FormCampaign from "../components/FormCampaign";
import { getNiches, postCampaign } from "../api/campaign";
import { Niche } from "../types";
import { useNavigate } from "react-router-dom";

const NewCampaign: React.FC = () => {
  const [campaignName, setCampaignName] = useState("");
  const [niche, setNiche] = useState("");
  const [niches, setNiches] = useState<Niche[]>([]);
  const [budget, setBudget] = useState("");
  const [salary, setSalary] = useState("");
  const [taskOrder, setTaskOrder] = useState("");
  const [logo, setLogo] = useState<File>(new File([], ""));
  const [logoUrl, setLogoUrl] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNiches = async () => {
      try {
        const { content } = await getNiches();
        setNiches(content);
      } catch (error) {
        console.error("Erro ao buscar nichos:", error);
      }
    };

    fetchNiches();
  }, []);

  useEffect(() => {
    const darkModeClass = document.body.classList.contains("dark-mode");
    setIsDarkMode(darkModeClass);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!validateForm()) return;

    const campaignObj = {
      name: campaignName,
      budget: Number(budget),
      tasks: taskOrder,
      wage: Number(salary),
      niche: { id: Number(niche) },
    };

    const formData = new FormData();
    formData.append(
      "campaignDto",
      new Blob([JSON.stringify(campaignObj)], { type: "application/json" })
    );
    formData.append("file", logo);

    const response = await postCampaign(formData);
    console.log(response);
    navigate("/feed-company");
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Registre aqui sua campanha
      </h1>
      <FormCampaign
        campaignName={campaignName}
        setCampaignName={setCampaignName}
        setNiche={setNiche}
        niches={niches}
        budget={budget}
        setBudget={setBudget}
        salary={salary}
        setSalary={setSalary}
        taskOrder={taskOrder}
        setTaskOrder={setTaskOrder}
        logo={logo}
        setLogo={setLogo}
        logoUrl={logoUrl}
        setLogoUrl={setLogoUrl}
        handleSubmit={handleSubmit}
        isDarkMode={isDarkMode}
      />
    </Container>
  );
};

export default NewCampaign;
