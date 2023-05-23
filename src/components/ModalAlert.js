import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import btnStyles from "../../src/styles/Button.module.css"

function ModalAlert({ show, handleClose, deleteConfirm, title, message }) {

  return (
    <Modal show={show} onClose={handleClose} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button className={`${btnStyles.Button} ${btnStyles.Unfollow}`} onClick={handleClose}>
          Close
        </Button>
        <Button className={`${btnStyles.Button} ${btnStyles.Follow}`} onClick={deleteConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default ModalAlert;