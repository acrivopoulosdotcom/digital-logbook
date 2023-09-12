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
export default function NewEntrySite() {

    const nav = useNavigate();
    const [todoTitel, setTodoTitel] = useState("");
    const [prio, setPrio] = useState("");
    const [labels, setLabels] = useState<Label[]>([]);
    const [label, setLabel] = useState("");
    const [notes, setNotes] = useState("");
    const status = "open";
    const userId = 1;
    const [date, setDate] = useState<Date>(new Date())
    const formattedDate = date.toLocaleDateString();

    function handleOnChangeTodoTitel(event:ChangeEvent<HTMLInputElement>) {
        setTodoTitel(event.target.value);
    }

    function handleOnChangePrio(event:ChangeEvent<HTMLSelectElement>) {
        setPrio(event.target.value);
    }

    function handleOnChangeLabel(event:ChangeEvent<HTMLSelectElement>) {
        const selectedLabel = event.target.value;
        setLabel(selectedLabel);
       // setLabels([...labels, selectedLabel]);
    }

    function handleOnChangeNotes(event:ChangeEvent<HTMLInputElement>) {
        setNotes(event.target.value);
    }

    function saveNewEntry(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.post('/api/entries/addEntry', {userId, status, formattedDate, todoTitel, prio, label, notes})
            .then(() => console.log(userId, status, formattedDate, todoTitel, prio, label, notes))
            .then(() => nav("/logbook"))
            .catch((error) => console.log(error))
    }

    useEffect(()=> {
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
                    <h1>Neues To-do</h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <Form className="form-area" onSubmit={saveNewEntry}>
                        <Calendar
                            value={date}
                            onChange={(selectedDate) => setDate(selectedDate)}
                            defaultView={"month"}
                            locale="de-De"
                        />
                        {<p>Selected Date: {formattedDate}</p>}
                        <input type={"text"} placeholder={"Aufgabenname"} onChange={handleOnChangeTodoTitel}></input>
                        <input type={"textarea"} placeholder={"Notizen"} onChange={handleOnChangeNotes}></input>
                        <Form.Select aria-label="Default select example" required onChange={handleOnChangePrio}>
                            <option>Priorität wählen</option>
                            <option value={"prio-1"}>Priorität 1</option>
                            <option value={"prio-2"}>Priorität 2</option>
                            <option value={"prio-3"}>Priorität 3</option>
                            <option value={"prio-4"}>Priorität 4</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example" required onChange={handleOnChangeLabel}>
                            <option>Label wählen</option>
                            {labels.length > 0 && labels.map((label) => (
                                <option key={label.id} value={label.name}>{label.name}</option>
                            ))}
                        </Form.Select>
                        <div>
                            <button className={"btn-fullwidth"} >Hinzufügen</button>
                        </div>
                        <Link className={"btn-a-standard fullwidth"} to={"/logbook"}>Abbrechen</Link>
                    </Form>
                </Card.Body>
                <Footer />
            </Card>
            <p>NEW ENTRY</p>
        </>
    ))
}