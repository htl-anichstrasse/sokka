import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import { getBaseURL } from "../../Util";

interface MenuProps {
    menu: Menu
}

const Menu: FunctionComponent<MenuProps> = (props) => {
    return (
        <Card>
            <div className="card-header">
                <Card.Img className="menu-image" src={`${getBaseURL()}/image?id=${props.menu.image_id}`} />
            </div>
            <Card.Body>
                <Card.Title>{props.menu.name}</Card.Title>
                <Card.Text>€ {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(props.menu.price)}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Menu;