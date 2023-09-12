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

    const [reloadKey, setReloadKey] = useState(0);

    const ChangeStatus = (entryId: string) => {
        // Find the entry by ID
        const updatedEntries = entries.map((entry) => {
            if (entry.id === entryId) {
                entry.status = "done";
            }
            return entry;
        });

        setEntries(updatedEntries);

        axios({
            method: 'put',
            url: `/api/entries/changeStatus/${entryId}`,
            data: { status: "done" },
        })
            .then(function (response) {
                console.log("Status erfolgreich geändert: ", response.status);
            })
            .catch(function (error) {
                console.error("Fehler beim Ändern des Status: ", error);
            });
    };

    const handleCalendarChange = (selectedDate) => {
        //Was ist der Unterschied in der Funktionsweise von function und const als Funktion (Schreibweise)
        //selectedDate ist hier markiert
        //wie können hier jetzt Daten übertragen werden ohne
        const newFormattedDate = selectedDate.toLocaleString().split(',')[0];
        setFormattedDate(newFormattedDate);
        setReloadKey((prevKey) => prevKey + 1);
    }

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
    }, [userId, formattedDate, reloadKey, currentDate])

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
                    onChange={handleCalendarChange}
                    //wird date aufgrund der Valuezuweisung automatisch in meine Funktion übertragen?

                />
                <p>formattedDate: {formattedDate}</p>
                {/*<p>currentDate: {currentDate}</p>*/}
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
                                                <p>{entry.prio}</p>
                                                <p>{entry.label}</p>
                                                <p>{entry.status}</p>
                                                <p>{entry.formattedDate}</p>
                                                <button className={"btn-a-standard"}>Speichern</button>
                                                <button className={"btn-a-standard"}
                                                        onClick={() => ChangeStatus(entry.id)}
                                                        //Wann muss ich diese Schreibweise anwenden
                                                    //hier habe ich einen definierten Wert zur Übergabe, der direkt ausgelesen werden muss
                                                    //aus einer Schleife?
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
                                            <p>{entry.formattedDate}</p>
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