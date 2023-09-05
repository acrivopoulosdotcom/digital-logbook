import "./Register.css"
import {Card, Form, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import {Link} from "react-router-dom";
export default function RegisterSite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <div className="card-body" style={{ width: '18rem' }}>
                    <Image className="main-logo" src="./images/Logo.png" fluid />
                    <h3 className="main-h3">REGISTRIERUNG</h3>
                    <Form className="form-area">
                        <input type="text" placeholder="Vorname" required></input>
                        <input type="text" placeholder="Nachname" required></input>
                        <input type="email" placeholder="Deine E-Mail-Adresse" required></input>
                        <input type="password" placeholder="Dein Password" required></input>
                        <button className="btn-fullwidth main-btn">LOGIN</button>
                    </Form>
                    <div>
                        <Link to={"/login"}><div className="main-link">ALREADY REGISTERED?<br /> LOGIN HERE!</div></Link>
                    </div>
                </div>
            </Card>
            <p>REGISTER</p>
        </>
    )
}