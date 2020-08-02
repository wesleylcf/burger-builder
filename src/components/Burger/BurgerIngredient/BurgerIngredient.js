import React, {Component} from 'react';
import burger from "./burgerIngredient.module.css";
import PropTypes from "prop-types";

class BurgerIngredient extends Component {
    render() {
        let ingredient=null
        switch (this.props.type) {
        case ('bread-bottom'):
            ingredient=<div className={burger.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingredient=(
                <div className={burger.BreadTop}>
                    <div className={burger.Seeds1}></div>
                    <div className={burger.Seeds2}></div>
                </div>       
            );
            break;
        case ('meat'):
            ingredient = <div className={burger.Meat}></div>;
            break;
        case ('cheese'):
            ingredient = <div className={burger.Cheese}></div>;
            break;
        case ('salad'):
            ingredient = <div className={burger.Salad}></div>;
            break;
        case ('bacon'):
            ingredient = <div className={burger.Bacon}></div>;
            break;
        default:
            ingredient=null

        }
        return ingredient
    }
}

BurgerIngredient.propType = {
    type:PropTypes.string.isRequired
}

export default BurgerIngredient