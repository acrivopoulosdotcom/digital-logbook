import "./SelectDay.css";
import {Button, Card, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Calendar from "react-calendar";

type Entry = {
    id: string,
    userId: string,
    status: string,
    todoTitel: string,
    description: string,
    formattedDate: string,
    prio: string,
    label: string,
    notes: string
};

export default function SelectDaySite() {

    const userId: string = "1";

    const date = new Date();

    const currentDate = date.toLocaleDateString();

    const [entries, setEntries] = useState<Entry[]>([]);

    const [formattedDate, setFormattedDate] = useState("");

    // const changeStatus = (entryId: string) => {
    //     // Find the entry by ID
    //     const updatedEntries = entries.map((entry) => {
    //         if (entry.id === entryId) {
    //             // Hier den Status ändern, zum Beispiel auf "done"
    //             entry.status = "done";
    //         }
    //         return entry;
    //     });
    //
    //     // Aktualisieren Sie den State mit den aktualisierten Einträgen
    //     setEntries(updatedEntries);
    //
    //     // Sende die Aktualisierung ans Backend
    //     axios({
    //         method: 'put', // Verwenden Sie die richtige HTTP-Methode für die Aktualisierung
    //         url: `/api/entries/changeStatus/${entryId}`, // Geben Sie die richtige URL zum Aktualisieren des Eintrags an
    //         data: { status: "done" }, // Passen Sie die Daten an, die Sie ans Backend senden möchten
    //     })
    //         .then(function (response) {
    //             console.log("Status erfolgreich geändert: ", response.status);
    //         })
    //         .catch(function (error) {
    //             console.error("Fehler beim Ändern des Status: ", error);
    //         });
    // };

    useEffect(() => {
        const formattedDate = currentDate;

        axios({
            method: 'get',
            url:`/api/entries/getAllEntriesByUserIdAndSelectedDay/${userId}/${formattedDate}`,
        })
            .then(function (response) {
                console.log("Response Status: ", response.status);
                console.log("Response Body: ", response.data);
                setEntries(response.data);
                console.log(userId);
                console.log(formattedDate);
            })
    }, [userId, formattedDate])

    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/customer-file-img.png" ></Image>
                    <h1>HEUTE</h1>
                </Card.Title>
                <Calendar
                    value={date}
                    onChange={(selectedDate) => setFormattedDate(selectedDate.toLocaleString().split(',')[0])}
                />
                <p>formattedDate: {formattedDate}</p>
                <p>currentDate: {currentDate}</p>
                <Card.Body className="card-body" style={{ width: '18rem' }}>
                        <p>Status: OPEN</p>
                        {entries.map((entry) => {
                            if (entry.status === "open") {
                                return (
                                    <Card className={"input-card"} key={entry.id}>
                                        <div>
                                            <div>
                                                <p>{entry.todoTitel}</p>
                                                <p>{entry.notes}</p>
                                                <input type={"text"} ></input>
                                                <input type={"textarea"} ></input>
                                                <button className={"btn-a-standard"}>Speichern</button>
                                                <button className={"btn-a-standard"}
                                                >
                                                    Erledigt
                                                </button>
                                                <button className={"btn-a-standard"}
                                                >
                                                    Löschen
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            }
                        })}
                    <p>Status: DONE</p>
                    {entries.map((entry) => {
                        if (entry.status === "done") {
                            return (
                                <Card className={"input-card-reverse"} key={entry.id}>
                                    <div>
                                        <div>
                                            <p className={"durchgestrichen"}>{entry.todoTitel}</p>
                                        </div>
                                        <Button className={"btn-reverse"}
                                        >
                                            Löschen
                                        </Button>
                                    </div>
                                </Card>
                            );
                        }
                    })}
                    </Card.Body>
                <Footer />
            </Card>
            <div>SELECTED DAY</div>
        </>
    )
}