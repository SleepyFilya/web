import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Navibar from "./components/Navibar";
import { Footer } from "./components/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Catalog } from "./pages/Catalog";
import { Basket } from "./pages/Basket";

import { CookiesProvider } from 'react-cookie';

import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      products: [],
      isLoaded: false,
      isLoadedBasket: false,
      error: 0,
      goodsCounter: []
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.handleSortAndFilter = this.handleSortAndFilter.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleLoadBasket = this.handleLoadBasket.bind(this);
    this.addCounter = this.addCounter.bind(this);
    this.lowerCounter = this.lowerCounter.bind(this);
    this.upperCounter = this.upperCounter.bind(this);
    this.checkAndDisable = this.checkAndDisable.bind(this);

  }

  render() {

    return (
      <>
        <Router>
          <CookiesProvider>
            <Navibar orders={this.state.orders} onDelete={this.deleteOrder} goodsCounter={this.state.goodsCounter} />
          </CookiesProvider>
          <Routes>
            <Route exact path="/"
              element={<Catalog
                products={this.state.products}
                isLoaded={this.state.isLoaded}
                error={this.state.error}
                onAdd={this.addToOrder}
                handleLoad={this.handleLoad}
                handleSortAndFilter={this.handleSortAndFilter}
                goodsCounter={this.state.goodsCounter}
                addCounter={this.addCounter} />} />
            <Route path="/Basket" element={<Basket
              orders={this.state.orders}
              onDelete={this.deleteOrder}
              isLoadedBasket={this.state.isLoadedBasket}
              error={this.state.error}
              onAdd={this.addToOrder}
              handleLoadBasket={this.handleLoadBasket}
              checkAndDisable={this.checkAndDisable}
              createOrder={this.createOrder}
              lowerCounter={this.lowerCounter}
              upperCounter={this.upperCounter} />} />
          </Routes>
        </Router>

        <Footer />
      </>
    );
  }


  handleLoad() {
    this.load("http://localhost:8080/products");

  }
  handleLoadBasket() {
    this.load_basket("http://localhost:8080/basket")

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
            products: result.products,
            goodsCounter: result.goodsCounter
          });
          this.addCounter(this.state.goodsCounter);

        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  load_basket(param) {
    fetch(param)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoadedBasket: true,
            orders: result.products,
            goodsCounter: result.goodsCounter
          });
          this.addCounter(result.goodsCounter)
          this.checkAndDisable()

        },

        (error) => {
          this.setState({
            isLoadedBasket: true,
            error
          });
        }
      )
  }

  deleteOrder(id) {
    let param = "http://localhost:8080/remove_from_basket?product_id=" + id;
    fetch(param)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoadedBasket: true,
            orders: result.products,
            goodsCounter: result.goodsCounter
          });
          this.addCounter(result.goodsCounter)

        },
        (error) => {
          this.setState({
            isLoadedBasket: true,
            error
          });
        }
      )


  }

  addToOrder(product) {
    var param = "http://localhost:8080/change_basket?product_id=" + product.id + "&action=1";

    fetch(param)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoadedBasket: true,
            goodsCounter: result.goodsCounter
          });
          this.addCounter(result.goodsCounter)
          /* this.animation(that); */

        },
        (error) => {
          this.setState({
            isLoadedBasket: true,
            error
          });
        }
      )


    this.addCounter(this.state.goodsCounter);

  }

  addCounter(props) {
    let insertCounter = document.getElementById('counter');
    insertCounter.textContent = props

  }


  createOrder() {
    var param = "http://localhost:8080/create_order?local=" + document.cookie.slice(6);

    fetch(param)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoadedBasket: true,
            orders: result.products,
            goodsCounter: result.goodsCounter
          });
          this.addCounter(result.goodsCounter)

        },
        (error) => {
          this.setState({
            isLoadedBasket: true,
            error
          });
        }
      )
  }

  lowerCounter(product) {

    var param = "http://localhost:8080/change_basket?product_id=" + product.id + "&action=0";
    fetch(param)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoadedBasket: true,
            goodsCounter: result.goodsCounter
          });
          this.addCounter(result.goodsCounter)
          this.checkAndDisable();

        },
        this.checkAndDisable(),
        (error) => {
          this.setState({
            isLoadedBasket: true,
            error
          });
        }
      )

  }
  upperCounter(product) {

    var param = "http://localhost:8080/change_basket?product_id=" + product.id + "&action=1";
    fetch(param)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoadedBasket: true,
            goodsCounter: result.goodsCounter
          });
          this.addCounter(result.goodsCounter)
          this.checkAndDisable()
        },

        (error) => {
          this.setState({
            isLoadedBasket: true,
            error
          });
        }
      )
  }

  checkAndDisable() {

    let btn = document.querySelectorAll('.input-number-minus');
    let input = document.querySelectorAll('.input-number-input');

    for (var i = 0; i < btn.length; i++) {

      $(btn[i]).removeAttr('disabled');
      if ($(input[i]).val() == 0) {
        $(btn[i]).attr('disabled', true);

      }
    }
    this.handleLoadBasket();
  }
}

export default App;
