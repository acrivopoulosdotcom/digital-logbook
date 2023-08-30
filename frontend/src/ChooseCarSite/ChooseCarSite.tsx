import Header from "../Header/Header.tsx";
import "./ChooseCar.css";
import {Card} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";
import {Link} from "react-router-dom";

export default function ChooseCarSite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <h1>Wähle deinen PKW</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <div className="btn-area">
                        <Link to={"/logbook"} className="btn-a-standard">Car One</Link>
                        <Link to={"/logbook"} className="btn-a-standard">Car Two</Link>
                    </div>
                </Card.Body>
                <Footer />
            </Card>
            <p>CHOOSE CAR</p>
        </>
    )
}