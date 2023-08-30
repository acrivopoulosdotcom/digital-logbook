import Container from 'react-bootstrap/Container';
import "./Header.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Image} from "react-bootstrap";
export default function Header() {
    return (
        <header id="header">
                <Navbar expand={'xxl'} className="bg-body-tertiary mb-3">
                    <Container fluid>

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'xxl'}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${'xxl'}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${'xxl'}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'xxl'}`}>
                                    MENÜ
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <NavDropdown
                                        title="Dein Account"
                                        id={`offcanvasNavbarDropdown-expand-${'xxl'}`}
                                    >
                                        <NavDropdown.Item href="#action3">Profil</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action4">
                                            Einstellungen
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="#action1">Deine PKWs</Nav.Link>
                                    <Nav.Link href="#action2">Kunden</Nav.Link>
                                    <Nav.Link href="#action2">Statistiken</Nav.Link>
                                    <Nav.Link href="/login">Logout</Nav.Link>

                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                        <Nav.Link href="/"><Image className="header-textlogo" src="./icons/Textlogo.png" /></Nav.Link>
                    </Container>
                </Navbar>
        </header>
    )
}