import React, { FunctionComponent } from 'react';

interface UsersPageProps {

}

const UsersPage: FunctionComponent<UsersPageProps> = (props) => {
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa fa-users mr-2" aria-hidden="true"></i>Users</h1>
                    <p>There will be users here one day.</p>
                </div>
            </div>
        </div>
    </div>);
}

export default UsersPage;