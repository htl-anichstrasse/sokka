import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import QRCode from "react-qr-code";

interface OrderProps {
    order: Order
}

const Order: FunctionComponent<OrderProps> = (props) => {
    return (
        <Card>
            <div className="card-header">
                <QRCode size={128} value={String(props.order.user_id + ':' + props.order.id)} />
            </div>
            <Card.Body>
                <Card.Title>
                    #{props.order.id}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    From {props.order.timestamp.toLocaleString('en_US')}
                </Card.Subtitle>
                <Card.Text>
                    {props.order.state}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Order;