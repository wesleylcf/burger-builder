import React from 'react';
import buildControl from './buildControl.module.css';


const BuildControl = (props) => {
    return (
        <div className={buildControl.BuildControl}>
            <div className={buildControl.Label}>{props.label}</div>
            <button className={buildControl.Less} onClick={props.remove} disabled={props.disabled}>Less</button>
            <button className={buildControl.More} onClick={props.add}>More</button>
        </div>
    )
    // disabled is a default button html prop that takes a bool

}

export default BuildControl