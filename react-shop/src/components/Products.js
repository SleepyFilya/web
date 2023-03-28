import React, { Component } from 'react'
import "./Products.css";
import Product from './Product';

export class Products extends Component {
  render() {
    return (
      <main>
       {this.props.products.map(el =>(
        <Product key={el.id} product={el} onAdd={this.props.onAdd}/>
            
        ))}
        
      </main>
    );
  }
}
export default Products;
