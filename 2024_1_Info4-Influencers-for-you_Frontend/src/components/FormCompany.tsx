import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import { IMaskInput } from "react-imask";
import { MarketingFocus, Niche, SocialMedia } from "../types";
import { useState, useEffect } from "react";
import SelectSocialMedia from "./SelectSocialMedia";

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
  company: string;
  setCompany: (company: string) => void;
  cnpj: string;
  setCnpj: (cnpj: string) => void;
  email: string;
  setEmail: (email: string) => void;
  niches: Niche[];
  setNiche: (niche: string) => void;
  socialMedia: SocialMedia[];
  setSocialMedia: (social: SocialMedia[]) => void;
  listMarketingFocus: MarketingFocus[];
  setMarketingFocus: (marketingFocus: string) => void;
  contact: string;
  setContact: (companyContact: string) => void;
  photo: File;
  setPhoto: (photo: File) => void;
  photoUrl: string;
  setPhotoUrl: (photoUrl: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  validationErrors: Record<string, string>;
};

export default function FormCompany({
  company,
  setCompany,
  cnpj,
  setCnpj,
  email,
  setEmail,
  niches,
  setNiche,
  socialMedia,
  setSocialMedia,
  listMarketingFocus,
  setMarketingFocus,
  contact,
  setContact,
  photo,
  setPhoto,
  photoUrl,
  setPhotoUrl,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleSubmit,
  validationErrors,
}: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [x, setX] = useState("");
  const [youtube, setYoutube] = useState("");
  const [kwai, setKwai] = useState("");
  const [koo, setKoo] = useState("");

  const socialMediaList = [
    { name: "INSTAGRAM", value: instagram, setValue: setInstagram },
    { name: "TIKTOK", value: tiktok, setValue: setTiktok },
    { name: "LINKEDIN", value: linkedin, setValue: setLinkedin },
    { name: "FACEBOOK", value: facebook, setValue: setFacebook },
    { name: "X", value: x, setValue: setX },
    { name: "YOUTUBE", value: youtube, setValue: setYoutube },
    { name: "KWAI", value: kwai, setValue: setKwai },
    { name: "KOO", value: koo, setValue: setKoo },
  ];

  useEffect(() => {
    const darkModeClass = document.body.classList.contains("dark-mode");
    setIsDarkMode(darkModeClass);
  }, []);

  const addSocialMedia = (social: SocialMedia) => {
    if (socialMedia.length === 0) return setSocialMedia([social]);
    const exists = socialMedia.find(
      (item) => item.socialMediaName === social.socialMediaName
    );
    if (exists) {
      const filtered = socialMedia.filter(
        (item) => item.socialMediaName !== social.socialMediaName
      );
      return setSocialMedia([...filtered, social]);
    }

    return setSocialMedia([...socialMedia, social]);
  };

  const removeSocialMedia = (social: SocialMedia) => {
    const filtered = socialMedia.filter(
      (item) => item.socialMediaName !== social.socialMediaName
    );
    setSocialMedia(filtered);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      {photo.name ? (
        <div style={photoDisplayStyles}>
          <Image src={photoUrl} fluid onClick={() => setPhoto(new File([], ""))} />
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
                setPhoto(file);
                setPhotoUrl(URL.createObjectURL(file));
              }
            }}
            type="file"
          />
        </div>
      )}
      <Form.Group className="form-group">
        <Form.Label>Noma da empresa:</Form.Label>
        <Form.Control
          required
          value={company}
          onChange={({ target }) => setCompany(target.value)}
          type="text"
          placeholder="Digite o nome da empresa..."
          aria-label="nome da empresa"
          isInvalid={!!validationErrors.company}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.company}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label>CNPJ:</Form.Label>
        <Form.Control
          required
          value={cnpj}
          onChange={({ target }) => setCnpj(target.value)}
          as={IMaskInput}
          mask="00.000.000/0000-00"
          type="text"
          placeholder="XX.XXX.XXX/XXXX-XX"
          aria-label="campo para o cnpj"
          isInvalid={!!validationErrors.cnpj}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.cnpj}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label>E-mail:</Form.Label>
        <Form.Control
          required
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          placeholder="email@email.com"
          aria-label="campo para o email"
          isInvalid={!!validationErrors.email}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label>Nicho:</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={({ target }) => setNiche(target.value)}
          isInvalid={!!validationErrors.niche}
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
        <Form.Control.Feedback type="invalid">
          {validationErrors.niche}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label>Redes sociais:</Form.Label>
        {socialMediaList.map((item) => (
          <SelectSocialMedia
            key={item.name}
            addSocialMedia={addSocialMedia}
            setSocialMedia={item.setValue}
            socialMediaLink={item.value}
            socialMediaName={item.name}
          >
            {item.name}
          </SelectSocialMedia>
        ))}
        <Form.Control.Feedback type="invalid">
          {validationErrors.socialMedia}
        </Form.Control.Feedback>
        {socialMedia.length > 0 && (
          <>
            <Form.Text className="text-muted">
              {"Redes sociais adicionadas: (Clique para excluir)"}
            </Form.Text>
            <ListGroup>
              {socialMedia.map((item) => (
                <ListGroup.Item
                  onClick={() => removeSocialMedia(item)}
                  action
                  key={item.socialMediaName}
                >
                  {item.socialMediaName}: {item.link}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label>Foco do Marketing:</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={({ target }) => setMarketingFocus(target.value)}
          isInvalid={!!validationErrors.marketingFocus}
        >
          <option disabled value="" aria-label="campo para o Foco do marketing">
            Selecione o foco do marketing...
          </option>
          {listMarketingFocus.map((focus) => (
            <option key={focus.id} value={focus.id}>
              {focus.name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {validationErrors.marketingFocus}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-group" aria-label="campo para o contato da empresa">
        <Form.Label>Telefone:</Form.Label>
        <Form.Control
          required
          as={IMaskInput}
          mask="(00) 00000-0000"
          value={contact}
          onChange={({ target }) => setContact(target.value)}
          type="text"
          placeholder="Telefone da empresa"
          isInvalid={!!validationErrors.contact}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.contact}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-group" aria-label="campo para a senha">
        <Form.Label>Senha:</Form.Label>
        <Form.Control
          required
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="Senha"
          isInvalid={!!validationErrors.password}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-group" aria-label="campo para confirmar a senha">
        <Form.Label>Confirme a senha:</Form.Label>
        <Form.Control
          required
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          type="password"
          placeholder="Confirme a senha"
          isInvalid={!!validationErrors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.confirmPassword}
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
      >
        Voltar
      </Button>
    </Form>
  );
}
