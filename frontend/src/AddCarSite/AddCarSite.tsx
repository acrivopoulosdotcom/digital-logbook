import "./AddCar.css";
import Header from "../Header/Header.tsx";
import {Card, Form, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function AddCarSite() {

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [numberPlate, setNumberPlate] = useState("");
    const [initialOdoReading, setInitialOdoReading] = useState("");

    const nav = useNavigate();

    function onChangeHandlerBrand(event: ChangeEvent<HTMLInputElement>) {
        setBrand(event.target.value)
    }

    function onChangeHandlerModel(event: ChangeEvent<HTMLInputElement>) {
        setModel(event.target.value)
    }

    function onChangeHandlerNumberPlate(event: ChangeEvent<HTMLInputElement>) {
        setNumberPlate(event.target.value)
    }

    function onChangeHandlerInitialOdoReading(event: ChangeEvent<HTMLInputElement>) {
        setInitialOdoReading(event.target.value)
    }

    function addCar(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.post("/api/car", {brand, model, numberPlate, initialOdoReading})
            .then(() => nav("/choosecar"))
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/add-car-img.png"></Image>

                    <h1>PKW hinzufügen</h1>

                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <Form className="form-area" onSubmit={addCar}>
                        <input type="text" placeholder="Hersteller" onChange={onChangeHandlerBrand}></input>
                        <input type="text" placeholder="Modell" onChange={onChangeHandlerModel}></input>
                        <input type="text" placeholder="Kennzeichen" onChange={onChangeHandlerNumberPlate}></input>
                        <input type="text" placeholder="KM Stand bei Ersterfassung" onChange={onChangeHandlerInitialOdoReading}></input>
                        <div>
                            <button className="btn-fullwidth">Hinzufügen</button>
                        </div>
                    </Form>
                </Card.Body>
                <Footer />
            </Card>
            <p>ADD CAR</p>
        </>
    )
}