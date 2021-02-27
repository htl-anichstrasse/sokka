import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import { formatCurrency, getBaseURL, sendRequest } from "../../Util";

interface MenuProps {
    menu: Menu
}

const Menu: FunctionComponent<MenuProps> = (props) => {
    const onDelete = () => {
        if (!window.confirm(`Do you really want to delete '${props.menu.name}'? This cannot be undone`)) {
            return;
        }
        sendRequest('/acp/menu/delete', 'POST', true, { id: props.menu.id }).then((response) => {
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
                <Card.Img className="menu-image" src={`${getBaseURL()}/image?id=${props.menu.image_id}`} />
            </div>
            <Card.Body>
                <Card.Title>{props.menu.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{formatCurrency(props.menu.price)}</Card.Subtitle>
                <Card.Text>
                    <Card.Link href={`/menus/${props.menu.id}`}>Edit</Card.Link>
                    <Card.Link href="#" onClick={onDelete}>Delete</Card.Link>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Menu;