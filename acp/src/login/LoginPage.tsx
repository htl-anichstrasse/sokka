import React, { FunctionComponent } from 'react';
import { Spinner } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import logo from '../images/logo.png';
import { animateCSS, sendRequest } from '../Util';
import './LoginPage.css';

interface LoginPageProps {

}

let loginRef: React.RefObject<HTMLDivElement> = React.createRef();

const LoginPage: FunctionComponent<LoginPageProps> = (props) => {
    document.title = 'Login | Sokka ACP';
    let [loggingIn, setLoggingIn] = React.useState(false);
    let userRef: React.RefObject<HTMLInputElement> = React.createRef();
    let passwordRef: React.RefObject<HTMLInputElement> = React.createRef();

    const login = () => {
        if (userRef.current != null && passwordRef.current != null) {
            let usernameElement = userRef.current;
            let passwordElement = passwordRef.current;
            let name = usernameElement.value;
            let password = passwordElement.value;
            if (name.length === 0 || password.length === 0) {
                logInFail(loginRef.current);
                return;
            }
            setLoggingIn(true);
            sendRequest('/acp/login', 'POST', false, {
                name,
                password
            }).then((response) => {
                if (!response.data.success) {
                    setLoggingIn(false);
                    logInFail(loginRef.current);
                    return;
                }
                new Cookies().set('sokka_username', response.data.name);
                new Cookies().set('sokka_token', response.data.token);
                window.location.reload();
            }).catch();
        }
    }

    const logInFail = (element: HTMLDivElement | null) => {
        if (element && element !== null) {
            animateCSS(element, 'shakeX');
        }
    }

    const onKeyUp = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            login();
        }
    }

    return (<div className="login">
        <div className="container" ref={loginRef}>
            <div className="branding-container">
                {
                    loggingIn ?
                        <Spinner id="logo-spinner" animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner> : <img id="logo" src={logo} alt="Sokka Logo" />
                }
            </div>
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

export default LoginPage;