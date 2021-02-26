import React, { FunctionComponent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { sendRequest } from "../../../Util";

interface AddProductToMenuButtonProps {
    menu: Menu
    onAdd: (menuEntry: MenuEntry) => void
}

interface AddProductToMenuButtonDataState {
    loaded: boolean
    products: Product[]
    titles: MenuTitle[]
}

const AddProductToMenuButton: FunctionComponent<AddProductToMenuButtonProps> = (props) => {
    const [show, setShow] = React.useState(false);
    const [data, setData] = React.useState({
        loaded: false,
        products: [],
        titles: []
    } as AddProductToMenuButtonDataState);
    let product = {} as Product;
    let title = {} as MenuTitle;

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (!data.loaded) {
            alert('Product data was not loaded');
            return;
        }
        setShow(true);
    }

    const handleSubmitClose = () => {
        props.onAdd({ product: product, menu: props.menu, title: title });
        handleClose();
    }

    const load = () => {
        Promise.all([sendRequest(`/acp/product/get`, 'GET', true, {}), sendRequest(`/acp/menu/title/get`, 'GET', true, {})]).then((response) => {
            if (response[0].data.success && response[1].data.success) {
                setData({
                    loaded: true,
                    products: response[0].data.products,
                    titles: response[1].data.menutitles
                });
            }
        });
    }

    let productOptions;
    let titleOptions;
    if (!data.loaded) {
        load();
    } else {
        product = data.products[0];
        title = data.titles[0];
        productOptions = data.products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>);
        titleOptions = data.titles.map((title) => <option key={title.id} value={title.id}>{title.name}</option>);
    }

    return (
        <>
            <Button className="add-product-button mr-2" variant="success" onClick={handleShow}>Add product</Button>

            <Modal show={show} onHide={handleClose} className="change-group-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add product to menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>The selected product will be added to the '{props.menu.name}' menu</Modal.Body>
                <Form>
                    <Form.Group controlId="product.ControlName">
                        <Form.Label>Product</Form.Label>
                        <Form.Control as="select" onChange={(e) => product = data.products.filter((p) => p.id === parseInt(e.target.value))[0]}>
                            {productOptions}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="title.ControlName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control as="select" onChange={(e) => title = data.titles.filter((t) => t.id === parseInt(e.target.value))[0]}>
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

export default AddProductToMenuButton;