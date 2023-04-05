import React, { Component } from "react";
import { FaRubleSign } from 'react-icons/fa'
import { BsFillTrashFill } from "react-icons/bs";


export class Order extends Component {
  
  render() {

    return (

      <div class="container pt-4" id="basket">
   
    <div class="row gx-5">
        <div class="col-9">
            <div >

                <table class="table table-hover table-responsive-xl">

                    <tbody>
                    <tr >

                        <td style={{textAlign: 'center'}}>
                        <img src={"./img/" + this.props.order.imageLink} alt="img" width="250px"/>
                        </td>
                        <td>{this.props.order.title}</td>
                        <td id="count">
                            <div class="input-number">
                                <button type="button" class="input-number-minus btn btn-dark" >-</button>
                                <input class="input-number-input" type="text" pattern="^[0-9]+$" placeholder="1"/>
                                <button type="button" class="input-number-plus btn btn-dark" >+</button>
                            </div>
                        </td>
                        <td>
                            <b>{this.props.order.price}<FaRubleSign /></b>
                           
                        </td>

                        <td>
                        <BsFillTrashFill className="delete-icon" onClick={() => this.props.onDelete(this.props.order.id)} />
                        </td>

                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

       
    </div>
</div>





    );
  }
}


export default Order;
