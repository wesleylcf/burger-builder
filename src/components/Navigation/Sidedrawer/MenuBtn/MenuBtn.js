import React from 'react'
import menuBtn from "./menuBtn.module.css"

const MenuBtn = (props) => {
    return(
        <div className={menuBtn.MenuBtn} onClick={props.click}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}


export default MenuBtn