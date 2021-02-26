import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import ListMenusComponent from './ListMenusComponent';
import './MenusPage.css';

interface MenusPageProps {

}

const MenusPage: FunctionComponent<MenusPageProps> = (props) => {
    document.title = 'Menus | Sokka ACP';
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col-10">
                    <h1><i className="fa fa-cart-plus mr-2" aria-hidden="true"></i>Menus</h1>
                    <p>You can manage available menus in the system here.</p>
                    <ListMenusComponent />
                </div>
                <div className="col-2">
                    <Button variant="primary" onClick={() => { window.location.href = '/menus/add'; }}>Add menu</Button>
                </div>
            </div>
        </div>
    </div>);
}

export default MenusPage;