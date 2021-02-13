import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";

interface MenuProps {
    menu: Menu
}

const Menu: FunctionComponent<MenuProps> = (props) => {
    return (
        <Card>
            <div className="card-header">
                <Card.Img className="menu-image" src={URL.createObjectURL(new Blob([Int8Array.from(props.menu.image.data).buffer], { type: 'image/png' }))} />
            </div>
            <Card.Body>
                <Card.Title>{props.menu.name}</Card.Title>
                <Card.Text>€ {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(props.menu.price)}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Menu;