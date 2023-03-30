import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo_white.png";
import "./Navibar.css";

import { BsCart4, BsFillGeoAltFill } from "react-icons/bs";
import ProductsInTheBasket from "./ProductsInTheBasket";
/* import Modal from "./Modal"; */


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import $ from 'jquery';
import { cookie } from 'react-cookie';
import { useCookies } from 'react-cookie';

import Cookies from 'js-cookie';

/* function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    /* document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; */
/*  cookie.set("onboarded", true, {path: "/",  expires: d}); */
// Закрытие модального окна
/*  $("#modalCity").modal("hide");

 setCookieValue();
} */
/* function getCookie(cname) {
   let name = cname + "=";
   let ca = cookie.split(';');
   for (let i = 0; i < ca.length; i++) {
       let c = ca[i];
       while (c.charAt(0) === ' ') {
           c = c.substring(1);
       }
       if (c.indexOf(name) === 0) {
           return c.substring(name.length, c.length);
       }
   }
   return "";
} */

function checkCookie() {
  /* let location = getCookie("location");
  if (location !== "") {
      setCookieValue();
  } else {
      //Открытие модального окна
      /* var myModal = new Modal(document.getElementById('modalCity'), {})
      myModal.show() */

  /*       $("#modalCity").modal("show");
  } */
}

function setCookieValue() {
  /* let location = getCookie("location");
  let el = localRef.current;

  if (typeof el.textContent !== "undefined") {
      el.textContent = location;
  } else {
      el.innerText = location;
  } */
}


$("#save").on("click", function (e) {
  /* e.preventDefault();
  let location = ref.current.id.value;
  console.log("location" , location)
  setCookie("location", location, 365); */
});


export default function NaviBar() {
  //Для работы с состояниями. Значение False- корзина не открыта
  let [cartOpen, setCartOpen] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /* const handleSave =() => checkCookie(); */

  /* const ref = useRef(null);
  const localRef = useRef(null); */

  const [cookies, setCookie] = useCookies(['name']);

  function onChange(newName) {
    setCookie('name', newName, { path: '/' });
  }

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


                      </Modal.Body>
                      <Modal.Footer>

                        <Button variant="primary" onClick={() => {
                          let city = document.getElementById('city');
                          Cookies.set('local', city.value);
                          console.log("МЫ УСТАЛИ! РАБОТАЙ ПОЖАЛУЙСТА!!!!!!!!", city.value);
                          let el = document.getElementById('local');

                          if (typeof el.textContent !== "undefined") {
                            el.textContent = city.value;
                          } else {
                            el.innerText = city.value;
                          }; setShow(false);
                        }} id="save">
                          Сохранить
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </a>

                  <div className="location" id="local" onClick={() => {
                    console.log("Работай, пожалуйста!!!!!!!!");
                    let location = Cookies.get('local');
                    console.log("str " , location );
                    if (location !== undefined) {
                      let el = document.getElementById('local');

                      if (typeof el.textContent !== "undefined") {
                        el.textContent = location;
                      } else {
                        el.innerText = location;
                      }
                    } else {
                      console.log("SHOW")
                      setShow(true);
                    }
                  }}>
                    ГОРОД
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
