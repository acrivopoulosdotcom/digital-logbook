import "./SelectStatistic.css";
import {Card, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import {Link} from "react-router-dom";

export default function SelectStatisticsSite () {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/select-statistic-img.png"></Image>
                    <h1>Wähle deine gewünschte Statistik aus</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <div className="btn-area gap">
                        <Link to={"/statisticindividual"} className="btn-a-standard">08 2023</Link>
                        <Link to={"/statisticindividual"} className="btn-a-standard">07 2023</Link>
                        <Link to={"/statisticindiviual"} className="btn-a-standard">06 2023</Link>
                        <Link to={"/statisticindividual"} className="btn-a-standard">05 2023</Link>
                        <Link to={"/statisticindividual"} className="btn-a-standard">04 2023</Link>
                        <Link to={"/statisticindiviual"} className="btn-a-standard">03 2023</Link>
                        <Link to={"/statisticindividual"} className="btn-a-standard">02 2023</Link>
                        <Link to={"/statisticindividual"} className="btn-a-standard">01 2023</Link>
                    </div>
                </Card.Body>
                <Footer />
            </Card>

            <p>STATISTICS SITE</p>
        </>
    )
}