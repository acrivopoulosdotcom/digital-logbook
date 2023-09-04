import "./CustomerFile.css";
import {Card, Form, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";

export default function CustomerFileSite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/customer-file-img.png" ></Image>
                    <h1>Dein neuer <br />Kundeneintrag</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <Form className="form-area">
                        <input type="text" placeholder="Firma / Kunde"></input>
                        <input type="text" placeholder="Vorname"></input>
                        <input type="text" placeholder="Nachname"></input>
                        <input type="text" placeholder="Straße"></input>
                        <input type="text" placeholder="Hausnummer"></input>
                        <input type="text" placeholder="Postleitzahl"></input>
                        <input type="text" placeholder="Ort"></input>
                        <input type="text" placeholder="Notizen"></input>
                        <div>
                            <button className="btn-fullwidth">Hinzufügen</button>
                        </div>
                    </Form>
                </Card.Body>
                <Footer />
            </Card>
            <div>CUSTOMER FILE</div>
        </>
    );
}