import React from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import logo from '../img/logo_white.png';

export const Footer = () => (
    <div className="fixed-bottom footer">
        <Container fluid style={{ backgroundColor: '#212529', color: '#fff', position: 'fixed-bottom', height: '100px' }}>
            <Container>
                <Row>
                    <Col md={6}>
                        <Navbar.Brand>
                            <img src={logo} width="200" height="40" alt="" style={{marginTop: '30px'}} />
                        </Navbar.Brand>
                    </Col>

                    <Col md={6} style={{ display: 'flex', justifyContent: 'end', marginTop: '25px'}}>
                        <p>Контакты</p>

                    </Col>

                </Row>
                <Row>
                    <Col md={12} style={{ display: 'flex', justifyContent: 'end', marginTop: '-15px'}}>

                        <p>Сергей 8-902-47-49-771</p>
                    </Col>
                </Row>


            </Container>
        </Container>
    </div>

)




