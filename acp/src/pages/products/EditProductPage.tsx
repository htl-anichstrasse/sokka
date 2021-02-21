import dataUriToBuffer from 'data-uri-to-buffer';
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { sendRequest } from '../../Util';
import ProductProperties from './components/ProductProperties';

interface EditProductPageProps {
    location: any
}

interface EditProductPageState {
    success: boolean
    product: Product | null
    categories: ProductCategory[] | null
}

class EditProductPage extends React.Component<EditProductPageProps, EditProductPageState> {
    private id: number = 0;

    constructor(props: EditProductPageProps) {
        super(props);
        this.state = { success: true, product: null, categories: null };
    }

    componentDidMount() {
        this.id = this.props.location.pathname.split('/')[2];
        sendRequest(`/acp/product/get?id=${this.id}`, 'GET', true, {}).then((productResponse) => {
            if (!productResponse.data.success || productResponse.data.products.length === 0) {
                this.setState({
                    success: false
                });
                return;
            }
            sendRequest(`/acp/product/category/get`, 'GET', true, {}).then((categoryResponse) => {
                if (!categoryResponse.data.success || categoryResponse.data.productcategories.length == 0) {
                    this.setState({
                        success: false
                    });
                    return;
                }
                this.setState({
                    success: true,
                    product: productResponse.data.products[0],
                    categories: categoryResponse.data.productcategories
                });
            });
        });
    }

    saveChanges(values: any) {
        if (values['image_id'].startsWith('data')) {
            sendRequest(`/acp/image`, 'POST', true, { buffer: dataUriToBuffer(values['image_id']) }).then((response) => {
                if (response.data.success) {
                    values['image_id'] = response.data.id;
                    this.updateProduct(values);
                }
            });
        } else {
            this.updateProduct(values);
        }
    }

    updateProduct(values: any) {
        values['price'] = Number(values['price']).toFixed(2);
        sendRequest(`/acp/product/update`, 'POST', true, { ...values }).then((response) => {
            if (response.data.success) {
                window.location.reload();
            } else {
                alert(`The API returned an error: ${response.data.message}`);
            }
        });
    }

    render() {
        document.title = 'Edit Product | Sokka ACP';
        let content;
        if (this.state.product == null) {
            if (this.state.success) {
                content = <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>;
            } else {
                content = <h2>Product not found</h2>;
            }
        } else {
            let values = {
                ...this.state.product
            };
            content = <>
                <h1><i className="fa fa-shopping-cart mr-2 mb-4" aria-hidden="true"></i>Edit Product: {this.state.product.name}</h1>
                <div className="container">
                    <ProductProperties product={this.state.product} categories={this.state.categories as ProductCategory[]} values={values} />
                    <Button variant="primary" onClick={() => this.saveChanges(values)}>Save changes</Button>
                </div>
            </>;
        }
        return (<div className="app">
            <div className="container">
                {content}
            </div>
        </div>);
    }
}

export default withRouter((props) => <EditProductPage {...props} />);