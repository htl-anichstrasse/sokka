import React, { FunctionComponent } from 'react';

interface ProductsPageProps {

}

const ProductsPage: FunctionComponent<ProductsPageProps> = (props) => {
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa fa-shopping-cart mr-2" aria-hidden="true"></i>Products</h1>
                    <p>There will be products here one day.</p>
                </div>
            </div>
        </div>
    </div>);
}

export default ProductsPage;