import React, { FunctionComponent } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface ChangeUserButtonProps {
    row: any
    groups: Group[]
    callback: (row: any, group_id: number) => void
}

const ChangeUserButton: FunctionComponent<ChangeUserButtonProps> = (props) => {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmitClose = (group: any) => {
        if (group) {
            if (group.value === props.row.name) {
                alert('Please choose a different group than the one already active!');
                return;
            }
            let groupObject = props.groups.find((val) => val.name === group.value);
            if (groupObject) {
                props.callback(props.row, groupObject.id);
            } else {
                alert('Please choose a valid group!');
                return;
            }
        }
        handleClose();
    }
    const inputRef = React.useRef(null);

    let options = [];
    for (let group of props.groups) {
        options.push(<option selected={props.row.name === group.name}>{group.name}</option>);
    }

    return (
        <>
            <Button title="Change group" variant="light" onClick={handleShow}><i className="fa fa-pencil"></i></Button>

            <Modal show={show} onHide={handleClose} className="change-group-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Change group</Modal.Title>
                </Modal.Header>
                <Modal.Body>Enter desired group of user '{props.row.email}' here</Modal.Body>
                <Form>
                    <Form.Group controlId="changeGroup.ControlSelect1">
                        <Form.Label>Select group</Form.Label>
                        <Form.Control ref={inputRef} as="select">
                            {options}
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={() => handleSubmitClose(inputRef.current)}>
                        Save
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangeUserButton;