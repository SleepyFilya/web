import Find from "../components/Find";
import Products from "../components/Products";

import React, { Component } from "react";


export class Catalog extends Component {
  
  render() {
    return (
      <div className="wrapper">
        <Find />
        {/* Передача массива в компонент */}
        <Products products={this.props.products} onAdd={this.props.onAdd}/>
        
      </div>
    );
  }


  
}

export default Catalog;
