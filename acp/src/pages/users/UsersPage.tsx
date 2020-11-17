import React, { FunctionComponent } from 'react';
import ListUserComponent from './ListUserComponent';

interface UsersPageProps {

}

const UsersPage: FunctionComponent<UsersPageProps> = (props) => {
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa fa-users mr-2" aria-hidden="true"></i>Users</h1>
                    <ListUserComponent />
                </div>
            </div>
        </div>
    </div>);
}

export default UsersPage;