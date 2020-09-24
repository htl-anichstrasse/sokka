import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import BSNavbar from 'react-bootstrap/Navbar';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import logo from '../images/logo.png';

const items = [
    { link: '/', label: 'Home' },
    { link: '/test1', label: 'Test1' },
    { link: '/test2', label: 'Test2' }
];

const Navbar: FunctionComponent<RouteComponentProps> = (props: RouteComponentProps) => {
    let siteItems = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        siteItems.push(<Nav.Link key={i} href={item.link} className={itemIsActive(item, props) ? 'active' : ''}>{item.label}</Nav.Link>)
    }
    return (
        <BSNavbar bg="light" expand="lg">
            <BSNavbar.Brand href="/"><img src={logo} alt="Sokka Logo" width="50px" /> Sokka ACP</BSNavbar.Brand>
            <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BSNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {siteItems}
                </Nav>
                <Nav className="ml-auto">
                    <span className="mr-2 mt-auto mb-auto text-muted">Welcome, {new Cookies().get('sokka_username')}</span>
                    <LogoutButton />
                </Nav>
            </BSNavbar.Collapse>
        </BSNavbar>
    );
}

function itemIsActive(item: { link: string, label: string }, props: RouteComponentProps) {
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