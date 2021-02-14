import React, { FunctionComponent } from 'react';
import ListMenusComponent from './ListMenusComponent';
import './MenusPage.css';

interface MenusPageProps {

}

const MenusPage: FunctionComponent<MenusPageProps> = (props) => {
    document.title = 'Menus | Sokka ACP';
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa fa-cart-plus mr-2" aria-hidden="true"></i>Menus</h1>
                    <p>You can manage available menus in the system here.</p>
                    <ListMenusComponent />
                </div>
            </div>
        </div>
    </div>);
}

export default MenusPage;