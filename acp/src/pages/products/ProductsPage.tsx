import './ProductsPage.css';
import React, { FunctionComponent } from 'react';
import ListProductsComponent from './ListProductsComponent';

interface ProductsPageProps {

}

const ProductsPage: FunctionComponent<ProductsPageProps> = (props) => {
    document.title = 'Products | Sokka ACP';
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa fa-shopping-cart mr-2" aria-hidden="true"></i>Products</h1>
                    <p>You can manage available products in the system here.</p>
                    <ListProductsComponent />
                </div>
            </div>
        </div>
    </div>);
}

export default ProductsPage;