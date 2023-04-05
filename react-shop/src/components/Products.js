import React, { Component } from 'react'
import "./Products.css";
import Product from './Product';

export class Products extends Component {
  componentDidMount() {
    this.props.handleLoad();
  }

  render() {
    const error = this.props.error;
    const isLoaded = this.props.isLoaded;
    const products = this.props.products;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      return (
        <main>

          {products.map(el => (

            <Product key={el.id} product={el} onAdd={this.props.onAdd} goodsCounter={this.props.goodsCounter} addCounter={this.props.addCounter}  />

          ))}

        </main>
      );
    }
  }
}
export default Products;
