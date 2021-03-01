import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import QRCode from "react-qr-code";
import { formatCurrency } from '../../Util';

interface OrderProps {
    order: Order
}

const Order: FunctionComponent<OrderProps> = (props) => {
    const generateProductOrders = (order: Order) => {
        if (order.productOrders.length === 0) {
            return (<p key={0}>No product orders</p>);
        }
        let productOrders = [];
        let priceTotal = 0;
        for (let productOrder of order.productOrders) {
            productOrders.push(<li key={productOrder.product_id}>{productOrder.quantity}x {productOrder.product.name} ({formatCurrency(productOrder.product.price)})</li>);
            priceTotal += productOrder.product.price;
        }
        return productOrders;
    }
    const generateMenuOrders = (order: Order) => {
        if (order.menuOrders.length === 0) {
            return (<p key={0}>No menu orders</p>);
        }
        let menuOrders = [];
        let priceTotal = 0;
        for (let menuOrder of order.menuOrders) {
            menuOrders.push(<li key={menuOrder.menu_id}>{menuOrder.quantity}x {menuOrder.menu.name} ({formatCurrency(menuOrder.menu.price)})</li>);
            priceTotal += menuOrder.menu.price;
        }
        return menuOrders;
    }
    let totalPrice = props.order.productOrders.map((p) => p.product.price).reduce((p1, p2) => p1 + p2, 0) + props.order.menuOrders.map((m) => m.menu.price).reduce((m1, m2) => m1 + m2, 0);
    return (
        <Card className="mb-4">
            <div className="card-header">
                <div className="row">
                    <div className="col-3 d-none d-md-block">
                        <QRCode size={128} value={String(props.order.user_id + ':' + props.order.id)} />
                    </div>
                    <div className="col-md-4 col-sm">
                        <b>Menu Orders:</b><br />
                        <ul className="order-list">
                            {generateMenuOrders(props.order)}
                        </ul>
                    </div>
                    <div className="col-md-4 col-sm">
                        <b>Product Orders:</b><br />
                        <ul className="order-list">
                            {generateProductOrders(props.order)}
                        </ul>
                    </div>
                </div>
            </div>
            <Card.Body>
                <div className="row">
                    <div className="col">
                        <Card.Title>
                            Order: #{props.order.id}, User ID: {props.order.user_id}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            From {new Date(props.order.timestamp).toLocaleString()}
                        </Card.Subtitle>

                    </div>
                    <div className="col">
                        <Card.Text>
                            This order is <b>{props.order.state}</b><br />
                            {
                                props.order.rebate > 0 ?
                                    <>
                                        Subtotal: {formatCurrency(totalPrice)}<br />
                                Group Rebate: {(props.order.rebate).toFixed(0)} %<br />
                                Total: {formatCurrency(totalPrice - (totalPrice * (props.order.rebate / 100)))}
                                    </> :
                                    <>Total: {formatCurrency(totalPrice)}</>
                            }
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Order;