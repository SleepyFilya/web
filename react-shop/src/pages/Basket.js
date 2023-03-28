

import React, { Component } from "react";
import ProductsInTheBasket from "../components/ProductsInTheBasket";


export class Basket extends Component {
  
  render() {
    return (
      <div className="wrapper">
        <h2>Корзина</h2>
        <ProductsInTheBasket orders={this.props.orders} onDelete={this.props.onDelete} />      
      </div>
      
    );
  }


}

export default Basket;
