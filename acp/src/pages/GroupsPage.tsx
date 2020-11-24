import React, { FunctionComponent } from 'react';

interface GroupsPageProps {

}

const GroupsPage: FunctionComponent<GroupsPageProps> = (props) => {
    document.title = 'Groups | Sokka ACP';
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa fa-star mr-2" aria-hidden="true"></i>Groups</h1>
                    <p>There will be groups here one day.</p>
                </div>
            </div>
        </div>
    </div>);
}

export default GroupsPage;