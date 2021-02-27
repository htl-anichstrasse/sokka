import React, { FunctionComponent, useState } from 'react';
import { Card } from 'react-bootstrap';
import ReactPasswordStrength from 'react-password-strength';
import { sendRequest } from '../../Util';

interface CreateUserComponentProps {

}

let userRef: React.RefObject<HTMLInputElement>
let passwordRef: any;
let loaded: number, setLoaded: React.Dispatch<React.SetStateAction<number>>;

const CreateUserComponent: FunctionComponent<CreateUserComponentProps> = (props) => {
    userRef = React.createRef();
    passwordRef = React.createRef();
    [loaded, setLoaded] = useState(0);

    return (<Card className="mb-4">
        <Card.Body>
            <Card.Title>Create a new ACP user</Card.Title>
            <Card.Subtitle className="mb-2">Enable a new access to the ACP</Card.Subtitle>
            <Card.Text>
                <form>
                    <div className="form-group mb-2">
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input ref={userRef} type="text" className="form-control" id="username" placeholder="Username" onKeyUp={(event) => onKeyUp(event)} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <ReactPasswordStrength
                            minLength={5}
                            minScore={2}
                            ref={passwordRef}
                            scoreWords={['too weak', 'weak', 'okay', 'strong', 'perfect']}
                            changeCallback={changeCallback}
                            inputProps={{ name: "password", placeholder: "Password", autoComplete: "off", id: "password", className: "form-control", onKeyUp: ((event: React.KeyboardEvent) => onKeyUp(event)) }}
                        />
                    </div>
                    {loaded === 0 ?
                        <input className="btn btn-secondary create-user-btn" type="button" value="Create" onClick={() => createUser()} />
                        : <button className="btn btn-secondary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>}
                </form>
            </Card.Text>
        </Card.Body>
    </Card>);
}

function changeCallback(event: { score: number, isValid: boolean, password: string }) {
    console.log(event);
}

function onKeyUp(event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
        createUser();
    }
}

function createUser(): void {
    if (userRef.current != null && passwordRef.current != null) {
        let userElement = userRef.current;
        let passwordElement = passwordRef.current.reactPasswordStrengthInput;
        if (userElement.value.length === 0 || passwordElement.value.length === 0) {
            alert("Please enter a username and a password!");
            return;
        }
        if (passwordElement.value.length < 5) {
            alert("This passwort is too short!");
            return;
        }
        setLoaded(1);
        sendRequest('/acp/acpuser/create', 'POST', true, {
            name: userElement.value,
            password: passwordElement.value
        }).then(() => {
            window.location.reload()
        }).catch();
    }
}

export default CreateUserComponent;