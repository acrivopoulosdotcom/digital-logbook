// @ts-nocheck
import "./SelectDay.css";
import {Card, Image} from "react-bootstrap";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import React, {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import Calendar from "react-calendar";

type ValuePiece = Date;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Entry = {
    id: string,
    userId: string,
    status: string,
    titel: string,
    description: string,
    formattedDate: string,
    prio: string,
    label: string,
    notes: string
};

type Props = {
    userId: string,
    user: string
}

export default function SelectDaySite(selectDayProps: Props) {

    const [date, setDate] = useState<Value>(new Date());
    const currentDate = date.toLocaleString("de-DE");
    const [entries, setEntries] = useState<Entry[]>([]);
    const [formattedDate, setFormattedDate] = useState("");
    const [status, setStatus] = useState("Erledigen");
    const userId = selectDayProps.userId;
    console.log("Entries - Anfang der Seite: ",entries);

    const changeStatus = (entryId: string, entryStatus: string) => {
        const updatedEntries = entries.map((entry) => {
            if (entry.id === entryId) {
                entry.status = "Abgeschlossen";
                console.log("test");
                console.log("Entry Status nach dem Wechsel: ",entry.status);
            }
            return entry;
        });

        axios({
            method: 'put',
            url: `/api/entries/changeStatus/${entryId}`,
            data: { status: "Abgeschlossen" },
        })
            .then(function (response) {
                console.log("Status erfolgreich geändert: ", response.status);
                console.log("Entry-Status: ", entryId);

                const filteredEntries = updatedEntries.filter((entry) => (
                    entry.status === entryStatus
            ));
                setEntries(filteredEntries);
            })
            .catch(function (error) {
                console.error("Fehler beim Ändern des Status: ", error);
            });
    };

    async function getResponseAfterDelete (userId: string, formattedDate: string) {

        try {
            const getResponse = await axios({
                method: 'get',
                url:`/api/entries/getAllEntriesByDate/${userId}/${formattedDate}`,
            });
            console.log("Get Response Status - getResponseAfterDelete: ", getResponse.status);
            setEntries(getResponse.data);
        } catch (error) {
            console.log("Error get request: ", error);
        }
    }

    const handleDeleteBtn = async (id: string, userId: string, formattedDate: string) => {

        try {
            const deleteResponse = await axios({
                method: 'delete',
                url: `/api/entries/deleteEntry/${id}`,
            });
            console.log("Eintrag gelöscht " + id);
            console.log("Delete Status: ", deleteResponse.status)

        } catch (error) {
            console.log("Error handling delete request: ", error);
        }

        await getResponseAfterDelete(userId, formattedDate);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleCalendarChange = (selectedDate: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const newFormattedDate = selectedDate;
        setDate(selectedDate);
        console.log("NewFormattedDate: Z. 71" + newFormattedDate);
        setFormattedDate(newFormattedDate);
    }

    function handleSelectStatus(event:ChangeEvent<HTMLSelectElement>) {
        const selectedStatus = event.target.value;
        setStatus(selectedStatus);
        event.preventDefault();
        axios({
            method: 'get',
            url: `/api/entries/getAllEntriesByStatus/${userId}/${selectedStatus}`,
        })
            .then(function(response) {
                console.log("Response Status/SelectStatus: ", response.status);
                console.log("Response Body/SelectStatus: ", response.data);
                console.log("Selected Status: ", status);
               setEntries(response.data)
            })
    }

    useEffect(() => {
        const formattedDate = currentDate.toLocaleString().split(',')[0];

        axios({
            method: 'get',
            url:`/api/entries/getAllEntriesByDate/${userId}/${formattedDate}`,
        })
            .then(function (response) {
                console.log("Response Status: ", response.status);
                console.log("Response Body: ", response.data);
                const filteredEntries = response.data.filter((entry) => entry.status === status);
                setEntries(filteredEntries);
                console.log(userId);
                console.log("FormattedDate Zeile 89: " + formattedDate);
            })
    }, [userId, formattedDate, currentDate,status])

    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/calendar-img.png"></Image>
                    <h2>Wähle den Tag</h2>
                </Card.Title>

                <Card.Body className="card-body gap no-pad" style={{ width: '18rem' }}>
                    <Calendar
                        value={date}
                        onChange={handleCalendarChange}
                    />
                    <div className={"flex-row"}>
                        <select className={"btn-a-standard btn-fullwidth text-center"} onChange={handleSelectStatus}>
                            <option value={"Erledigen"}>Erledigen</option>
                            <option value={"Abgeschlossen"}>Abgeschlossen</option>
                        </select>
                    </div>
                        {entries && entries.length>0 ? entries.map((entry) => (
                                    <div className={"entry-board"} key={entry.id}>
                                        <div className={"entry-card input-form-reverse"}>
                                            <div className={"border-white padding-top"} key={entry.id}>
                                                <p className={"text-white"}>{entry.titel}</p>
                                                <p className={"text-white"}>{entry.notes}</p>
                                                <p className={"text-white"}>{entry.prio}</p>
                                            </div>
                                            <div className={"btn-row"}>
                                                {entry.status === "Erledigen" && (
                                                    <button className={"btn-a-standard btn-fullwidth"}
                                                        onClick={() => changeStatus(entry.id, entry.status, entry.formattedDate)}>
                                                            <Image className={"btn-icon-size"} src={"/icons/white-done.png"}/>
                                                    </button>
                                                )}
                                                <button className={"btn-a-standard btn-fullwidth"} onClick={() => handleDeleteBtn(entry.id, entry.userId, entry.formattedDate)}>
                                                    <Image className={"btn-icon-size"} src={"/icons/white-cross.png"}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                <p></p>
                            )}
                    </Card.Body>
                <Footer />
            </Card>
            {/*<div>SELECTED DAY</div>*/}
        </>
    )
}