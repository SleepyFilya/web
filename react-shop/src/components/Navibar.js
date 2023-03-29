import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo_white.png";
import "./Navibar.css";

import { BsCart4, BsFillGeoAltFill } from "react-icons/bs";
import ProductsInTheBasket from "./ProductsInTheBasket";
import Modal from "./Modal";

const showModal = (props) => {
  return (
    <div className="modal" tabindex="-1" id="modalCity">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Выберите город</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <select
              className="form-select"
              aria-label="Default select example"
              id="city"
            >
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
            <button type="button" className="btn btn-primary" id="save">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const showNothing = () => {
  return (
    <div className="empty">
      <h2>Город не выбран</h2>
    </div>
  );
};

export default function NaviBar(props) {
  //Для работы с состояниями. Значение False- корзина не открыта
  let [cartOpen, setCartOpen] = useState(false);
  let [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className="bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 ">
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                  <a className="navbar-brand" href="/">
                    <img src={logo} width="200" height="40" alt="img" />
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse text-uppercase"
                    id="navbarNavAltMarkup"
                  >
                    <ul className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          Главная
                        </a>
                      </li>
                      <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                          Каталог
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          Отзывы
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          Рекомендации
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          Контакты
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="null mx-2">
                    <Link
                      to={"/Basket"}
                      className="btn btn-dark btn-lg btn"
                      id="basket-icon"
                    >
                      <div>
                        {/* к className добавляется active если выражение верно*/}
                        <BsCart4
                          onClick={() => setCartOpen((cartOpen = !cartOpen))}
                          className={`shop-cart-button ${cartOpen && "active"}`}
                        />

                        {cartOpen && (
                          <ProductsInTheBasket
                            orders={this.props.orders}
                            onDelete={this.props.onDelete}
                          />
                        )}
                      </div>
                    </Link>
                    <span className="counter">0</span>
                  </div>

                  <a className="btn btn-dark btn-lg btn" id="btnLocation">
                    <BsFillGeoAltFill
                      onClick={() => setModalOpen((modalOpen = !modalOpen))}
                    />

                    {modalOpen && (
                      <div className="modal">
                        {props.orders.length === 0
                          ? showModal(props)
                          : showNothing()}
                      </div>
                    )}
                    {/* <BsFillGeoAltFill/>
                                    <Modal/> */}
                  </a>

                  <div className="location" id="local">
                    Пермь
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
