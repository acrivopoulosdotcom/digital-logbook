import "./Login.css";
import {Card, Form, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";

export default function LoginSite() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    function onChangeHandlerEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function onChangeHandlerPassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function login(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.post("/api/user/login", {email, password})
            .then(() => nav("/"))
            .then(() => console.log("es hat ohne Security geklappt"))
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Card className="wrapper">
                <Header />
                <div className="card-body" style={{ width: '18rem' }}>
                    <Image className="main-logo" src="./images/Logo.png" fluid />
                    <h3 className="main-h3">LOGIN</h3>
                    <Form className="form-area" onSubmit={login}>
                        <input type="email" placeholder="Deine E-Mail-Adresse" onChange={onChangeHandlerEmail}></input>
                        <input type="password" placeholder="Dein Password" onChange={onChangeHandlerPassword}></input>
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