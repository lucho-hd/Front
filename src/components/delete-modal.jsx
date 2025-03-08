import { Modal, Button } from 'react-bootstrap';

function DeleteModal({ title, message, onConfirm, onCancel, show }) {
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
                <Button variant="danger" onClick={onConfirm}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;
