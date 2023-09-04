import "./Statistics.css";
import {Card, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import {Link} from "react-router-dom";

export default function StatisticsSite () {
    return (
        <>
        <Card className="wrapper">
            <Header />
            <Card.Title className="card-title">
                <Image className="site-img" src="./images/statistics-img.png"></Image>
                <h1>Deine Statistiken</h1>
            </Card.Title>
            <Card.Body className="card-body" style={{ width: '18rem' }}>
                <div className="btn-area gap">
                    <Link to={"/selectstatistic"} className="btn-a-standard">Monate</Link>
                    <Link to={"/selectstatistic"} className="btn-a-standard">Quartale</Link>
                    <Link to={"/selectstatistic"} className="btn-a-standard">Jahre</Link>
                    <Link to={"/selectstatistic"} className="btn-a-standard">Individuellen Zeitraum bestimmen</Link>
                </div>
            </Card.Body>
            <Footer />
        </Card>

            <p>STATISTICS SITE</p>
        </>
    )
}


