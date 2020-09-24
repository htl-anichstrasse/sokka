import Axios from 'axios';
import React, { FunctionComponent } from 'react';
import config from '../config.json';
import './LoginPage.css';

interface LoginPageProps {

}

let userRef: React.RefObject<HTMLInputElement>
let passwordRef: React.RefObject<HTMLInputElement>

const LoginPage: FunctionComponent<LoginPageProps> = (props) => {
    document.title = 'Login — Sokka';
    userRef = React.createRef();
    passwordRef = React.createRef();
    return (<div className="login" >
        <h1>Please log in to access the ACP</h1>
        <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" ref={userRef} /><br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" ref={passwordRef} /><br />
            <input type="button" value="Submit" onClick={(event) => login(event)} />
        </form>
    </div>);
}

function login(event: React.MouseEvent): void {
    console.log('start login');
    if (userRef.current != null && passwordRef.current != null) {
        let username = userRef.current.value;
        let password = passwordRef.current.value;
        Axios.post(`${config.api.url}/acp/login`, {
            username,
            password
        }).then((response) => {
            console.log(response);
        }).catch((err) => console.error(err));
    }
}

export default LoginPage;