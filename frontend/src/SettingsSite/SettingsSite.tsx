import "./Settings.css";
import Header from "../Header/Header.tsx";
import {Card, Form, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";

export default function SettingsSite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/settings-img.png" ></Image>
                    <h1>Deine Einstellungen</h1>

                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <Form.Select className="form-area" aria-label="Default select example">
                        <option>Sprache</option>
                        <option value="german">Deutsch</option>
                        <option value="english">English</option>
                        <option value="italian">Italiano</option>
                    </Form.Select>
                    <Form.Select className="form-area" aria-label="Default select example">
                        <option>Screendesign</option>
                        <option value="regular-mode">Light Mode</option>
                        <option value="dark-mode">Dark Mode</option>
                    </Form.Select>
                </Card.Body>
                <Footer />
            </Card>
            {/*<p>SETTINGS</p>*/}
        </>
    )
}