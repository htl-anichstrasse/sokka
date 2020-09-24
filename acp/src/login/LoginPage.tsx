import Axios from 'axios';
import React, { FunctionComponent } from 'react';
import Cookies from 'universal-cookie';
import config from '../config.json';
import { animateCSS } from '../Util';
import './LoginPage.css';

interface LoginPageProps {

}

let loginRef: React.RefObject<HTMLFormElement>
let userRef: React.RefObject<HTMLInputElement>
let passwordRef: React.RefObject<HTMLInputElement>

const LoginPage: FunctionComponent<LoginPageProps> = (props) => {
    document.title = 'Login — Sokka';
    userRef = React.createRef();
    passwordRef = React.createRef();
    loginRef = React.createRef();
    return (<div className="login">
        <h1>Please log in to access the ACP</h1>
        <form ref={loginRef}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" ref={userRef} /><br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" ref={passwordRef} /><br />
            <input type="button" value="Submit" onClick={(event) => login(event)} />
        </form>
    </div>);
}

function login(event: React.MouseEvent): void {
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
            const cookies = new Cookies();
            cookies.set('sokka_token', response.data.token);
            window.location.reload();
        }).catch((err) => console.error(err));
    }
}

export default LoginPage;