import React, { FunctionComponent } from 'react';

interface HomePageProps {

}

const HomePage: FunctionComponent<HomePageProps> = (props) => {
    return (<div className="app" >
        <h1>Welcome to the Sokka ACP!</h1>
    </div>);
}

export default HomePage;