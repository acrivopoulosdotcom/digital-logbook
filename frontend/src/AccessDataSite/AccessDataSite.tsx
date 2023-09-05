import "./AccessData.css";
import Header from "../Header/Header.tsx";
import {Card, Form, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";

export default function AccessDataSite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/access-img.png"></Image>
                    <h1>Deine Zugangsdaten</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <Form className="form-area">
                        <Form.Select className="form-area no-margin-form-area" aria-label="Default select example">
                            <option>Anrede</option>
                            <option value="female">Frau</option>
                            <option value="male">Herr</option>
                            <option value="x">Divers</option>
                        </Form.Select>
                        <input type="text" placeholder="Vorname"></input>
                        <input type="text" placeholder="Nachname"></input>
                        <input type="email" placeholder="Deine E-Mail-Adresse"></input>
                        <input type="password" placeholder="Dein Passwort"></input>
                        <div>
                            <button className="btn-fullwidth">Bestätigen</button>
                        </div>
                    </Form>
                </Card.Body>
                <Footer />
            </Card>
            <p>ACCESS DATA</p>
        </>
    )
}