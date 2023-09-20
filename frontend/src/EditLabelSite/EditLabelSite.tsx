import "./EditLabel.css"
import Header from "../Header/Header.tsx";
import {Card, Form, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

type Label = {
    userId: string,
    name: string,
}
export default function EditLabelSite() {

    const {carId} = useParams();
    const [labels, setLabels] = useState<Label[]>([]);
    const [name, setName] = useState("");

    const nav = useNavigate();
    const userId = 1;

    function onChangeHandlerName(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    useEffect(()=> {
        axios
            .get("/api/label/selectedCar" + carId)
            .then ((response) => {
                console.log(response.data);
                setLabels(response.data);
        }).catch((error) => console.log("Error fetching car data:", error));
    }, [carId])

    function editLabel(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.post("/api/label", {userId, name})
            .then(() => console.log(userId, name))
            .then(() => nav("/CarOverview"))
            .catch((error) => console.log(error))
    }

    return (labels === undefined ? <div>LOADING...</div> : (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/add-car-img.png"></Image>

                    <h1>PKW bearbeiten</h1>

                    {labels.map((label) => (
                        <div key={label.userId}>
                        <div>{label.name}</div>
                        </div>
                    ))}

                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>

                    <Form className="form-area" onSubmit={editLabel} >
                        <input type="text" placeholder="Label-Name" required={true} onChange={onChangeHandlerName}></input>
                        <div>
                            <button className="btn-fullwidth">Änderungen speichern</button>
                        </div>
                    </Form>
                </Card.Body>
                <Footer />
            </Card>
            {/*<p>ADD LABEL</p>*/}
        </>
    ))
}