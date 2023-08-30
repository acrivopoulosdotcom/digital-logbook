import "./Login.css";
import {Card, Form, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import {Link} from "react-router-dom";

export default function LoginSite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <div className="card-body" style={{ width: '18rem' }}>
                    <Image className="main-logo" src="./images/Logo.png" fluid />
                    <h3 className="main-h3">LOGIN</h3>
                    <Form className="form-area">
                        <input type="email" placeholder="Deine E-Mail-Adresse"></input>
                        <input type="password" placeholder="Dein Password"></input>
                        <button className="btn-fullwidth main-btn">LOGIN</button>
                    </Form>

                    <div>
                        <Link to={"/register"} className="main-link" >NEW HERE? REGISTER HERE!</Link>
                    </div>
                </div>

            </Card>
            <p>LOGIN</p>
        </>
    )
}