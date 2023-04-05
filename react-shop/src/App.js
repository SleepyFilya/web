import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Navibar from "./components/Navibar";
import { Footer } from "./components/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Catalog } from "./pages/Catalog";
import { Basket } from "./pages/Basket";

import { CookiesProvider } from 'react-cookie';


import { useCookies } from 'react-cookie';
import Cookies from "js-cookie";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* Orders-массив для корзины */
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
    this.addCounter = this.addCounter.bind(this)
    
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
              createOrder={this.createOrder} />} />
          </Routes>
        </Router>

        <Footer />
      </>
    );
  }


  /* counter(goodsCounter) {
    let count = document.getElementById('counter');
      console.log(goodsCounter)
      count.textContent = goodsCounter

    
  } */

  handleLoad() {
    this.load("http://localhost:8080/products");
    /* this.addCounter(this.state.goodsCounter); */
    /* this.counter(); */
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
          //orders: result.products,
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
   
    
    this.addCounter(this.state.goodsCounter);

  }

  
  addCounter(props){
  let insertCounter = document.getElementById('counter');
  insertCounter.textContent = props
  
  }


  createOrder(){
  /*   
const [cookies, getCookie] = useCookies(); */
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
}

export default App;
