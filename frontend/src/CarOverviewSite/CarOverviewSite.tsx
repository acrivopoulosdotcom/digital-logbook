import Header from "../Header/Header.tsx";
import "./CarOverview.css";
import {Card, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

type Car = {
    id: string,
    userId: string,
    brand: string,
    model: string,
    numberPlate: string,
    initialOdoReading: number,
    currentOdoReading: number
}

export default function ChooseCarSite() {
    const [cars, setCars] = useState<Car[]>([])

    const userId = "1";

    useEffect(()=> {
        axios.get("/api/car/" + userId).then ((response) => {
            setCars(response.data);
        }).catch((error) => console.log("Error fetching car data:", error));
    }, [userId])

    return (
        <>
            {cars === undefined ? (
                <h2>LOADING...</h2>
            ) : (
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/select-car.png"></Image>
                    <h1>Deine <br />PKW-Übersicht</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <div className="btn-area">
                        {cars.map((car) => (
                            <Link to={"/logbook"} className="btn-a-standard" key={car.id}> {car.brand} {car.model} | {car.numberPlate}</Link>
                        ))}
                        <Link to={"/addcar"} className="btn-a-standard">PKW hinzufügen</Link>
                    </div>
                </Card.Body>
                <Footer />
            </Card>)}
            <p>CHOOSE CAR</p>
        </>
    )
}