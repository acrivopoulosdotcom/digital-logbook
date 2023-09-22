import "./SelectLabel.css";
import Header from "../Header/Header.tsx";
import {Card, Image} from "react-bootstrap";
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

export default function SelectLabelSite(selectLabelProps: Props) {

    const [labels, setLabels] = useState<Label[]>([]);
    const [label, setLabel] = useState<string>("");
    const [status, setStatus] = useState<string>("erledigen");
    const [entries, setEntries] = useState<Entry[]>([]);
    const userId = selectLabelProps.userId;

    function changeStatus(entryId: string, entryStatus:string) {
        const updatedEntries = entries.map((entry) => {
            if (entry.id === entryId) {
                entry.status = "Abgeschlossen";
            }
            return entry;
        });

        axios({
            method: 'put',
            url: `/api/entries/changeStatus/${entryId}`,
            data: { status: "done" },
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
    }

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

    function handleOnChangeLabel(event:ChangeEvent<HTMLSelectElement>) {
        const selectedLabel = event.target.value;
        setLabel(selectedLabel);
        console.log("Gesetztes Label: " + label)
        event.preventDefault();
        axios({
            method: 'get',
            url: `/api/entries/getAllEntriesByLabel/${userId}/${selectedLabel}`,
        })
            .then(function (response) {
                console.log("Response Status: ", response.status);
                setEntries(response.data);
            })}

    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/label/getAllLabels/' + userId,
        })
            .then(function(response) {
                setLabels(response.data);
                window.scrollTo(0,0);
            })
    }, [userId]);

    return (!userId ? <div>LOADING...</div> : (
        <>
            <Card className="wrapper">
                <Header user={selectLabelProps.user} />
                <Card.Title className="card-title">
                    <Image className="site-img" src="./images/select-label-img.png"></Image>
                </Card.Title>

                <Card.Body className="card-body gap no-pad" style={{ width: '18rem' }}>
                    <h2>Wähle das Label</h2>
                    <select className={"btn-a-standard btn-fullwidth"} onChange={handleOnChangeLabel}>
                        {labels.length > 0 && labels.map((label) => (
                            <option key={label.id} value={label.name}>{label.name}</option>
                        ))}
                    </select>
                    <select className={"btn-a-standard btn-fullwidth"} onChange={handleSelectStatus}>
                        <option value={"Erledigen"}>Erledigen</option>
                        <option value={"Abgeschlossen"}>Abgeschlossen</option>
                    </select>
                    {entries && entries.length>0 ? entries.map((entry) => (
                        <div className={"entry-board"} key={entry.id}>
                            <div className={"entry-card input-form-reverse"}>
                                <div className={"border-white padding-top"} key={entry.id}>
                                    <p className={"text-white"}>{entry.titel}</p>
                                    <p className={"text-white"}>{entry.notes}</p>
                                    <p className={"text-white"}>{entry.prio}</p>
                                    <p className={"text-white"}>{entry.formattedDate}</p>
                                </div>
                                <div className={"btn-row"}>
                                    {entry.status === "Erledigen" && (
                                        <button className={"btn-a-standard btn-fullwidth"} onClick={() => changeStatus(entry.id, entry.status)}>
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
        {/*<p>SELECT LABEL</p>*/}
        </>
    ))
}