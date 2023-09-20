import "./Logbook.css"
import {Card, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import {Link} from "react-router-dom";
import {useEffect} from "react";

export default function LogbookSite() {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    return (
        <>
                <Card className="wrapper" id={"wrapper"}>
                    <Header />
                    <Card.Title className={"card-title"}>
                        <Image className={"site-img"} src={"./images/logbook-img.png"}></Image>
                        <h2>Dein Logbook</h2>
                    </Card.Title>
                    <Card.Body className={"card-body"} style={{ width: '18rem' }}>
                        <div className={"btn-a-area"}>
                            <Link to={"/newEntry"} className={"btn-a-standard"}>Neuen Eintrag hinzufügen</Link>
                            <Link to={"/selectDay"} className={"btn-a-standard"}>Nach Kalender sortiert</Link>
                            <Link to={"/selectStatus"} className={"btn-a-standard"}>Nach Status sortiert</Link>
                            <Link to={"/selectLabel"} className={"btn-a-standard"}>Nach Label sortiert</Link>
                        </div>
                    </Card.Body>
                    <Footer />
                </Card>
            {/*<p>LOGBOOK</p>*/}
        </>
    );
}