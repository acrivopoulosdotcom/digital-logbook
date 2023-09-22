import "./AddLabel.css";
import Header from "../Header/Header.tsx";
import {Card, Form, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

type Props = {
    userId: string,
    user: string
}
export default function AddLabelSite(addLabelProps: Props) {

    const userId = addLabelProps.userId;
    const [name, setName] = useState("");
    const nav = useNavigate();

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
                    <Image className="site-img" src="./images/add-label-img.png"></Image>

                    <h1>Label hinzufügen</h1>

                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <Form className="form-area" onSubmit={addLabel}>
                        <input type="text" placeholder="Label-Name" className={"text-center"} required={true} onChange={onChangeHandlerName}></input>
                        <div>
                            <button className="btn-a-standard btn-fullwidth">Hinzufügen</button>
                        </div>
                    </Form>
                </Card.Body>
                <Footer />
            </Card>
        </>
    )
}