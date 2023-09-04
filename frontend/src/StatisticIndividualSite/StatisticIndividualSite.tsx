import "./StatisticIndividual.css"
import {Button, Card, Image, Table} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";

export default function StatisticIndividualSite() {
    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <h1>Auswertung <br /> vom 01.08 bis 31.08.2023</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <p>Grafische Darstellung der Statistik einfügen</p>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th colSpan={2}>Deklaration</th>
                            <th>KM</th>
                            <th>%</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colSpan={2}>Gesamtkilometer</td>
                            <td>3728</td>
                            <td>100</td>
                        </tr>
                        <tr>

                            <td colSpan={2}>Geschäftliche Nutzung</td>
                            <td>2805</td>
                            <td>75.24</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Private Nutzung</td>
                            <td>923</td>
                            <td>24.76</td>
                        </tr>
                        </tbody>
                    </Table>
                    <div>

                    </div>
                    <Button className="btn-a-standard btn-fullwidth">
                        <span>Export | Download</span> <Image className="btn-icon" src="./icons/export-icon.png"></Image>
                    </Button>
                </Card.Body>
                <Footer />
            </Card>
            <p>STATISTIC INDIVIDUAL</p>
        </>
    )
}