import "./Logbook.css"
import {Card} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import {Link} from "react-router-dom";

export default function LogbookSite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <h1>Dein Logbook</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <div className="btn-a-area">
                        <Link to={"/newentry"} className="btn-a-standard">Neuer Eintrag</Link>
                        <Link to={"/newentry"} className="btn-a-standard">Heute</Link>
                        <Link to={"/newentry"} className="btn-a-standard">Diese Woche</Link>
                        <Link to={"/newentry"} className="btn-a-standard">Dieser Monat</Link>
                        <Link to={"/newentry"} className="btn-a-standard">Deine Statistiken</Link>
                    </div>
                </Card.Body>
                <Footer />
            </Card>
            <p>LOGBOOK</p>
        </>
    );
}