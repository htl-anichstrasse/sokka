import React, { FunctionComponent } from 'react';

interface Test1PageProps {

}

const Test1Page: FunctionComponent<Test1PageProps> = (props) => {
    return (<div className="app" >
        <h1>Test1</h1>
    </div>);
}

export default Test1Page;