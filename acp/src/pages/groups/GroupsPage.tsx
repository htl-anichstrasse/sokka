import React, { FunctionComponent } from 'react';
import CreateGroupButton from './CreateGroupButton';
import './GroupsPage.css';
import ListGroupsComponent from './ListGroupsComponent';

interface GroupsPageProps {

}

const GroupsPage: FunctionComponent<GroupsPageProps> = (props) => {
    document.title = 'Groups | Sokka ACP';
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa fa-star mr-2" aria-hidden="true"></i>Groups</h1>
                    <ListGroupsComponent />
                    <CreateGroupButton />
                </div>
            </div>
        </div>
    </div>);
}

export default GroupsPage;