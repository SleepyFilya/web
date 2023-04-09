import React, { Component } from 'react'
import Order from "./Order";
import { FaRubleSign } from "react-icons/fa";

/* const showOrders = (summa, props) => {
 
}

const showNothing = () => {
  
} */

export class ProductsInTheBasket extends Component {

  componentDidMount() {
    this.props.handleLoadBasket();
  }
  render() {
    const error = this.props.error;
    const isLoaded = this.props.isLoadedBasket;
    const orders = this.props.orders;

    let summa = 0;
    orders.forEach((el) => (summa += Number.parseFloat(el.price * el.count)));

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>

          {orders.map(el => (

            <Order onDelete={this.props.onDelete} key={el.id} order={el} lowerCounter={this.props.lowerCounter}
              upperCounter={this.props.upperCounter} />

          ))}

          {orders.length > 0 ?
            this.showOrders(summa) : this.showNothing()}


        </main>


      );
    }
  }

  showOrders(summa){
    return (
      <div className="container pt-4" id="basket">
  
        <div className="row gx-5">
          <div className="col-9">
            <div >
  
              <table className="table table-hover table-responsive-xl">
  
                <tbody>
                  <tr >
  
                    <td style={{ textAlign: 'center', fontSize: '50px', paddingLeft: '65px' }}>
                      <h2> К покупке</h2>
  
                    </td>
                    <td>
                      <h2>итого:</h2>
                    </td>
  
                    <td>
                      <h2>{new Intl.NumberFormat().format(summa)}<FaRubleSign /></h2>
  
                    </td>
  
                    <td>
                      <h2><button type="button" className="btn btn-dark mb-2" id="createOrder" style={{ fontSize: '20px' }} onClick={() => { this.props.createOrder() }} >Оформить покупку</button></h2>
  
                    </td>
  
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
  
        </div>
      </div>
    )
  }

  showNothing(){
    return (
      <div className="showNothing">
        <h2>В корзине пока пусто</h2>
        <p>Перейдите в каталог, чтобы выбрать товары</p>
      </div>
  
    )
  }
}

export default ProductsInTheBasket;
