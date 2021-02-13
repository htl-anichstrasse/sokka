import React, { FunctionComponent, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { sendRequest } from '../../Util';

interface ListACPUserComponentProps {

}

let loaded: number, setLoaded: React.Dispatch<React.SetStateAction<number>>;
let users: JSX.Element[];

const ListACPUserComponent: FunctionComponent<ListACPUserComponentProps> = (props) => {
    [loaded, setLoaded] = useState(1);
    if (loaded === 0) {
        return (<div className="box">
            <h3>Manage ACP users</h3>
            <p className="text-muted">List and delete existing ACP users</p>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users}
                </tbody>
            </table>
        </div>);
    } else {
        load();
        return (<div className="box">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>)
    }
}

function load(): void {
    sendRequest('/acp/acpuser/get', 'GET', true, {}).then((response) => {
        let tableRows = [];
        let loggedInUser = new Cookies().get('sokka_username');
        for (let id in response.data.users) {
            let username = response.data.users[id].username;
            let isCurrentUser = loggedInUser === username;
            tableRows.push(<tr key={id}>
                <th scope="row">{id}</th>
                <th>{username}</th>
                <th><button type="button" className="btn btn-danger" disabled={isCurrentUser} onClick={() => onDeleteClicked(username)}><i className="fa fa-trash"></i></button></th>
            </tr>);
        }
        users = tableRows;
        setLoaded(0);
    });
}

function onDeleteClicked(name: string): void {
    let loggedInUser = new Cookies().get('sokka_username');
    if (loggedInUser === name) {
        // Trying to delete your own user?
        alert('Are you really trying to sabotage yourself like that?');
        return;
    }
    sendRequest('/acp/acpuser/delete', 'POST', true, { name }).then((response) => {
        if (response) {
            window.location.reload();
        } else {
            alert('Failed to delete user');
        }
    }).catch();
}

export default ListACPUserComponent;