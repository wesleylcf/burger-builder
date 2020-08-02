import React,{Fragment, Component} from 'react'
import modal from './modal.module.css'
import Backdrop from "../Backdrop/Backdrop"


class Modal extends Component {
    shouldComponentUpdate (nextProps,nextState) {
        return this.props.show!==nextProps.show || this.props.isCheckedOut!==nextProps.isCheckedOut
    }
    componentDidUpdate () {
        console.log("[Modal] Updated!")
    }
    render() {
        return(
            <Fragment>
                <Backdrop show={this.props.show} click={this.props.hideModal}></Backdrop>
                <div 
                className={modal.Modal} 
                style={{transform: this.props.show? 'translateY(0)' : "translateY(-100vh)", 
                opacity: this.props.show ? "1" : "0"}}>
                    {this.props.children}
                </div>
            </Fragment>
                
            )
    }
}
export default Modal