import React, {Fragment, Component} from 'react';
import Button from "../../UI/Button/Button"

// This can be a function component, changed it just to observe that it updates when we change ingredients' count, while we only want to update it when modal is displayed.
class OrderSummary extends Component {
    componentDidUpdate () {
        console.log("[orderSummary] updated!")
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((ig,index)=>{
            return <li key={ig + index}> <span style={{textTransform: "capitalize"}}>{ig}</span> : {this.props.ingredients[ig]}</li>
            })
        return(
            <Fragment>
                <h3>Your order:</h3>
                <p>A mouth-watering burger with the following ingredients...</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Proceed to checkout?</p>
                <Button buttonType="Danger" clicked={this.props.cancel}>CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.continue}>CONTINUE</Button>
            </Fragment>
        ) 
    }
} 
export default OrderSummary