import React, { Component, Fragment } from "react";
import classes from "./contactData.module.css";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/form/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../store/actions/index";
class ContactData extends Component {
  state = {
    submit: false,
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
          isString: true,
        },
        valid: false,
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Address",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Postal Code",
        },
        value: "",
        validation: {
          required: true,
          minChars: 6,
          isNum: true,
        },
        valid: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      contactNumber: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Contact Number",
        },
        value: "",
        validation: {
          required: true,
          isNum: true,
          minChars: 8,
        },
        valid: false,
      },
      deliveryType: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "faster", displayValue: "Faster delivery" },
            { value: "express", displayValue: "Normal delivery" },
          ],
        },
        value: "faster",
        validation: {},
        valid: true,
      },
    },
  };

  orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    };
    this.props.onOrderBurger(order);
  };

  isValid = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minChars) {
      isValid = value.length >= rules.minChars && isValid;
    }
    if (rules.isString) {
      isValid = !/\d/.test(value) && isValid;
    }
    if (rules.isNum) {
      isValid = /^\d+$/.test(value) && isValid;
    }
    return isValid;
  };

  inputHandler = (e, key) => {
    const value = e.target.value;
    const targetInputCopy = { ...this.state.orderForm[key] };
    targetInputCopy.value = value;
    targetInputCopy.touched = true;
    const formCopy = { ...this.state.orderForm };
    targetInputCopy.valid = this.isValid(
      targetInputCopy.value,
      targetInputCopy.validation
    );
    formCopy[key] = targetInputCopy;
    this.setState({
      orderForm: formCopy,
    });
    let allInputsValid = true;
    for (let key in formCopy) {
      allInputsValid = formCopy[key].valid && allInputsValid;
    }
    this.setState({
      submit: allInputsValid,
    });
  };

  render() {
    const inputArray = [];
    for (let key in this.state.orderForm) {
      inputArray.push({ config: this.state.orderForm[key], key: key });
    }
    let form = (
      <Fragment>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.orderHandler}>
          {inputArray.map((input) => {
            return (
              <Input
                key={input.key}
                elementtype={input.config.elementType}
                elementconfig={input.config.elementConfig}
                value={input.config.value}
                inputHandler={(e) => this.inputHandler(e, input.key)}
                valid={input.config.valid}
                shouldValidate={input.config.validation}
                touched={input.config.touched}
              />
            );
          })}
          <Button buttonType="Success" disabled={!this.state.submit}>
            ORDER
          </Button>
        </form>
      </Fragment>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) =>
      dispatch(orderActions.purchaseBurger(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
