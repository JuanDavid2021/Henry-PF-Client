import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { addReview } from '../actions';
import Review from './Review';

function ReviewModal({ id, status, show, handleClose, nombreCap }) {


    const comprado = status !== "Dispatched" ? false : true


    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------


    const [confirmModal, setConfirmModal] = useState(false)

    const handleCloseModal = () => {
        setConfirmModal(false)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{nombreCap}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form /* noValidate validated={validated} */>
                        <Review
                            id={id}
                            available={comprado}
                            califications={["Pasable", "Regular", "Bueno", "Muy bueno", "Exelente"]}
                            toDispatch={addReview} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
                {/* modal confirmación */}
                <Modal
                    show={confirmModal}
                    size="sm"
                    onHide={handleCloseModal}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseModal}>Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </Modal>
        </>
    );
}

export default ReviewModal;
