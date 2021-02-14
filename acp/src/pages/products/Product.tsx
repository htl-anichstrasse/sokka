import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";

interface ProductProps {
    product: Product
}

const Product: FunctionComponent<ProductProps> = (props) => {
    return (
        <Card>
            <div className="card-header">
                <Card.Img className="product-image" src={URL.createObjectURL(new Blob([Int8Array.from(props.product.image.data).buffer], { type: 'image/png' }))} />
            </div>
            <Card.Body>
                <Card.Title>{props.product.name}{props.product.hidden ? <span className="text-muted">(Hidden)</span> : null}</Card.Title>
                <Card.Text>€ {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(props.product.price)}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;