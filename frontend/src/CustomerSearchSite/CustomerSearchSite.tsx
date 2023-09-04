import Header from "../Header/Header.tsx";
import "./CustomerSearch.css"
import {Accordion, Card, Form, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";

export default function CustomerSearchSite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/customer-search-img.png"></Image>
                    <h1>Kundensuche</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Suche nach Kunde</Accordion.Header>
                            <Accordion.Body>
                                <Accordion defaultActiveKey="1">
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Suche nach Namen</Accordion.Header>
                                        <Accordion.Body>
                                            <Form className="form-area">

                                                <input type="text" placeholder="Vorname"></input>
                                                <input type="text" placeholder="Nachname"></input>
                                                <div>
                                                    <button className="btn-fullwidth">Suche starten</button>
                                                </div>
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Suche nach Firma</Accordion.Header>
                            <Accordion.Body>
                                <p>Suche nach Firma</p>
                                <Form className="form-area">
                                    <input type="text" placeholder="Suche nach Firmennamen"></input>
                                    <div>
                                        <button className="btn-fullwidth">Suche starten</button>
                                    </div>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
                <Footer />
            </Card>
            <p>CUSTOMER SEARCH</p>
        </>
    );
}