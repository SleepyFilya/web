import React from "react";
import Order from "./Order";
import { FaRubleSign } from "react-icons/fa";

  
 const Modal = (props) => {
    return (
        <div className="modal" tabindex="-1" id="modalCity">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Выберите город</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" >
                    <select className="form-select" aria-label="Default select example" id="city">
                        <option selected>Выберите город</option>
                        <option>МОСКВА</option>
                        <option>САНКТ-ПЕТЕРБУРГ</option>
                        <option>НОВОСИБИРСК</option>
                        <option>КРАСНОДАР</option>
                        <option>ЕКАТЕРИНБУРГ</option>
                        <option>КАЗАНЬ</option>
                        <option>УФА</option>
                        <option>НИЖНИЙ НОВОГОРОД</option>
                        <option>ЧЕЛЯБИНСК</option>
                        <option>САМАРА</option>
                        <option>РОСТОВ-НА-ДОНУ</option>
                        <option>ОМСК</option>
                        <option>КРАСНОЯРСК</option>
                        <option>ВОРОНЕЖ</option>
                        <option>ПЕРМЬ</option>
                        <option>ВОЛГОГРАД</option>
                        <option>ВЛАДИВОСТОК</option>
                    </select>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" id="save">Сохранить</button>
                </div>
            </div>
        </div>
    </div>
    );
  }

  export default Modal
  