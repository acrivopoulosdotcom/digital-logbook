import "./LabelSorted.css";
import Header from "../Header/Header.tsx";
import {Button, ButtonGroup, Card, Form, ListGroup, ProgressBar} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";

type Label = {
    id: string,
    userId: string,
    name: string,
}

type Entry = {
    id: string,
    userId: string,
    status: string,
    todoTitel: string,
    description: string,
    formattedDate: Date,
    prio: string,
    label: string,
    notes: string,
}

export default function LabelSortedSite() {

    const [labels, setLabels] = useState<Label[]>([]);
    const [label, setLabel] = useState<string>("");
    const [entries, setEntries] = useState<Entry[]>([]);
    const [editedEntry, setEditedEntry] = useState<Entry | null>(null);
    const userId = 1;
    function handleOnChangeLabel(event:ChangeEvent<HTMLSelectElement>) {
        const selectedLabel = event.target.value;
        setLabel(selectedLabel);
        event.preventDefault()
        axios({
            method: 'get',
            url: `/api/entries/getAllEntriesByLabel/${userId}/${selectedLabel}`,
        })
            .then(function (response) {
                console.log("Response Status: ", response.status);
                console.log("Response Body: ", response.data);
                setEntries(response.data);
            })}

    function editEntry(entry: Entry) {
        setEditedEntry(entry);
    }

    function handleEditChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if(editedEntry) {
            const {name, value} = event.target;
            setEditedEntry({ ...editEntry, [name]: value});
        }
    }

    function saveEditedEntry(event:ChangeEvent<ChangeEvent>) {
        event.preventDefault()

    }



    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/label/getAllLabels/' + userId,
        })
            .then(function(response) {
                console.log("Response Status: ", response.status);
                console.log("Response Body: ", response.data);
                setLabels(response.data);
            })
    }, [userId]);

    return (!userId ? <div>LOADING...</div> : (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <h1>To-dos nach <br/>Label sortiert: </h1>
                </Card.Title>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                    <Form.Select aria-label="Default select example" required onChange={handleOnChangeLabel}>
                        <option>Label wählen</option>
                        {labels.length > 0 && labels.map((label) => (
                            <option key={label.id} value={label.name}>{label.name}</option>
                        ))}
                    </Form.Select>
                    <div className={"container-progress-bar"}>
                        <ProgressBar now={80}/>
                    </div>
                    <ListGroup>
                        {entries.length > 0 && entries.map((entry) => (
                            <ListGroup.Item key={entry.id}>
                                <Card>
                                    <p>{editedEntry === entry ? (
                                        <input
                                            type={"text"}
                                            name={"todoTitel"}
                                            value={entry.todoTitel}
                                            onChange={handleEditChange}
                                        />
                                    ): (
                                        entry.todoTitel
                                    )}</p>
                                    <p>{editedEntry === entry ? (
                                        <textarea
                                            name={"notes"}
                                            value={entry.notes}
                                            onChange={handleEditChange}
                                        />
                                    ): (
                                        entry.notes
                                    )}</p>
                                    <ButtonGroup size={"sm"}>
                                        {editedEntry === entry ? (
                                            <>
                                                <Button className={"btn-a-standard"} onClick={saveEditedEntry}>Speichern</Button>
                                                <Button className={"btn-a-standard"}>Abbrechen</Button>
                                            </>
                                        ):(
                                        <Button className={"btn-a-standard"} onClick={() => editEntry(entry)}>BEARB.</Button>
                                            )}
                                    </ButtonGroup>
                                    <ButtonGroup size={"sm"}>
                                        <Button className={"btn-a-standard"}>Erledigt</Button>
                                        <Button className={"btn-a-standard"}>Löschen</Button>
                                    </ButtonGroup>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
                <Footer />
            </Card>
        <p>LABEL SORTED</p>
        </>
    ))
}