import React, { Component } from "react";
import './Find.css';

import $ from 'jquery';

export class Find extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      products: []
    };
    this.Search = this.Search.bind(this);
  }

  render() {
    return (
      <>
        <section className="catalog_h" id="find">
          <div className="container">
            <div className="row">
              <div className="col-12 ">
                <h2>Каталог товаров</h2>
              </div>

              <form id="searchForm">
                <div className="row d-flex">
                  <div className="col-md-6 mt-2">
                    <div className="search">
                      <i className="fa fa-search"></i>
                      <input id="keyword" type="search" name="keyword"
                        className="form-control"
                        placeholder="Поиск" />
                      <button id="mySearch" type="submit" className="btn btn-secondary" onClick={(e) => { this.Search("no"); e.preventDefault() }}>Найти
                      </button>
                    </div>
                  </div>
                  <div className="col mt-2 filter-button">
                    <button id="btnSortByUpperPrice" type="submit" className="btn btn-dark" onClick={(e) => { this.Search("SortByUpperPrice"); e.preventDefault() }} >По
                      возрастанию цены
                    </button>

                    <button id="btnSortByLowerPrice" type="submit" className="btn btn-dark" onClick={(e) => { this.Search("SortByLowerPrice"); e.preventDefault() }}>По убыванию
                      цены
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
    )
  }

  Search(sort) {
    var keyword = $('#keyword').val();
    this.props.handleSortAndFilter(keyword, sort);
  }
}

export default Find;
