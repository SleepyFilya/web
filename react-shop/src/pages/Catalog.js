import Find from "../components/Find";
import Products from "../components/Products";

import React, { Component } from "react";


export class Catalog extends Component {

  render() {
    return (
      <div className="wrapper">
        <Find handleSortAndFilter={(keyword, sort) => this.props.handleSortAndFilter(keyword, sort)} />
        <Products
          products={this.props.products}
          isLoaded={this.props.isLoaded}
          error={this.props.error}
          onAdd={this.props.onAdd}
          addCounter={this.props.addCounter} 
          handleLoad={this.props.handleLoad}
          goodsCounter={this.props.goodsCounter} />
      </div>
    );
  }
}

export default Catalog;
