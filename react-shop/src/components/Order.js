import React, { Component } from "react";
import { FaRubleSign } from 'react-icons/fa'
import { BsFillTrashFill } from "react-icons/bs";


export class Order extends Component {

    render() {

        return (
           
            <div className="container pt-4" id="basket">

                <div className="row gx-5">
                    <div className="col-9">
                        <div >

                            <table className="table table-hover table-responsive-xl" style={{tableLayout: 'fixed'}}>

                                <tbody>
                                    <tr >

                                        <td style={{ textAlign: 'center', width:'300px'}}>
                                            <img src={"./img/" + this.props.order.imageLink} alt="img" width="250px" />
                                        </td>
                                        <td style={{width:'300px'}}>{this.props.order.title}</td>
                                        <td id="count" style={{ width:'250px'}}>
                                            <div className="input-number" style={{ textAlign: 'center'}}>
                                                <button type="button" className="input-number-minus btn btn-dark" id="minusOne" onClick={() => this.props.lowerCounter(this.props.order)}>-</button>
                                                <input className="input-number-input" type="text" pattern="^[0-9]+$" value={this.props.order.count}/>
                                                <button type="button" className="input-number-plus btn btn-dark" id="plusOne" onClick={() => this.props.upperCounter(this.props.order)}>+</button>
                                            </div>
                                        </td>
                                        <td style={{width:'300px'}}>
                                            <b>{this.props.order.price}<FaRubleSign /></b>

                                        </td>

                                        <td style={{width:'250px'}}>
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
