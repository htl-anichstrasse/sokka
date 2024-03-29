import React, { FunctionComponent } from 'react';
import { CardColumns, Spinner } from 'react-bootstrap';
import { sendRequest } from '../../Util';
import Product from './Product';

interface ListProductsComponentProps {

}

const ListProductsComponent: FunctionComponent<ListProductsComponentProps> = (props) => {
    const [state, setState] = React.useState({} as { products: Array<Product> });

    const load = () => {
        sendRequest('/acp/product/get', 'GET', true, {}).then((response) => {
            setState({ products: response.data.products });
        });
    }

    if (state.products) {
        let products = state.products.map((product) => <Product key={product.id} product={product} />);
        if (products.length > 0) {
            return (<CardColumns>
                {products}
            </CardColumns>);
        } else {
            return (<h2>No products found</h2>);
        }
    } else {
        load();
        return (<Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>);
    }
}

export default ListProductsComponent;