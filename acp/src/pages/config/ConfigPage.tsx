import React, { FunctionComponent } from 'react';
import './ConfigPage.css';
import CreateUserComponent from './CreateUserComponent';
import ListUserComponent from './ListUserComponent';

interface ConfigPageProps {

}

const ConfigPage: FunctionComponent<ConfigPageProps> = (props) => {
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Config Page</h1>
                    <p>There will be config values here one day.</p>
                </div>
                <div className="col">
                    <CreateUserComponent />
                    <ListUserComponent />
                </div>
            </div>
        </div>
    </div>);
}

export default ConfigPage;