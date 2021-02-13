import React, { FunctionComponent } from 'react';
import { CardColumns, Spinner } from 'react-bootstrap';
import { sendRequest } from '../../Util';
import Menu from './Menu';

interface ListMenusComponentProps {

}

const ListMenusComponent: FunctionComponent<ListMenusComponentProps> = (props) => {
    const [state, setState] = React.useState({} as { menus: Array<Menu> });

    const load = () => {
        sendRequest('/acp/menu/get', 'GET', true, {}).then((response) => {
            setState({ menus: response.data.menus });
        });
    }

    if (state.menus) {
        let menus = state.menus.map((menu) => <Menu key={menu.id} menu={menu} />);
        return (<>
            <CardColumns>
                {menus}
            </CardColumns>
        </>);
    } else {
        load();
        return (<Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>);
    }
}

export default ListMenusComponent;