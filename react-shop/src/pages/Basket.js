

import React, { Component } from "react";
import ProductsInTheBasket from "../components/ProductsInTheBasket";


export class Basket extends Component {
  
  render() {
    return (
      <div className="wrapper">
        <h2>Корзина</h2>
        <ProductsInTheBasket 
                orders={this.props.orders} 
                onDelete={this.props.onDelete} 
                isLoadedBasket={this.props.isLoadedBasket}
                error={this.props.error}
                onAdd={this.props.addToOrder}
                handleLoadBasket={this.props.handleLoadBasket} />      
      </div>
      
    );
  }


}

export default Basket;
