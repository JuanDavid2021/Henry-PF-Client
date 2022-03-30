import React from 'react';
import { Button, Modal } from 'react-bootstrap';


/**
 * `active`: Boolean
 * 
 * `title`: String
 * 
 * `children`: JSX.Element
 * 
 * `onClose`: Function (Void)
 * 
 * `onSubmit`: Function (Void)
 * 
 * `submit`: String (optional)
 * 
 * `close`: String (optional)
 * 
 */


export default function GenericModal({ active, title, children, onClose, onSubmit, submit = 'Submit', close = 'Close' }) {

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered show={active} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onSubmit}>
          {close}
        </Button>
        <Button variant="primary" onClick={onClose}>
          {submit}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
