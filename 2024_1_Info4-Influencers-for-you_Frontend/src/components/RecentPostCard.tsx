import { Col, Card, Image } from "react-bootstrap";

type Props = {
  post: {
    id: number;
    content: string;
    imageUrl?: string;
  };
};

const styles = {
  height: "150px",
  overflow: "hidden",
  padding: "10px",
} as React.CSSProperties;

export default function RecentPostCard({ post }: Props) {
  return (
    <Col md={3} className="mb-3">
      <Card style={styles}>
        {post.imageUrl && (
          <Card.Img as={Image} rounded variant="top" src={post.imageUrl} />
        )}
        <Card.Body>
          <Card.Text>{post.content}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
