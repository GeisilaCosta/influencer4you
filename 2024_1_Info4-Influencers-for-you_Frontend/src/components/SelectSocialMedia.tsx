import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { SocialMedia } from "../types";

const styles = {
  width: "120px",
} as React.CSSProperties;

type Props = {
  socialMediaName: string;
  socialMediaLink: string;
  setSocialMedia: (instagram: string) => void;
  addSocialMedia: (socialMedia: SocialMedia) => void;
  children: React.ReactNode;
};

export default function SelectSocialMedia({
  socialMediaName,
  socialMediaLink,
  setSocialMedia,
  addSocialMedia,
  children,
}: Props) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text style={styles}>{children}</InputGroup.Text>
      <Form.Control onChange={({ target }) => setSocialMedia(target.value)} />
      <Button
        onClick={() => {
          addSocialMedia({ socialMediaName: socialMediaName, link: socialMediaLink });
          return setSocialMedia("");
        }}
        disabled={!socialMediaName || !socialMediaLink}
        variant="success"
      >
        Adicionar
      </Button>
    </InputGroup>
  );
}
