import React, { FunctionComponent } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { sendRequest } from '../../Util';

interface CreateGroupButtonProps {

}

const CreateGroupButton: FunctionComponent<CreateGroupButtonProps> = (props) => {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const groupNameRef = React.useRef({} as HTMLInputElement);
    const rebateRef = React.useRef({} as HTMLInputElement);

    const handleSubmitClose = () => {
        if (groupNameRef && groupNameRef.current) {
            if (groupNameRef.current.value.length === 0) {
                alert('Please enter a longer name');
                return;
            }
        } else {
            alert('Please enter a name');
            return;
        }
        if (!(rebateRef && rebateRef.current)) {
            alert('Please enter a rebate');
            return;
        }

        // Send to DB
        sendRequest('/acp/creategroup', 'POST', true,
            { groupname: groupNameRef.current.value, rebate: parseInt(rebateRef.current.value) }).then((values) => {
                window.location.reload();
            });
    }

    return (<>
        <Button variant="primary" onClick={handleShow}>Create group</Button>
        <Modal show={show} onHide={handleClose} className="change-group-modal">
            <Modal.Header closeButton>
                <Modal.Title>Create group</Modal.Title>
            </Modal.Header>
            <Modal.Body>Enter information for creating a new group here</Modal.Body>
            <Form>
                <Form.Group controlId="createGroup.ControlName">
                    <Form.Label>Select name</Form.Label>
                    <Form.Control ref={groupNameRef} type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="createGroup.ControlRebate">
                    <Form.Label>Select rebate</Form.Label>
                    <Form.Control ref={rebateRef} type="range" min="0" max="100" defaultValue="0" onChange={(e) => {
                        let rebate = document.getElementById('create-modal-rebate');
                        if (rebate) {
                            rebate.innerHTML = e.target.value + ' %';
                        }
                    }} />
                    <span id="create-modal-rebate">0 %</span>
                </Form.Group>
            </Form>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
            </Button>
                <Button variant="primary" onClick={handleSubmitClose}>
                    Save
            </Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default CreateGroupButton;