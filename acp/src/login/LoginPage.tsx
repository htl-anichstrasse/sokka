import Axios from 'axios';
import React, { FunctionComponent } from 'react';
import Cookies from 'universal-cookie';
import config from '../config.json';
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
            <h1>Please log in to access the ACP</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" ref={userRef} onKeyUp={(event) => onKeyUp(event)} /><br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" ref={passwordRef} onKeyUp={(event) => onKeyUp(event)} /><br />
                <input type="button" value="Submit" onClick={() => login()} />
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
        Axios.post(`${config.api.url}/acp/login`, {
            username,
            password
        }).then((response) => {
            if (!response.data.success) {
                if (loginRef.current != null) {
                    animateCSS(loginRef.current, 'shakeX');
                }
                return;
            }
            // cache this for a bit ... otherwise token will be validated on every page change
            new Cookies().set('sokka_token_validation', true, { expires: new Date(Date.now() + 5 * 60 * 1000) });
            new Cookies().set('sokka_username', username);
            new Cookies().set('sokka_token', response.data.token);
            window.location.reload();
        }).catch((err) => console.error(err));
    }
}

export default LoginPage;