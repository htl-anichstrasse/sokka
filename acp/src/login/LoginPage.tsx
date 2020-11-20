import React, { FunctionComponent } from 'react';
import Cookies from 'universal-cookie';
import logo from '../images/logo.png';
import { animateCSS, sendRequest } from '../Util';
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
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input ref={userRef} type="text" className="form-control" id="username" placeholder="Username" onKeyUp={(event) => onKeyUp(event)} />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input ref={passwordRef} type="password" className="form-control" id="password" placeholder="Password" onKeyUp={(event) => onKeyUp(event)} />
                </div>
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
        sendRequest('/acp/login', 'POST', false, {
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
        }).catch();
    }
}

function logInFail(element: HTMLDivElement | null) {
    if (element && element !== null) {
        animateCSS(element, 'shakeX');
    }
}

export default LoginPage;