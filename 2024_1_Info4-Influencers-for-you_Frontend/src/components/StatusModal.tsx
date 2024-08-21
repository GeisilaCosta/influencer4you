import { Button, Modal } from "react-bootstrap";
import "../css/StatusModal.css";

type StatusModalProps = {
  show: boolean;
  handleClose: () => void;
  status: "success" | "error";
  message: string;
};

const StatusModal: React.FC<StatusModalProps> = ({
  show,
  handleClose,
  status,
  message,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered className="status-modal">
      <Modal.Body className="modal-content">
        {status === "success" ? (
          <svg className="checkmark" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" />
            <path className="checkmark__check" d="M14 27l7 7 16-16" />
          </svg>
        ) : (
          <svg className="cross" viewBox="0 0 52 52">
            <circle className="cross__circle" cx="26" cy="26" r="25" />
            <path className="cross__cross" d="M16 16 36 36 M36 16 16 36" />
          </svg>
        )}
        <p>{message}</p>
        <div className="modal-action-button-container">
          <Button variant="primary" className="modal-action-button" onClick={handleClose}>
            Fechar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default StatusModal;
