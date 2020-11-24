import React, { FunctionComponent } from 'react';

interface MenusPageProps {

}

const MenusPage: FunctionComponent<MenusPageProps> = (props) => {
    document.title = 'Menus | Sokka ACP';
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa fa-cart-plus mr-2" aria-hidden="true"></i>Menus</h1>
                    <p>There will be menus here one day.</p>
                </div>
            </div>
        </div>
    </div>);
}

export default MenusPage;