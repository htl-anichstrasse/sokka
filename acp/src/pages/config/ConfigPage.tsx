import React, { FunctionComponent } from 'react';
import './ConfigPage.css';
import CreateUserComponent from './CreateUserComponent';
import ListACPUserComponent from './ListACPUserComponent';

interface ConfigPageProps {

}

const ConfigPage: FunctionComponent<ConfigPageProps> = (props) => {
    document.title = 'Config | Sokka ACP';
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa fa-cog mr-2" aria-hidden="true"></i>Config</h1>
                    <p>There will be config values here one day.</p>
                </div>
                <div className="col">
                    <CreateUserComponent />
                    <ListACPUserComponent />
                </div>
            </div>
        </div>
    </div>);
}

export default ConfigPage;