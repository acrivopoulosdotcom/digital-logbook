import "./AddLabel.css";
import Header from "../Header/Header.tsx";
import {Card, Form, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function AddLabelSite() {

    const [userId, setUserId] = useState("");

    const [name, setName] = useState("");

    const nav = useNavigate();

    function onChangeHandlerUserId(event: ChangeEvent<HTMLInputElement>) {
        setUserId(event.target.value)
    }
    function onChangeHandlerName(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    function addLabel(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.post("/api/label/addLabel", {userId, name})
            .then(() => console.log(userId, name))
            .then(() => nav("/labelOverview"))
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/add-car-img.png"></Image>

                    <h1>Label hinzufügen</h1>

                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <Form className="form-area" onSubmit={addLabel}>
                        <input type="number" placeholder="UserId" required={true} onChange={onChangeHandlerUserId}></input>
                        <input type="text" placeholder="Label-Name" required={true} onChange={onChangeHandlerName}></input>
                        <div>
                            <button className="btn-fullwidth">Hinzufügen</button>
                        </div>
                    </Form>
                </Card.Body>
                <Footer />
            </Card>
            <p>ADD LABEL</p>
        </>
    )
}