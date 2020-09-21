import React, { FunctionComponent } from 'react';
import Nav from 'react-bootstrap/Nav';
import BSNavbar from 'react-bootstrap/Navbar';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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
            </BSNavbar.Collapse>
        </BSNavbar>
    );
}

function itemIsActive(item: { link: string, label: string }, props: RouteComponentProps) {
    return item.link === props.location.pathname;
}

export default withRouter(Navbar);