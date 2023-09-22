import "./Login.css";
import {Card, Form, Image} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";

type Props = {
    setUser: (user:string) => void
}
export default function LoginSite(loginPageProps:Props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    function onChangeHandlerUsername(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function onChangeHandlerPassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function login(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then((response) => loginPageProps.setUser(response.data))
            .then(() => nav("/home"))
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
                    <h3 className="main-h3">LOGIN</h3>
                    <Form className="form-area" onSubmit={login}>
                        <input type="email" placeholder="Deine E-Mail-Adresse" onChange={onChangeHandlerUsername} required={true}></input>
                        <input type="password" placeholder="Dein Password" onChange={onChangeHandlerPassword} required={true}></input>
                        <button className="btn-a-standard btn-fullwidth">LOGIN</button>
                    </Form>

                    <div>
                        <Link to={"/register"}><div className="main-link btn-fullwidth" >NEW HERE? REGISTER HERE!</div></Link>
                    </div>
                </div>

            </Card>
        </>
    )
}