import React, { FunctionComponent } from 'react';
import { CardColumns } from 'react-bootstrap';
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
        return (<>
            <CardColumns>
                {products}
            </CardColumns>
        </>);
    } else {
        load();
        return (<h3>Loading...</h3>);
    }
}

export default ListProductsComponent;