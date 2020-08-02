import React from 'react'
import toolbar from "./toolbar.module.css"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import Button from "../../UI/Button/Button"
import MenuBtn from "../Sidedrawer/MenuBtn/MenuBtn"


const Toolbar = (props) => {
    return(
        <header className={toolbar.Toolbar}>
            <MenuBtn click={props.show}/>
            <div className={toolbar.Logo}>
                <Logo />
            </div>
            <nav className={toolbar.Desktoponly}>
                <NavigationItems/>
            </nav>   
        </header>
    )
}

export default Toolbar