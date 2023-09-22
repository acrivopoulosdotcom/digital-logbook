import "./Register.css"
import {Card, Form, Image} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
export default function RegisterSite() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    function onChangeHandlerUsername(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }
    function onChangeHandlerPassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function register(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("/api/user/register", {username, password})
            .then(()=> nav("/"))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return (
        <>
            <Card className="wrapper">
                <div className="card-body no-padding" style={{ width: '18rem' }}>
                    <Image className="main-logo" src="./images/logo.png" fluid />
                    <h3 className="main-h3">REGISTRIERUNG</h3>
                    <Form className="form-area" onSubmit={register}>
                        <input type="email" placeholder="Deine E-Mail-Adresse" required={true} onChange={onChangeHandlerUsername}></input>
                        <input type="password" placeholder="Dein Password" required={true} onChange={onChangeHandlerPassword}></input>
                        <button className="btn-a-standard btn-fullwidth">REGISTRIEREN</button>
                    </Form>
                    <div>
                        <Link to={"/"}><div className="main-link btn-fullwidth">ALREADY REGISTERED?<br /> LOGIN HERE!</div></Link>
                    </div>
                </div>
            </Card>
        </>
    )
}