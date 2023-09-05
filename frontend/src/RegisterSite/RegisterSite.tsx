import "./Register.css"
import {Card, Form, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
export default function RegisterSite() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    function onChangeHandlerFirstName(event: ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value);
    }

    function onChangeHandlerLastName(event: ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value);
    }

    function onChangeHandlerEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function onChangeHandlerPassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function register(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("/api/user/register", {firstName, lastName, email, password})
            .then(()=> nav("/login"))
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Card className="wrapper">
                <Header />
                <div className="card-body" style={{ width: '18rem' }}>
                    <Image className="main-logo" src="./images/Logo.png" fluid />
                    <h3 className="main-h3">REGISTRIERUNG</h3>
                    <Form className="form-area" onSubmit={register}>
                        <input type="text" placeholder="Vorname" required={true} onChange={onChangeHandlerFirstName}></input>
                        <input type="text" placeholder="Nachname" required={true} onChange={onChangeHandlerLastName}></input>
                        <input type="email" placeholder="Deine E-Mail-Adresse" required={true} onChange={onChangeHandlerEmail}></input>
                        <input type="password" placeholder="Dein Password" required={true} onChange={onChangeHandlerPassword}></input>
                        <button className="btn-fullwidth main-btn">REGISTRIEREN</button>
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