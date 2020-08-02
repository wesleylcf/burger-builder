import React, {Fragment, Component} from 'react';
import Modal from "../../components/UI/Modal/Modal";



const withErrorHandler = (WrappedComponent,axios) => {
    return ( class extends Component {
        state={
            error: null
        }
        errorConfirmedHandler = () => {
            this.setState({
                error:null
            })
        }
        constructor () {
            super()
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({
                    error:null
                })
                return req
            },error=>{
                this.setState({
                    error:error
                })
                return Promise.reject(error)
            })
            this.resInterceptor = axios.interceptors.response.use(response=>{
                this.setState({error:null})
                return response
            },error=>{
                this.setState({
                    error: error
                })
                return Promise.reject(error)
            })
        }
        componentWillUnmount () {
            // console.log("Unmounted!",this.resInterceptor,this.reqInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }
        render() {
            return(
                <Fragment>
                    <Modal show={this.state.error} hideModal={this.errorConfirmedHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
            )
        }
    })
}


export default withErrorHandler