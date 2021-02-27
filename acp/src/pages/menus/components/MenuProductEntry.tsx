import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import { formatCurrency, getBaseURL } from "../../../Util";
import EditTitleProductToMenuLink from "./EditTitleProductToMenuLink";

interface MenuProductEntryProps {
    menu: Menu
    menuEntry: MenuEntry
    onChange: (menuEntry: MenuEntry) => void
    onDelete: (menuEntry: MenuEntry) => void
}

const MenuProductEntry: FunctionComponent<MenuProductEntryProps> = (props) => {
    const onDelete = () => {
        if (!window.confirm(`Do you really want to delete '${props.menuEntry.product.name}'? This cannot be undone`)) {
            return;
        }
        props.onDelete(props.menuEntry);
    }

    return (
        <Card>
            <div className="card-header">
                <Card.Img className="menu-image" src={`${getBaseURL()}/image?id=${props.menuEntry.product.image_id}`} />
            </div>
            <Card.Body>
                <Card.Title>{props.menuEntry.product.name} {props.menuEntry.product.hidden ? <span className="text-muted">(Hidden)</span> : null}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.menuEntry.title.name} — {formatCurrency(props.menuEntry.product.price)}</Card.Subtitle>
                <Card.Text>
                    <EditTitleProductToMenuLink menuEntry={props.menuEntry} menu={props.menu} onChange={props.onChange} />
                    <Card.Link href="#" onClick={onDelete}>Delete</Card.Link>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default MenuProductEntry;