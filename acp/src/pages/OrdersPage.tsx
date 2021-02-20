import React, { FunctionComponent } from 'react';

interface OrdersPageProps {

}

const OrdersPage: FunctionComponent<OrdersPageProps> = (props) => {
    document.title = 'Orders | Sokka ACP';
    return (<div className="app">
        <div className="container">
            <h1><i className="fa fa-qrcode  mr-2" aria-hidden="true"></i>Orders</h1>
            <p>Customer orders can be seen here soon.</p>
        </div>
    </div>);
}

export default OrdersPage;