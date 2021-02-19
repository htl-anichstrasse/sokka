import dataUriToBuffer from 'data-uri-to-buffer';
import React, { FunctionComponent } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { sendRequest } from '../../Util';
import ProductProperties from './components/ProductProperties';

interface AddProductPageProps {

}

const AddProductPage: FunctionComponent<AddProductPageProps> = (props) => {
    const [state, setState] = React.useState({} as { categories: Array<ProductCategory> });

    const load = () => {
        sendRequest('/acp/product/category/get', 'GET', true, {}).then((response) => {
            if (!response.data.success || response.data.productcategories.length === 0) {
                alert(`The API returned an error: ${response.data.message ? response.data.message : 'No categories found'}`);
            }
            setState({ categories: response.data.productcategories });
        });
    }

    let product: Product = {
        id: 0,
        name: '',
        category_id: 1,
        image_id: '',
        price: 0,
        hidden: false
    };
    let values = { ...product };

    const addProduct = () => {
        if (values['image_id'] === '') {
            alert('Please choose a image');
            return;
        }

        sendRequest(`/acp/image`, 'POST', true, { buffer: dataUriToBuffer(values['image_id']) }).then((response) => {
            if (!response.data.success) {
                alert(`The API returned an error: ${response.data.message}`);
                return;
            }
            values['image_id'] = response.data.id;
            let { id, ...sendValues } = values;
            sendRequest('/acp/product/create', 'POST', true, sendValues).then((response) => {
                if (response.data.success) {
                    window.location.href = '/products';
                } else {
                    alert(`The API returned an error: ${response.data.message}`);
                }
            });
        });
    }

    document.title = 'Add Product | Sokka ACP';
    if (state.categories) {
        return (<div className="app">
            <div className="container">
                <h1><i className="fa fa-shopping-cart mr-2 mb-4" aria-hidden="true"></i>Add Product</h1>
                <div className="container">
                    <ProductProperties product={product} values={values} categories={state.categories} />
                    <Button variant="primary" onClick={() => addProduct()}>Add Product</Button>
                </div>
            </div>
        </div>);
    } else {
        load();
        return <div className="app">
            <div className="container">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        </div>;
    }
}

export default AddProductPage;