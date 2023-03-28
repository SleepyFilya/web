import React from "react";
import {FormControl} from "react-bootstrap";
import './Find.css';


export default function Find() {

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
                                        <FormControl id="keyword" type="search" name="keyword" required
                                               className="form-control"
                                               placeholder="Поиск"/>
                                            <button id="mySearch" type="submit" className="btn btn-secondary">Найти
                                            </button>
                                    </div>
                                </div>
                                <div className="col mt-2 filter-button">
                                    <button id="btnSortByUpperPrice" type="submit" className="btn btn-dark">По
                                        возрастанию цены
                                    </button>

                                    <button id="btnSortByLowerPrice" type="submit" className="btn btn-dark">По убыванию
                                        цены
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
                {/*<Container>*/}
                {/*    <Row><h2>Каталог товаров</h2></Row>*/}
                {/*    <Row className={"Search"}>*/}
                {/*        <Col sm={6}>*/}
                {/*            <Form>*/}
                {/*                <Form.Group className="mb-3" controlId="formBasicEmail">*/}

                {/*                    <Form.Control type="find" placeholder="Поиск"/>*/}

                {/*                </Form.Group>*/}

                {/*            </Form>*/}
                {/*            <Col sm={2}>*/}
                {/*                <Button id="mySearch" type="submit" className="btn btn-secondary">Найти</Button>*/}

                {/*            </Col>*/}
                {/*        </Col>*/}
                {/*        <Col sm={2}>*/}
                {/*            <Button id="btnSortByUpperPrice" type="submit" className="btn btn-dark">По возрастанию цены*/}
                {/*            </Button>*/}
                {/*        </Col>*/}
                {/*        <Col sm={2}>*/}
                {/*            <Button id="btnSortByLowerPrice" type="submit" className="btn btn-dark">По убыванию цены*/}
                {/*            </Button>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Container>*/}

        </>
    )

}