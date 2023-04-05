import React, { Component } from 'react'
import Order from "./Order";
import { FaRubleSign } from "react-icons/fa";

const showOrders = (props) => {
  let summa = 0;
  props.orders.forEach((el) => (summa += Number.parseFloat(el.price)));
  return (
    <div>
      {props.orders.map((el) => (
        <Order onDelete={props.onDelete} key={el.id} product={el} />
      ))}

      <div className="col-3 border border-secondary rounded d-grid gap-2 summa-el ">
        <h2>К покупке</h2>
        <div class="total-price">
          Итого: <span id="total-price">{new Intl.NumberFormat().format(summa)}
            <FaRubleSign /></span>
        </div>
        <button type="button" class="btn btn-dark mb-2" id="createOrder">
          Оформить покупку
        </button>
      </div>
    </div>
  );
};

const showNothing = () => {
  return (
    <div className="empty">
      <h2>Товаров нет</h2>
    </div>
  );
};



export class ProductsInTheBasket extends Component {

  componentDidMount() {
    this.props.handleLoadBasket();
  }
  render() {
    const error = this.props.error;
    const isLoaded = this.props.isLoadedBasket;
    const orders = this.props.orders;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

         <main>
          

          {orders.map(el => (

            <Order onDelete={this.props.onDelete} key={el.id} order={el}/>
            

          ))}

        </main>
       
      );
    }
  }
}

export default ProductsInTheBasket;
