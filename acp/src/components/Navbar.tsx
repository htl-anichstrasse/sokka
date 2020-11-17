import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import BSNavbar from 'react-bootstrap/Navbar';
import { Link, NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import logo from '../images/logo.png';

const items = [
    { link: '/', label: 'Home' },
    { link: '/products', label: 'Products' },
    { link: '/menus', label: 'Menus' },
    { link: '/users', label: 'Users' },
    { link: '/groups', label: 'Groups' }
];
const configItem = { link: '/config', label: (<i className="fa fa-lg fa-cogs"></i>) };

const Navbar: FunctionComponent<RouteComponentProps> = (props: RouteComponentProps) => {
    let siteItems = [];
    for (let i = 0; i < items.length; i++) {
        let item: { link: string, label: string | JSX.Element } = items[i];
        // set exact attribute for home link
        siteItems.push(<NavLink exact={item.label === 'Home'} key={i} to={item.link} className='nav-link'>{item.label}</NavLink>);
    }
    return (
        <BSNavbar bg="light" expand="lg">
            <BSNavbar.Brand href="/"><img src={logo} alt="Sokka Logo" width="50px" /> Sokka<sup>ACP</sup></BSNavbar.Brand>
            <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BSNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {siteItems}
                </Nav>
                <Nav className="ml-auto">
                    <NavLink key={999} to={configItem.link} className='nav-link mr-3'>{configItem.label}</NavLink>
                    <span className="mr-2 mt-auto mb-auto text-muted">Welcome, {new Cookies().get('sokka_username')}</span>
                    <LogoutButton />
                </Nav>
            </BSNavbar.Collapse>
        </BSNavbar>
    );
}

function itemIsActive(item: { link: string, label: string | JSX.Element }, props: RouteComponentProps) {
    return item.link === props.location.pathname;
}

const LogoutButton: FunctionComponent = (props) => {
    const click = () => {
        let cookies = new Cookies();
        cookies.remove('sokka_username');
        cookies.remove('sokka_token_validation');
        cookies.remove('sokka_token');
        window.location.reload();
    };

    return (
        <Button variant="light" onClick={click}>Log out</Button>
    );
}

export default withRouter(Navbar);