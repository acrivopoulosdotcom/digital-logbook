import Header from "../Header/Header.tsx";
import "./ChooseCar.css";
import {Card, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";
import {Link} from "react-router-dom";

export default function ChooseCarSite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/select-car.png"></Image>
                    <h1>Wähle deinen PKW</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <div className="btn-area">
                        <Link to={"/logbook"} className="btn-a-standard">VW Golf | ES-STE 78</Link>
                        <Link to={"/logbook"} className="btn-a-standard">SKODA Octavia | ES-STU 98</Link>
                        <Link to={"/addcar"} className="btn-a-standard">PKW hinzufügen</Link>
                    </div>
                </Card.Body>
                <Footer />
            </Card>
            <p>CHOOSE CAR</p>
        </>
    )
}