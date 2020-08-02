import React, { Component } from "react";
import Order from "../../components/Order/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    // axios
    //   .get("orders.json")
    //   .then((res) => {
    //     const fetched = [];
    //     for (let key in res.data) {
    //       fetched.push({ ...res.data[key], id: key });
    //     }
    //     console.log("fetched");
    //     console.log(fetched);
    //     return fetched;
    //   })
    //   .then((fetched) => {
    //     this.setState({
    //       orders: fetched,
    //       loading: false,
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       loading: false,
    //     });
    //     console.log(error);
    //   });
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <div>
        {this.state.orders.map((order, index) => (
          <Order
            ingredients={order.ingredients}
            price={order.price}
            key={index}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
