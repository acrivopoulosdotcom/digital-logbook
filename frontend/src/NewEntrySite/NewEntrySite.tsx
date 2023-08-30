import Header from "../Header/Header.tsx";
import "./NewEntry.css";
import {Card, Form} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";

export default function NewEntrySite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <h1>Dein neuer Eintrag</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <Form className="form-area">
                        <input type="text" placeholder="Grund für die Fahrt"></input>
                        <input type="text" placeholder="Firma / Kunde"></input>
                        <input type="text" placeholder="Vorname"></input>
                        <input type="text" placeholder="Nachname"></input>
                        <input type="text" placeholder="Bisheriger Standort"></input>
                        <input type="text" placeholder="Aktueller Standort"></input>
                        <input type="text" placeholder="Bisheriger KM Stand"></input>
                        <input type="text" placeholder="Aktueller KM Stand"></input>
                        <input type="text" placeholder="KM Summe"></input>
                        <input type="text" placeholder="Notizen"></input>
                        <div>
                            <button className="btn-fullwidth">Hinzufügen</button>
                        </div>
                    </Form>
                </Card.Body>
                <Footer />
            </Card>
            <p>NEW ENTRY</p>
        </>
    );
}