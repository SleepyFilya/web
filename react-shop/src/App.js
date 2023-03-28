import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Navibar from "./components/Navibar";
import { Footer } from "./components/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Catalog } from "./pages/Catalog";
import { Basket } from "./pages/Basket";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        /* Orders-массив для корзины */
      orders: [],
      products: [
        {
          id: 1,
          title: "Корзина для рыбы",
          img: "рыба_8.jpg",
          description: "Изделие из ивового прута",
          price: "2000.00",
        },
        {
          id: 2,
          title: "Корзина для грибов",
          img: "грибы_1.jpg",
          description: "Изделие из ивового прута",
          price: "1500.00",
        },
        {
          id: 3,
          title: "Корзина для рыбы",
          img: "рыба_9.jpg",
          description: "Изделие из ивового прута",
          price: "1600.00",
        },
        {
          id: 4,
          title: "Корзина для пикника",
          img: "пикник_3.jpg",
          description: "Изделие из ивового прута",
          price: "2500.00",
        },
        {
          id: 5,
          title: "Дровница",
          img: "дровница.jpg",
          description: "Изделие из ивового прута",
          price: "3000.00",
        },
        {
          id: 6,
          title: "Фруктовница",
          img: "фруктовница.jpg",
          description: "Изделие из ивового прута",
          price: "700.00",
        },
        {
          id: 7,
          title: "Короб для выпечки",
          img: "хлеб.jpg",
          description: "Изделие из ивового прута",
          price: "2100.00",
        },
      ],
    };
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    
  }
  render() {
    return (
      <>
        <Router>
          <Navibar orders={this.state.orders} onDelete={this.deleteOrder}/>

          <Routes>
            <Route exact path="/" element={<Catalog products={this.state.products} onAdd={this.addToOrder} />} />
            <Route path="/Basket" element={<Basket  orders={this.state.orders} onDelete={this.deleteOrder}/>} />
          </Routes>
        </Router>

        <Footer />
      </>
    );
  }

  deleteOrder(id){
    this.setState({orders:this.state.orders.filter(el=>el.id!==id)})
   }


  addToOrder(product) {
    let isInArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === product.id) isInArray = true;
    });
    if (!isInArray) this.setState({ orders: [...this.state.orders, product] });
  }
}

export default App;
