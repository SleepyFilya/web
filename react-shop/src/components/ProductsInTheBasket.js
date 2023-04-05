import React, { Component } from 'react'
import Order from "./Order";
import { FaRubleSign } from "react-icons/fa";


export class ProductsInTheBasket extends Component {

  componentDidMount() {
    this.props.handleLoadBasket();
  }
  render() {
    const error = this.props.error;
    const isLoaded = this.props.isLoadedBasket;
    const orders = this.props.orders;

    let summa = 0;
    orders.forEach((el) => (summa += Number.parseFloat(el.price)));

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>
          {orders.map(el => (
            <Order onDelete={this.props.onDelete} key={el.id} order={el} />
          ))}

          <div class="container pt-4" id="basket">

            <div class="row gx-5">
              <div class="col-9">
                <div >

                  <table class="table table-hover table-responsive-xl">

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
                          <h2><button type="button" class="btn btn-dark mb-2" id="createOrder" style={{ fontSize: '20px' }} onClick={() => {this.props.createOrder()}} >Оформить покупку</button></h2>

                        </td>

                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


            </div>
          </div>

        </main>


      );
    }
  }
}

export default ProductsInTheBasket;
