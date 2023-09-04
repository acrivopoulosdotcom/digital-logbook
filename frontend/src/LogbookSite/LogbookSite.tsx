import "./Logbook.css"
import {Button, Card, Collapse, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import {Link} from "react-router-dom";
import {useState} from "react";

export default function LogbookSite() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/logbook-img.png"></Image>
                    <h1>Dein Logbook</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <div className="btn-a-area">
                        <Link to={"/newentry"} className="btn-a-standard">Neuer Eintrag</Link>
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            className="btn-a-standard"
                        >
                            Heutige Einträge
                        </Button>
                        <Collapse in={open}>
                            <div id="example-collapse-text">
                                Auflistung aller Einträge vom heutigen Tag
                            </div>
                        </Collapse>

                        <Link to={"/entries"} className="btn-a-standard">Diese Woche</Link>
                        <Link to={"/entries"} className="btn-a-standard">Dieser Monat</Link>
                        <Link to={"/statistics"} className="btn-a-standard">Deine Statistiken</Link>
                    </div>
                </Card.Body>
                <Footer />
            </Card>
            <p>LOGBOOK</p>
        </>
    );
}