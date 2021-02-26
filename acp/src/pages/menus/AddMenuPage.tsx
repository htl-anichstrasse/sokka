import dataUriToBuffer from 'data-uri-to-buffer';
import React, { FunctionComponent } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { sendRequest } from '../../Util';
import MenuProperties from './components/MenuProperties';

interface AddMenuPageProps {

}

const AddMenuPage: FunctionComponent<AddMenuPageProps> = (props) => {
    const [state, setState] = React.useState({} as { categories: Array<MenuCategory> });

    const load = () => {
        sendRequest('/acp/menu/category/get', 'GET', true, {}).then((response) => {
            if (!response.data.success || response.data.menucategories.length === 0) {
                alert(`The API returned an error: ${response.data.message ? response.data.message : 'No categories found'}`);
            }
            setState({ categories: response.data.menucategories });
        });
    }

    let menu: Menu = {
        id: 0,
        name: '',
        category_id: 1,
        image_id: '',
        price: 0,
        entries: []
    };
    let values = { ...menu };

    const addMenu = () => {
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
            sendRequest('/acp/menu/create', 'POST', true, sendValues).then((response) => {
                if (response.data.success) {
                    window.location.href = '/menus';
                } else {
                    alert(`The API returned an error: ${response.data.message}`);
                }
            });
        });
    }

    document.title = 'Add Menu | Sokka ACP';
    if (state.categories) {
        return (<div className="app">
            <div className="container">
                <h1><i className="fa fa-shopping-cart mr-2 mb-4" aria-hidden="true"></i>Add Menu</h1>
                <div className="container">
                    <MenuProperties menu={menu} values={values} categories={state.categories} />
                    <Button variant="primary" onClick={() => addMenu()}>Add menu</Button>
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

export default AddMenuPage;