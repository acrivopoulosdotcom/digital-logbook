import Container from 'react-bootstrap/Container';
import "./Header.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Image} from "react-bootstrap";
import {useState} from "react";
export default function Header() {

    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    return (
        <header id="header">
                <Navbar expand={'xxl'} className="bg-body-tertiary mb-3">
                    <Container fluid>
                        <Nav.Link className="container-textlogo"
                                  href="/"
                                  onMouseEnter={() => setIsHovered(true)}
                                  onMouseLeave={() => setIsHovered(false)}
                                  onTouchStart={() => setIsActive(true)}
                                  onTouchEnd={() => setIsActive(false)}
                        >
                            <Image className="header-textlogo" src={isHovered || isActive ? "./icons/textlogo-white.png" : "./icons/textlogo.png"} />
                        </Nav.Link>
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
                                        <NavDropdown.Item href="/accessdata">Zugangsdaten</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/settings">
                                            Einstellungen
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Deine PKWs"
                                        id={`offcanvasNavbarDropdown-expand-${'xxl'}`}
                                    >
                                        <NavDropdown.Item href="/choosecar">
                                            Auswahl eines PKWs
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/addcar">
                                            Hinzufügen eines PKWs
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Deine Kunden"
                                        id={`offcanvasNavbarDropdown-expand-${'xxl'}`}
                                    >
                                        <NavDropdown.Item href="/customersearch">
                                            Kundenübersicht
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/customerfile">
                                            Hinzufügen von Kunden
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Deine Einträge"
                                        id={`offcanvasNavbarDropdown-expand-${'xxl'}`}
                                    >
                                        <NavDropdown.Item href="/newentry">
                                            Eintrag hinzufügen
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/logbook">
                                            Dein Logbook
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="/statistics">Statistiken</Nav.Link>
                                    <Nav.Link href="/login">Logout</Nav.Link>

                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
        </header>
    )
}