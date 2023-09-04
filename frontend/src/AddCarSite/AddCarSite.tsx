import "./AddCar.css";
import Header from "../Header/Header.tsx";
import {Card, Form, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";

export default function AddCarSite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/add-car-img.png"></Image>
                    <h1>PKW hinzufügen</h1>

                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <Form className="form-area">
                        <input type="text" placeholder="Hersteller"></input>
                        <input type="text" placeholder="Modell"></input>
                        <input type="text" placeholder="Kennzeichen"></input>
                        <input type="text" placeholder="KM Stand bei Ersterfassung"></input>
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