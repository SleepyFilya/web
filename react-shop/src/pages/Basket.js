

import React, { Component } from "react";
import ProductsInTheBasket from "../components/ProductsInTheBasket";


export class Basket extends Component {
  
  render() {
    return (
      <div className="wrapper">
        <h2>Корзина</h2>
        <ProductsInTheBasket 
                orders={this.state.orders} 
                onDelete={this.deleteOrder} 
                isLoaded={this.state.isLoaded}
                error={this.state.error}
                onAdd={this.addToOrder} />      
      </div>
      
    );
  }


}

export default Basket;
