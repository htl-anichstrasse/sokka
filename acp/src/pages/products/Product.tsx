import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import { getBaseURL, sendRequest } from "../../Util";

interface ProductProps {
    product: Product
}

const Product: FunctionComponent<ProductProps> = (props) => {
    const onDelete = () => {
        if (!window.confirm(`Do you really want to delete '${props.product.name}'? This cannot be undone`)) {
            return;
        }
        sendRequest('/acp/product/delete', 'POST', true, { id: props.product.id }).then((response) => {
            if (response.data.success) {
                window.location.reload();
            } else {
                alert(`The API returned an error: ${response.data.message}`);
            }
        });
    }

    return (
        <Card>
            <div className="card-header">
                <Card.Img className="product-image" src={`${getBaseURL()}/image?id=${props.product.image_id}`} />
            </div>
            <Card.Body>
                <Card.Title>
                    {props.product.name} {props.product.hidden ? <span className="text-muted">(Hidden)</span> : null}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">€ {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(props.product.price)}</Card.Subtitle>
                <Card.Text>
                    <Card.Link href={`/products/${props.product.id}`}>Edit</Card.Link>
                    <Card.Link href="#" onClick={onDelete}>Delete</Card.Link>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;