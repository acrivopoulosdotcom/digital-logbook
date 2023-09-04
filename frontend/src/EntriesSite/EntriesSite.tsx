import "./Entries.css";
import {useState} from "react";
import {Button, Card, Collapse, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";

export default function EntriesSite() {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/entries-img.png"></Image>
                    <h1>Deine Einträge</h1>
                </Card.Title>
                <Card.Body className="card-body-collapse" style={{ width: '18rem' }}>
                    <ul>
                        <li>Mittels Schleife über die einzelnen Tage rendern</li>
                        <li>Die jeweiligen Tage können aufgeklappt werden</li>
                    </ul>
                    <div className="btn-collapse-area">
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            className="btn-a-standard btn-fullwidth"
                        >
                            Einträge 31.08.2023
                        </Button>
                        <Collapse in={open}>
                            <div id="example-collapse-text">
                                Auflistung aller Einträge "31.08.23"
                            </div>
                        </Collapse>
                    </div>
                    <div className="btn-collapse-area">
                        <Button
                            onClick={() => setOpen1(!open1)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open1}
                            className="btn-a-standard btn-fullwidth"
                        >
                            Einträge 30.08.2023
                        </Button>
                        <Collapse in={open1}>
                            <div id="example-collapse-text">
                                Auflistung aller Einträge "30.08.23"
                            </div>
                        </Collapse>
                    </div>
                    <Button className="btn-a-standard btn-fullwidth">
                        <span>Export | Download</span> <Image className="btn-icon" src="./icons/export-icon.png"></Image>
                    </Button>
                </Card.Body>
                <Footer />
            </Card>
            <p>ENTRIES</p>
        </>
    );
}