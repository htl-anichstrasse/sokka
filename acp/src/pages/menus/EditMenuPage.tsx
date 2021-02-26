import dataUriToBuffer from 'data-uri-to-buffer';
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { sendRequest } from '../../Util';
import MenuProperties from './components/MenuProperties';

interface EditMenuPageProps {
    location: any
}

interface EditMenuPageState {
    success: boolean
    menu: Menu | null
    categories: MenuCategory[] | null
}

class EditMenuPage extends React.Component<EditMenuPageProps, EditMenuPageState> {
    private id: number = 0;

    constructor(props: EditMenuPageProps) {
        super(props);
        this.state = { success: true, menu: null, categories: null };
    }

    componentDidMount() {
        this.id = this.props.location.pathname.split('/')[2];
        sendRequest(`/acp/menu/get?id=${this.id}`, 'GET', true, {}).then((menuResponse) => {
            if (!menuResponse.data.success || menuResponse.data.menus.length === 0) {
                this.setState({
                    success: false
                });
                return;
            }
            sendRequest(`/acp/menu/category/get`, 'GET', true, {}).then((categoryResponse) => {
                if (!categoryResponse.data.success || categoryResponse.data.menucategories.length == 0) {
                    this.setState({
                        success: false
                    });
                    return;
                }
                this.setState({
                    success: true,
                    menu: menuResponse.data.menus[0],
                    categories: categoryResponse.data.menucategories
                });
            });
        });
    }

    saveChanges(values: any) {
        if (values['image_id'].startsWith('data')) {
            sendRequest(`/acp/image`, 'POST', true, { buffer: dataUriToBuffer(values['image_id']) }).then((response) => {
                if (response.data.success) {
                    values['image_id'] = response.data.id;
                    this.updateMenu(values);
                }
            });
        } else {
            this.updateMenu(values);
        }
    }

    updateMenu(values: any) {
        values['price'] = Number(values['price']).toFixed(2);
        sendRequest(`/acp/menu/update`, 'POST', true, { ...values }).then((response) => {
            if (response.data.success) {
                window.location.reload();
            } else {
                alert(`The API returned an error: ${response.data.message}`);
            }
        });
    }

    render() {
        document.title = 'Edit Menu | Sokka ACP';
        let content;
        if (this.state.menu == null) {
            if (this.state.success) {
                content = <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>;
            } else {
                content = <h2>Menu not found</h2>;
            }
        } else {
            let values = {
                ...this.state.menu
            };
            content = <>
                <h1><i className="fa fa-shopping-cart mr-2 mb-4" aria-hidden="true"></i>Edit Menu: {this.state.menu.name}</h1>
                <div className="container">
                    <MenuProperties menu={this.state.menu} categories={this.state.categories as MenuCategory[]} values={values} />
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

export default withRouter((props) => <EditMenuPage {...props} />);