

import React, { Component } from "react";
import ProductsInTheBasket from "../components/ProductsInTheBasket";


export class Basket extends Component {
  
  render() {
    return (
      <div className="wrapper" style={{marginBottom: '200px'}}>
        <h2>Корзина</h2>
        <ProductsInTheBasket 
                orders={this.props.orders} 
                onDelete={this.props.onDelete} 
                isLoadedBasket={this.props.isLoadedBasket}
                error={this.props.error}
                onAdd={this.props.addToOrder}
                handleLoadBasket={this.props.handleLoadBasket} 
                createOrder={this.props.createOrder}/>      
      </div>
      
    );
  }


}

export default Basket;
