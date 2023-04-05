import React, { Component } from "react";
import {FaRubleSign } from "react-icons/fa";

export class Product extends Component {
  render() {
    return (
      <div className="item">
        <img src={"./img/" + this.props.product.imageLink} alt="img" />
        <h2>{this.props.product.title}</h2>
        <p>{this.props.product.description}</p>
        <b>{this.props.product.price}<FaRubleSign/></b>
        <div className="add-to-cart" onClick={() => {this.props.onAdd(this.props.product)}}>+</div>
      </div>
    );
  }
}

export default Product;
