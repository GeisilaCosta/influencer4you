import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const engagementData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
    datasets: [
      {
        label: "Engajamento",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const businessData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
    datasets: [
      {
        label: "Negócios Feitos",
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <h1 className="my-4">Dashboard</h1>

      <Row>
        <Col md={18}>
          <h2>Engajamento ao longo dos meses</h2>
          <Line data={engagementData} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={18}>
          <h2>Negócios Feitos</h2>
          <Bar data={businessData} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
