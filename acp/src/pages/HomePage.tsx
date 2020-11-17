import React, { FunctionComponent } from 'react';

interface HomePageProps {

}

const HomePage: FunctionComponent<HomePageProps> = (props) => {
    return (<div className="app">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><i className="fa fa-home mr-2" aria-hidden="true"></i>Home</h1>
                    <p>Welcome to the Sokka ACP! Great explanations for usage of this admin panel coming real soon!</p>
                </div>
            </div>
        </div>
    </div>);
}

export default HomePage;