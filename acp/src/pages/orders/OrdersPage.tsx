import React, { FunctionComponent, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sendRequest } from '../../Util';
import Order from './Order';

interface OrdersPageProps {

}

const OrdersPage: FunctionComponent<OrdersPageProps> = (props) => {
    document.title = 'Orders | Sokka ACP';
    const [date, setDate] = useState(new Date());
    const [orderData, setOrderData] = useState({
        loaded: false,
        data: []
    });
    const onDateChange = (date: Date) => {
        setOrderData({
            loaded: false,
            data: []
        });
        setDate(date);
    }
    const load = () => {
        sendRequest(`/acp/order/get?date=${date.toISOString().slice(0, 10)}`, 'GET', true, {}).then((response) => {
            if (response.data.success) {
                setOrderData({
                    loaded: true,
                    data: response.data.orders
                });
            } else {
                alert(`The API returned an error: ${response.data.message}`)
            }
        });
    }

    let content;
    if (orderData.loaded) {
        content = orderData.data.map((order: Order) => <Order order={order} />);
    } else {
        load();
        content = (<Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>);
    }
    return (<div className="app">
        <div className="container">
            <h1><i className="fa fa-qrcode mr-2" aria-hidden="true"></i>Orders</h1>
            <p>You can view orders for specific dates here.</p>
            <DatePicker className="mb-2" selected={date} onChange={onDateChange} />
            {content}
        </div>
    </div>);
}

export default OrdersPage;