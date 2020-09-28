import Axios from 'axios';
import React, { FunctionComponent } from 'react';
import Cookies from 'universal-cookie';
import config from '../config.json';
import logo from '../images/logo.png';
import { animateCSS } from '../Util';
import './LoginPage.css';

interface LoginPageProps {

}

let loginRef: React.RefObject<HTMLDivElement>
let userRef: React.RefObject<HTMLInputElement>
let passwordRef: React.RefObject<HTMLInputElement>

const LoginPage: FunctionComponent<LoginPageProps> = (props) => {
    document.title = 'Login — Sokka';
    userRef = React.createRef();
    passwordRef = React.createRef();
    loginRef = React.createRef();
    return (<div className="login">
        <div className="container" ref={loginRef}>
            <img id="logo" src={logo} alt="Sokka Logo" />
            <h1>Sokka</h1>
            <h5 className="text-muted">Please log in to access the ACP</h5>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" ref={userRef} onKeyUp={(event) => onKeyUp(event)} /><br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" ref={passwordRef} onKeyUp={(event) => onKeyUp(event)} /><br />
                <input className="btn btn-secondary" type="button" value="Log in" onClick={() => login()} />
            </form>
        </div>
    </div>);
}

function onKeyUp(event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
        login();
    }
}

function login(): void {
    if (userRef.current != null && passwordRef.current != null) {
        let usernameElement = userRef.current;
        let passwordElement = passwordRef.current;
        let username = usernameElement.value;
        let password = passwordElement.value;
        if (username.length === 0 || password.length === 0) {
            logInFail(loginRef.current);
            return;
        }
        Axios.post(`${config.api.url}/acp/login`, {
            username,
            password
        }).then((response) => {
            if (!response.data.success) {
                logInFail(loginRef.current);
                return;
            }
            new Cookies().set('sokka_username', username);
            new Cookies().set('sokka_token', response.data.token);
            window.location.reload();
        }).catch((err) => console.error(err));
    }
}

function logInFail(element: HTMLDivElement | null) {
    if (element && element !== null) {
        animateCSS(element, 'shakeX');
    }
}

export default LoginPage;