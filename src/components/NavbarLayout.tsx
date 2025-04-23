import { Component } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/reshot-icon-love-4ZAW2UJFSP.svg";

export default class NavbarLayout extends Component{
    render(){
        return (
            <>
            <Navbar
              bg="white"
              expand="lg"
              variant="light"
              className="mb-4 ps-4 pe-4 text-primary"
            >
              <Container fluid>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      height: "28px",
                      width: "28px",
                      marginRight: "10px",
                      
                    }}
                  />
                  Pet Lovers
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                  id="offcanvasNavbar"
                  aria-labelledby="offcanvasNavbarLabel"
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link as={Link} to="/">
                        Dashboard
                      </Nav.Link>
                      <Nav.Link as={Link} to="/clientes">
                        Clientes
                      </Nav.Link>
                      <Nav.Link as={Link} to="/produtos">
                        Produtos
                      </Nav.Link>
                      <Nav.Link as={Link} to="/servicos">
                        Serviços
                      </Nav.Link>
                      <Nav.Link as={Link} to="/consumos">
                        Consumos
                      </Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
      
            <Container fluid>
              <Outlet />
            </Container>
          </>
        )
    }

}