import { Modal, Button } from 'react-bootstrap';

function ConfirmationModal({ title, message, onConfirm, onCancel, show }) {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={onConfirm}>
                    Si, reemplazar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;
