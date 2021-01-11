import React, { FunctionComponent } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface ChangeGroupButtonProps {
    row: any
    callback: (row: any, group_id: number, groupname: string, rebate: number) => void
}

const ChangeGroupButton: FunctionComponent<ChangeGroupButtonProps> = (props) => {
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
        props.callback(props.row, props.row.id, groupNameRef.current.value, parseInt(rebateRef.current.value));
        handleClose();
    }

    return (
        <>
            <Button title="Change group" variant="light" onClick={handleShow}><i className="fa fa-star"></i></Button>

            <Modal show={show} onHide={handleClose} className="change-group-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Change group</Modal.Title>
                </Modal.Header>
                <Modal.Body>Enter new info for group with id '{props.row.id}' here</Modal.Body>
                <Form>
                    <Form.Group controlId="createGroup.ControlName">
                        <Form.Label>Select name</Form.Label>
                        <Form.Control ref={groupNameRef} type="text" placeholder="Enter name" defaultValue={props.row.name} />
                    </Form.Group>
                    <Form.Group controlId="createGroup.ControlRebate">
                        <Form.Label>Select rebate</Form.Label>
                        <Form.Control ref={rebateRef} type="range" min="0" max="100" defaultValue={props.row.rebate} onChange={(e) => {
                            let rebate = document.getElementById('change-modal-rebate');
                            if (rebate) {
                                rebate.innerHTML = e.target.value + ' %';
                            }
                        }} />
                        <span id="change-modal-rebate">{props.row.rebate} %</span>
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
        </>
    );
}

export default ChangeGroupButton;