

import React, { Component } from "react";
import ProductsInTheBasket from "../components/ProductsInTheBasket";


export class Basket extends Component {
  
  render() {
    return (
      <div className="wrapper" style={{marginBottom: '200px'}}>
        <h2 style={{marginLeft:'20px'}} id="h2Basket">Корзина</h2>
        
        <ProductsInTheBasket 
                orders={this.props.orders} 
                onDelete={this.props.onDelete} 
                isLoadedBasket={this.props.isLoadedBasket}
                error={this.props.error}
                onAdd={this.props.addToOrder}
                handleLoadBasket={this.props.handleLoadBasket} 
                checkAndDisable={this.props.checkAndDisable}
                createOrder={this.props.createOrder}
                lowerCounter={this.props.lowerCounter}
              upperCounter={this.props.upperCounter}/>      
      </div>
      
    );
  }


}

export default Basket;
