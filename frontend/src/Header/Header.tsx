import "./Header.css";
import {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import normalImage from "./burger-icon.png";
import clickedImage from "./close-icon.png";


type Props = {
    user: string
}
export default function Header(headerProps: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    const handleToggleClick = () => {
        setIsOpen(!isOpen);
        setIsClicked(!isClicked);
    }

    const handleLogout = () => {
        axios.get('/api/user/currentUser/' + headerProps.user)
            .then(response => {
                console.log(response.data);
                console.log(user);
                setUserId(response.data)
                console.log(userId)
            })
            .catch(error => {
                console.error('Fehler beim Abmelden:', error);
            });
        setUser("");
        setIsOpen(false);
    };

    return (
        <>
            <div className={"header"}>
                <div className="logo-row">
                    <Link to={"/home"}>
                        <img className={"header-textlogo"} src={"./icons/textlogo.png"} alt="Logo"/>
                    </Link>
                    <button className={"menu-toggle"} onClick={handleToggleClick}>
                        <img className={"header-burger-icon"} src={isClicked ? clickedImage: normalImage} alt={"Burger Icon"}/>
                    </button>
                </div>

            </div>
            <div className={`menu ${isOpen ? 'open' : ''} link-column` }>
                <Link className={"text-white btn-a-standard"} to={"/addLabel"} onClick={() => setIsOpen(false)}>Label erstellen</Link>
                <Link className={"text-white btn-a-standard"} to={"/labelOverview"} onClick={() => setIsOpen(false)}>Labelübersicht</Link>
                <Link className={"text-white btn-a-standard"} to={"/newEntry"} onClick={() => setIsOpen(false)}>Eintrag erstellen</Link>
                <Link className={"text-white btn-a-s"} to={"/"} onClick={handleLogout}>Logout</Link>
            </div>
        </>
    );
}
