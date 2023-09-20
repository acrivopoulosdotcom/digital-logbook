import "./Register.css"
import {Card, Form, Image} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
export default function RegisterSite() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    function onChangeHandlerEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function onChangeHandlerPassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function register(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("/api/user/register", {email, password})
            .then(()=> nav("/login"))
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
                        <input type="email" placeholder="Deine E-Mail-Adresse" required={true} onChange={onChangeHandlerEmail}></input>
                        <input type="password" placeholder="Dein Password" required={true} onChange={onChangeHandlerPassword}></input>
                        <button className="btn-a-standard btn-fullwidth">REGISTRIEREN</button>
                    </Form>
                    <div>
                        <Link to={"/login"}><div className="main-link btn-fullwidth">ALREADY REGISTERED?<br /> LOGIN HERE!</div></Link>
                    </div>
                </div>
            </Card>
            {/*<p>REGISTER</p>*/}
        </>
    )
}