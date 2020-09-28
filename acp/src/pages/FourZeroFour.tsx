import React, { FunctionComponent } from 'react';
import sokkasad from '../images/sokkasad.svg';

interface FourZeroFourProps {

}

const FourZeroFour: FunctionComponent<FourZeroFourProps> = (props) => {
    return (<div className="app fourzerofour">
        <div className="sokkasad">
            <img src={sokkasad} alt="Sokka Logo sad"/>
        </div>
        <h1>Big oof</h1>
        <p className="text-muted">Seems like you have reached a dead end. Sorry!</p>
        <a href="/" className="btn btn-secondary">Back to home</a>
    </div >);
}

export default FourZeroFour;