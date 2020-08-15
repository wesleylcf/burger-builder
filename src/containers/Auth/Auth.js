import React, { Component } from "react";
import Input from "../../components/UI/form/Input/Input";
import Button from "../../components/UI/Button/Button";
import auth from "./auth.module.css";
import * as authActions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

export class Auth extends Component {
  state = {
    isSigningUp: true,
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        validation: {
          required: true,
          minChars: 6,
        },
        valid: false,
        touched: false,
      },
    },
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
    if (rules.isEmail) {
      isValid =
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) && isValid;
    }
    return isValid;
  };

  inputHandler = (e, key) => {
    const value = e.target.value;
    const targetInputCopy = { ...this.state.controls[key] };
    targetInputCopy.value = value;
    targetInputCopy.touched = true;
    const formCopy = { ...this.state.controls };
    targetInputCopy.valid = this.isValid(
      targetInputCopy.value,
      targetInputCopy.validation
    );
    formCopy[key] = targetInputCopy;
    this.setState({
      controls: formCopy,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSigningUp
    );
  };

  changeSubmitHandler = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return { isSigningUp: !prevState.isSigningUp };
    });
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.redirectPath !== "/") {
      this.props.onResetRedirectPath();
    }
  }

  render() {
    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({ config: this.state.controls[key], key: key });
    }
    let error = null;
    let form = formElements.map((formElement) => {
      return (
        <Input
          key={formElement.key}
          elementtype={formElement.config.elementType}
          elementconfig={formElement.config.elementConfig}
          value={formElement.config.value}
          inputHandler={(e) => this.inputHandler(e, formElement.key)}
          valid={formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
        />
      );
    });
    if (this.props.loading) {
      form = <Spinner />;
    }
    if (this.props.error) {
      error = <h1>{this.props.error.message}</h1>;
    }

    return (
      <div className={auth.Auth}>
        {this.props.isAuth ? <Redirect to={this.props.redirectPath} /> : null}
        {error}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button buttonType="Success">
            {this.state.isSigningUp ? "SIGN UP" : "LOGIN"}
          </Button>
        </form>
        <Button buttonType="Danger" clicked={this.changeSubmitHandler}>
          SWITCH TO {this.state.isSigningUp ? "LOGIN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    redirectPath: state.auth.redirectPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSigningUp) =>
      dispatch(authActions.auth(email, password, isSigningUp)),
    onResetRedirectPath: () => dispatch(authActions.setRedirectPath()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
