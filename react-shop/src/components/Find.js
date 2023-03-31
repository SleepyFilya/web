import React ,{ Component }from "react";
import {FormControl} from "react-bootstrap";
import './Find.css';


import $ from 'jquery';

function SortByLowerPrice() {
    /* fetch("http://localhost:8080/products?keyword=Корзина&sort=SortByLowerPrice")
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
      ) */
  } 

 function SortByUpperPrice() {
    /* fetch("http://localhost:8080/products?keyword=Корзина&sort=SortByUpperPrice")
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
      ) */
  } 

 
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

      /* componentDidMount() {
      fetch("http://localhost:8080/products?keyword=Дровница")
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
    } */
    

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
                                               placeholder="Поиск"/>
                                            <button id="mySearch" type="submit" className="btn btn-secondary"  onClick={(e) =>{this.Search("no"); e.preventDefault()} }>Найти
                                            </button>
                                    </div>
                                </div>
                                <div className="col mt-2 filter-button">
                                    <button id="btnSortByUpperPrice" type="submit" className="btn btn-dark" onClick={(e) => {this.Search("SortByUpperPrice"); e.preventDefault()}} >По
                                        возрастанию цены
                                    </button>

                                    <button id="btnSortByLowerPrice" type="submit" className="btn btn-dark" onClick={(e) => {this.Search("SortByLowerPrice"); e.preventDefault()}}>По убыванию
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
    Search(sort){
      var keyword = $('#keyword').val();
      var request = "http://localhost:8080/products?keyword=" + keyword + "&sort=" + sort;
      
      fetch(request)
      
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
    
    
}


export default Find;
