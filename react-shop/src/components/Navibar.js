import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo_white.png";
import "./Navibar.css";

import { BsCart4, BsFillGeoAltFill } from "react-icons/bs";
import ProductsInTheBasket from "./ProductsInTheBasket";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useCookies } from 'react-cookie';

export default function NaviBar() {
  //Для работы с состояниями. Значение False- корзина не открыта
  let [cartOpen, setCartOpen] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cookies, setCookie] = useCookies();
  let cityCookie = cookies.local;

  useEffect(() => {
    if (!cityCookie) {
      handleShow();
    }
  }, [cityCookie]);

  let cityToRender = cookies.local ? cookies.local : 'ГОРОД';

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

                  <span className="btn btn-dark btn-lg btn" id="btnLocation">
                    <BsFillGeoAltFill onClick={handleShow} />
                    <Modal show={show} onHide={handleClose} id="modalCity">
                      <Modal.Header closeButton>
                        <Modal.Title>Выберите город</Modal.Title>

                      </Modal.Header>
                      <Modal.Body>

                        <div className="modal-body">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="city"
                          >
                            <option defaultValue>Выберите город</option>
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


                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                          let city = document.getElementById('city');
                          setCookie('local', city.value);
                          cityToRender = city.value;
                          console.log("МЫ УСТАЛИ! РАБОТАЙ ПОЖАЛУЙСТА!!!!!!!!", city.value);
                          setShow(false);
                        }} id="save">
                          Сохранить
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </span>

                  <div className="location" id="local" onClick={() => { setShow(true); }}>
                    {cityToRender}
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
