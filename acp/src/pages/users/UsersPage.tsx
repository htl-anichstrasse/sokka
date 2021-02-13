import React, { FunctionComponent } from 'react';
import ListUserComponent from './ListUserComponent';

interface UsersPageProps {

}

const UsersPage: FunctionComponent<UsersPageProps> = (props) => {
    document.title = 'Users | Sokka ACP';
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa fa-users mr-2" aria-hidden="true"></i>Users</h1>
                    <p>You can manage Sokka users and manually remove them from the database here.</p>
                    <ListUserComponent />
                </div>
            </div>
        </div>
    </div>);
}

export default UsersPage;