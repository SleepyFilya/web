import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Navibar from "./components/Navibar";
import { Footer } from "./components/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Catalog } from "./pages/Catalog";
import { Basket } from "./pages/Basket";

import { CookiesProvider } from 'react-cookie';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* Orders-массив для корзины */
      orders: [],
      products: [],
      isLoaded: false,
      error: 0
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.handleSortAndFilter = this.handleSortAndFilter.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  render() {

    return (
      <>
        <Router>
          <CookiesProvider>
            <Navibar orders={this.state.orders} onDelete={this.deleteOrder} />
          </CookiesProvider>
          <Routes>
            <Route exact path="/"
              element={<Catalog
                products={this.state.products}
                isLoaded={this.state.isLoaded}
                error={this.state.error}
                onAdd={this.addToOrder}
                handleLoad={this.handleLoad}
                handleSortAndFilter={this.handleSortAndFilter} />} />
            <Route path="/Basket" element={<Basket
                orders={this.state.orders}
                onDelete={this.deleteOrder}
                isLoaded={this.state.isLoaded}
                error={this.state.error}
                onAdd={this.addToOrder} />} />
          </Routes>
        </Router>

        <Footer />
      </>
    );
  }

  handleLoad() {
    this.load("http://localhost:8080/products");
  }

  handleSortAndFilter(keyword, sort) {
    let request = "http://localhost:8080/products?keyword=" + keyword + "&sort=" + sort;
    this.load(request);
  }

  load(request) {
    fetch(request)
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

  load_basket(param){
    fetch(param)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            orders: result.orders
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

  deleteOrder(id) {
    let param = "http://localhost:8080/remove_from_basket?product_id=" + id;
    this.load_basket(param);
  }

  addToOrder(product) {
    var param = "http://localhost:8080/change_basket?product_id=" + product.id + "&action=1";
    this.load_basket(param);

    /* let isInArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === product.id) isInArray = true;
    });
    if (!isInArray) this.setState({ orders: [...this.state.orders, product] }); */
  }
}

export default App;
