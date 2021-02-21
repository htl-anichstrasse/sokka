import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import ListProductsComponent from './ListProductsComponent';
import './ProductsPage.css';

interface ProductsPageProps {

}

const ProductsPage: FunctionComponent<ProductsPageProps> = (props) => {
    document.title = 'Products | Sokka ACP';
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col-10">
                    <h1><i className="fa fa-shopping-cart mr-2" aria-hidden="true"></i>Products</h1>
                    <p>You can manage available products in the system here.</p>

                </div>
                <div className="col-2">
                    <Button variant="primary" onClick={() => { window.location.href = '/products/add'; }}>Add product</Button>
                </div>
            </div>
            <ListProductsComponent />
        </div>
    </div>);
}

export default ProductsPage;