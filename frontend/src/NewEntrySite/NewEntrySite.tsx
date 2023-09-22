// @ts-nocheck
import Header from "../Header/Header.tsx";
import "./NewEntry.css";
import {Card, Form, Image} from "react-bootstrap";
import Calendar from "react-calendar";
import "./IndividualCalendar.css";
import Footer from "../Footer/Footer.tsx";
import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
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
export default function NewEntrySite(newEntryProps: Props) {

    const nav = useNavigate();
    const [titel, setTitel] = useState("");
    const [prio, setPrio] = useState("");
    const [labels, setLabels] = useState<Label[]>([]);
    const [label, setLabel] = useState("");
    const [notes, setNotes] = useState("");
    const status = "Erledigen";
    const [date, setDate] = useState<Date>(new Date());
    const formattedDate = date.toLocaleDateString();
    const userId = newEntryProps.userId;

    function handleOnChangeTitel(event:ChangeEvent<HTMLInputElement>) {
        setTitel(event.target.value);
    }

    function handleOnChangePrio(event:ChangeEvent<HTMLSelectElement>) {
        setPrio(event.target.value);
    }

    function handleOnChangeLabel(event:ChangeEvent<HTMLSelectElement>) {
        const selectedLabel = event.target.value;
        setLabel(selectedLabel);
    }

    function handleOnChangeNotes(event:ChangeEvent<HTMLInputElement>) {
        setNotes(event.target.value);
    }

    function saveNewEntry(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.post('/api/entries/addEntry', {userId, status, formattedDate, titel, prio, label, notes})
            .then(() => console.log(userId, status, formattedDate, titel, prio, label, notes))
            .then(() => nav("/home"))
            .catch((error) => console.log(error))
    }

    useEffect(()=> {
        window.scrollTo(0,0);
            axios({
                method: 'get',
                url: '/api/label/getAllLabels/' + userId,
            })
                .then(function (response) {
                    console.log("Response Status: ", response.status);
                    console.log("Response Body: ", response.data);
                    setLabels(response.data);
                })
        }, [userId]);

    return (!userId ? <div>LOADING</div> : (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/new-entry-img.png"></Image>
                    <h2>Neuer Eintrag</h2>
                </Card.Title>
                <Card.Body className="card-body no-pad" style={{ width: '18rem' }}>
                    <Calendar
                        value={date}
                        onChange={(selectedDate) => setDate(selectedDate)}
                        defaultView={"month"}
                        locale="de-De"
                    />
                    <Form className="form-area" onSubmit={saveNewEntry}>
                        <h4 className={"display-date"}>{formattedDate}</h4>
                        <input type={"text"} placeholder={"Eintrag"} className={"text-center"} onChange={handleOnChangeTitel} required={true}></input>
                        <input type={"textarea"} placeholder={"Ergänzende Notizen"} className={"text-center"} onChange={handleOnChangeNotes}></input>
                        <select className={"btn-a-standard"} aria-label="Default select example" onChange={handleOnChangePrio}>
                            <option className={"text-center"}>Priorität wählen</option>
                            <option value={"Prio 1"} className={"text-center"}>Prio 1</option>
                            <option value={"Prio 2"} className={"text-center"}>Prio 2</option>
                            <option value={"Prio 3"} className={"text-center"}>Prio 3</option>
                        </select>
                        <select className={"btn-a-standard"} aria-label="Default select example" onChange={handleOnChangeLabel}>
                            <option className={"text-center"}>Label wählen</option>
                            {labels.length > 0 && labels.map((label) => (
                                <option key={label.id} value={label.name}>{label.name}</option>
                            ))}
                        </select>
                        <div>
                            <button className={"btn-a-standard btn-fullwidth"}>Hinzufügen</button>
                        </div>
                        <Link className={"btn-a-standard fullwidth"} to={"/home"}>Abbrechen</Link>
                    </Form>
                </Card.Body>
                <Footer />
            </Card>
        </>
    ))
}