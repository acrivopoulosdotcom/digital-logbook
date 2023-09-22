import "./Logbook.css"
import {Card, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

type Props = {
    user: string,
    setUserId: (userId:string) => void
}

export default function LogbookSite(logbookProps: Props) {

    useEffect(() => {
        window.scrollTo(0,0);

        axios({
            method: 'get',
            url: '/api/user/currentUser/' + logbookProps.user
        })
            .then((response) => logbookProps.setUserId(response.data))
            .catch((error) => console.log(error));

    }, [logbookProps]);
    return (
        <>
            <Card className="wrapper" id={"wrapper"}>
                <Header user={logbookProps.user} />
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
        </>
    );
}