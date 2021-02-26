import React, { FunctionComponent } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { sendRequest } from "../../../Util";

interface EditTitleProductToMenuLinkProps {
    menu: Menu
    menuEntry: MenuEntry
    onChange: (menuEntry: MenuEntry) => void
}

interface EditTitleProductToMenuLinkState {
    loaded: boolean
    titles: MenuTitle[]
}

const EditTitleProductToMenuLink: FunctionComponent<EditTitleProductToMenuLinkProps> = (props) => {
    const [show, setShow] = React.useState(false);
    const [data, setData] = React.useState({
        loaded: false,
        titles: []
    } as EditTitleProductToMenuLinkState);
    let title = {} as MenuTitle;

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (!data.loaded) {
            alert('Titles were not loaded');
            return;
        }
        setShow(true);
    }

    const handleSubmitClose = () => {
        let newEntry = { ...props.menuEntry };
        newEntry.title = title;
        props.onChange(newEntry);
        handleClose();
    }

    const load = () => {
        sendRequest(`/acp/menu/title/get`, 'GET', true, {}).then((response) => {
            if (response.data.success) {
                setData({
                    loaded: true,
                    titles: response.data.menutitles
                });
            }
        });
    }

    let titleOptions;
    if (!data.loaded) {
        load();
    } else {
        title = data.titles[0];
        titleOptions = data.titles.map((title) => <option key={title.id} value={title.id}>{title.name}</option>);
    }

    return (
        <>
            <Card.Link href="#" onClick={handleShow}>Edit Title</Card.Link>

            <Modal show={show} onHide={handleClose} className="change-group-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add product to menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>Select the title for the product '{props.menuEntry.product.name}' in '{props.menu.name}'</Modal.Body>
                <Form>

                    <Form.Group controlId="title.ControlName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control as="select" defaultValue={props.menuEntry.title.id} onChange={(e) => title = data.titles.filter((t) => t.id === parseInt(e.target.value))[0]}>
                            {titleOptions}
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmitClose}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditTitleProductToMenuLink;