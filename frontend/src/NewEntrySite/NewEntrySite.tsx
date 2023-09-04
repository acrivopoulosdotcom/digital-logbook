import Header from "../Header/Header.tsx";
import "./NewEntry.css";
import {Card, Form, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";

export default function NewEntrySite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/new-entry-img.png"></Image>
                    <h1>Dein neuer Eintrag</h1>
                    <div>

                    </div>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <Form className="form-area">
                        <Form.Select aria-label="Default select example" >
                            <option value="1">VW GOLF | ES-STE 78</option>
                            <option value="2">SKODA Octavia | ES-STU 98</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example">
                            <option>Nutzungsart</option>
                            <option value="1">Berufliche Nutzung</option>
                            <option value="2">Private Nutzung</option>
                        </Form.Select>
                        <input type="text" placeholder="Grund für die Fahrt"></input>
                        <input type="text" placeholder="Firma / Kunde"></input>
                        <input type="text" placeholder="Vorname"></input>
                        <input type="text" placeholder="Nachname"></input>
                        <input type="text" placeholder="Bisheriger Standort"></input>
                        <input type="text" placeholder="Ziel-Standort"></input>
                        <input type="text" placeholder="Vorheriger KM Stand"></input>
                        <input type="text" placeholder="Aktueller KM Stand"></input>
                        <input type="text" placeholder="KM Summe"></input>
                        <input type="text" placeholder="Notizen"></input>
                        <div>
                            <button className="btn-fullwidth" >Hinzufügen</button>
                        </div>
                    </Form>
                </Card.Body>
                <Footer />
            </Card>
            <p>NEW ENTRY</p>
        </>
    );
}