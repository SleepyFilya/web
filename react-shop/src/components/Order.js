import React, { Component } from "react";
import { FaRubleSign } from 'react-icons/fa'
import { BsFillTrashFill } from "react-icons/bs";


export class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      products: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/basket")
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
    //const orders = this.state.orders;
    const isLoaded = this.state.isLoaded;
    const products = this.state.products;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
    return (

      <div className="item">

        <div class="container pt-4" id="basket">

          <div class="row gx-5">
            <div class="col-9">
              <div>
                <table class="table table-hover table-responsive-xl">
                  <tbody>
                    <tr>
                      <td className="tdImg">
                        <img src={"./img/" + products.imageLink} alt="img" />
                      </td>
                      <td></td>
                      <td id="count">
                        <div class="input-number">
                          <button
                            type="button"
                            class="input-number-minus btn btn-dark"
                          >
                            -
                          </button>
                          <input
                            class="input-number-input"
                            type="text"
                            pattern="^[0-9]+$"
                            placeholder="1"
                          />
                          <button
                            type="button"
                            class="input-number-plus btn btn-dark"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <b>{products.price}<FaRubleSign /></b>
                      </td>

                      <td>
                        <BsFillTrashFill className="delete-icon" onClick={() => this.props.onDelete(products.id)} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>



    );
  }
}
}

export default Order;
