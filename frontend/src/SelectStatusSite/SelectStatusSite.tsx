import Header from "../Header/Header.tsx";
import "./SelectStatus.css"
import {Card, Image} from "react-bootstrap";
import Footer from "../Footer/Footer.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";

type Entry = {
    id: string,
    userId: string,
    status: string,
    titel: string,
    description: string,
    formattedDate: string,
    prio: string,
    label: string,
    notes: string,
}

type Props = {
    userId: string,
    user: string
}

export default function SelectStatusSite(selectStatusProps: Props) {
    const userId = selectStatusProps.userId
    const [entries, setEntries] = useState<Entry[]>([]);
    const [status, setStatus] = useState("Erledigen");

    function handleSelectStatus(event:ChangeEvent<HTMLSelectElement>) {
        setStatus(event.target.value);
    }

    async function getResponseAfterDelete (userId: string, formattedDate: string) {

        try {
            const getResponse = await axios({
                method: 'get',
                url:`/api/entries/getAllEntriesByDate/${userId}/${formattedDate}`,
            });
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

    const changeStatus = (entryId: string, entryStatus: string) => {
        const updatedEntries = entries.map((entry) => {
            if (entry.id === entryId) {
                entry.status = "Abgeschlossen";
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

                const filteredEntries = updatedEntries.filter((entry) => entry.status === entryStatus);
                setEntries(filteredEntries);
            })
            .catch(function (error) {
                console.error("Fehler beim Ändern des Status: ", error);
            });
    };

    useEffect(() => {
        axios({
            method: 'get',
            url: `/api/entries/getAllEntriesByStatus/${userId}/${status}`,
        })
            .then(function(response) {
                console.log("Response Status: ", response.status);
                console.log("Response Body: ", response.data);
                console.log(userId);
                console.log(status);
                setEntries(response.data);
            })
    }, [userId, status])

    return (
        <>
            <Card className="wrapper">
                <Header />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/select-status-img.png"></Image>
                    <h2 className={"flex-div"}>Wähle den Status:</h2>
                </Card.Title>
                <Card.Body className="card-body no-pad" style={{ width: '18rem' }}>
                    <select className={"btn-a-standard btn-fullwidth"} onChange={handleSelectStatus}>
                        <option value="Erledigen">Erledigen</option>
                        <option value="Abgeschlossen">Abgeschlossen</option>
                    </select>
                    <div className={"entry-board extra-pad"}>
                        {entries.map((entry) => {
                            if (entry.status === "Erledigen") {
                                return (
                                    <div className={"entry-card input-form-reverse"} key={entry.id}>
                                        <div className={"border-white padding-top"}>
                                            <p className={"text-white"}>{entry.titel}</p>
                                            <p className={"text-white"}>{entry.notes}</p>
                                            <p className={"text-white"}>{entry.prio}</p>
                                        </div>
                                        <div className={"btn-row"}>
                                            <button className={"btn-a-standard btn-fullwidth"}
                                                    onClick={() => changeStatus(entry.id, entry.status)}>
                                                <Image className={"btn-icon-size"} src={"/icons/white-done.png"}/>
                                            </button>
                                            <button className={"btn-a-standard btn-fullwidth"} onClick={() => handleDeleteBtn(entry.id, entry.userId, entry.formattedDate)}>
                                                <Image className={"btn-icon-size"} src={"/icons/white-cross.png"}/>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            if (entry.status === "Abgeschlossen") {
                                return (
                                    <div className={"entry-card input-form-reverse"}>
                                    <div className={"border-white padding-top"} key={entry.id}>
                                        <p className={"text-white"}>{entry.titel}</p>
                                        <p className={"text-white"}>{entry.notes}</p>
                                        <p className={"text-white"}>{entry.formattedDate}</p>
                                    </div>
                                <div className={"btn-row"}>
                                    <button className={"btn-a-standard btn-fullwidth"} onClick={() => handleDeleteBtn(entry.id, entry.userId, entry.formattedDate)}>
                                        <Image className={"btn-icon-size"} src={"/icons/white-cross.png"}/>
                                    </button>
                                </div>
                                    </div>

                                )}
                            })}
                    </div>
                </Card.Body>
                <Footer />
            </Card>
            {/*<p>SELECT STATUS</p>*/}
        </>
    );
}