import React, { FunctionComponent, useState } from 'react';
import { sendRequest } from '../../Util';

interface CreateUserComponentProps {

}

let userRef: React.RefObject<HTMLInputElement>
let passwordRef: React.RefObject<HTMLInputElement>
let loaded: number, setLoaded: React.Dispatch<React.SetStateAction<number>>;

const CreateUserComponent: FunctionComponent<CreateUserComponentProps> = (props) => {
    userRef = React.createRef();
    passwordRef = React.createRef();
    [loaded, setLoaded] = useState(0);
    return (<div className="box">
        <h3>Create a new ACP user</h3>
        <p className="text-muted">Enable a new access to the ACP</p>
        <form>
            <div className="form-group mb-2">
                <label htmlFor="username" className="sr-only">Username</label>
                <input ref={userRef} type="text" className="form-control" id="username" placeholder="Username" onKeyUp={(event) => onKeyUp(event)} />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="password" className="sr-only">Password</label>
                <input ref={passwordRef} type="password" className="form-control" id="password" placeholder="Password" onKeyUp={(event) => onKeyUp(event)} />
            </div>
            {loaded === 0 ?
                <input className="btn btn-secondary create-user-btn" type="button" value="Create" onClick={() => createUser()} />
                : <button className="btn btn-secondary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>}
        </form>
    </div>);
}

function onKeyUp(event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
        createUser();
    }
}

function createUser(): void {
    if (userRef.current != null && passwordRef.current != null) {
        let userElement = userRef.current;
        let passwordElement = passwordRef.current;
        if (userElement.value.length === 0 || passwordElement.value.length === 0) {
            alert("Please enter a username and a password!");
            return;
        }
        setLoaded(1);
        sendRequest('/acp/signup', 'POST', true, {
            username: userElement.value,
            password: passwordElement.value
        }).then(() => {
            window.location.reload()
        });
    }
}

export default CreateUserComponent;