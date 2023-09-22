import Header from "../Header/Header.tsx";
import "./LabelOverview.css";
import {Button, Card, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

type Label = {
    id: string,
    userId: string,
    name: string,
}

type Props = {
    userId: string,
    user: string
}

export default function LabelOverviewSite(labelOverviewProps: Props) {
    const [labels, setLabels] = useState<Label[]>([])
    const [refreshData, setRefreshData] = useState(false);
    const nav = useNavigate()

    function deleteLabel(labelId:string) {
        axios.delete("/api/label/deleteLabel/" +labelId)
            .then(() => {
                console.log(labelId);
                setRefreshData(!refreshData);
                nav("/labelOverview");
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        if (refreshData) {
            axios({
                method: 'get',
                url: '/api/label/getAllLabels/' + labelOverviewProps.userId,
            })
                .then(function (response) {
                console.log("Response Status: ", response.status);
                console.log("Response Body: ", response.data);
                setLabels(response.data);
            })
            .finally(() => {
                setRefreshData(false);
            });
        }
    }, [labelOverviewProps.userId, refreshData]);

    useEffect(() => {

            axios({
                method: 'get',
                url: '/api/label/getAllLabels/' + labelOverviewProps.userId,
            })
                .then(function (response) {
                    console.log("Response Status: ", response.status);
                    console.log("Response Body: ", response.data);
                    setLabels(response.data);
                    window.scrollTo(0,0);
                })
    }, [labelOverviewProps.userId]);

    return (
        <>
            {labels === undefined ? (
                <h2>LOADING...</h2>
            ) : (
            <Card className="wrapper">
                <Header user={labelOverviewProps.user}/>
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/label-overview-img.png"></Image>
                    <h1>Deine <br />Label-Übersicht</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <div className="btn-area">
                        {labels.map((label) => (
                            <div className={"display-row-flex"}  key={label.id}>
                                <Link to={"/editLabel/" + label.id} className="btn-a-standard expand" key={label.id}> {label.name}</Link> <Button onClick={() =>deleteLabel(label.id)}>Löschen</Button>
                            </div>
                        ))}
                        <Link to={"/addLabel"} className="btn-a-standard ">Label hinzufügen</Link>
                    </div>
                </Card.Body>
                <Footer />
            </Card>)}
        </>
    );
}