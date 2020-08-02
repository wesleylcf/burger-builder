import React from 'react'
import backdrop from "./backdrop.module.css"

const Backdrop = (props) => {
    return(
        props.show ? <div className={backdrop.Backdrop} onClick={props.click}></div> : null
    )
}

export default Backdrop