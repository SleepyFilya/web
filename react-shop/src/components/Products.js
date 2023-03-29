import React, { Component } from 'react'
import "./Products.css";
import Product from './Product';



export class Products extends Component {


  componentDidMount() {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            products: result.products
            
          });
        },
        
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
  render() {
    const error= this.state.error;
    const orders = this.state.orders;
    const isLoaded = this.state.isLoaded;
    const products = this.state.products;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {


    return (
      <main>
       {products.map(el =>(
        <Product key={el.id} product={el} onAdd={this.props.onAdd}/>
            
        ))}
        
      </main>
    );
  }}
}
export default Products;
