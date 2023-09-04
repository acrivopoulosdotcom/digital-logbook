import Container from "react-bootstrap/Container";
import './Footer.css'
import {Image} from "react-bootstrap";
import {useState} from "react";


export default function Footer() {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    return (
        <>
            <Container className="footer"

            >
                <a href="#header"
                   onMouseEnter={() => setIsHovered(true)}
                   onMouseLeave={() => setIsHovered(false)}
                   onTouchStart={() => setIsActive(true)}
                   onTouchEnd={() => setIsActive(false)}
                >
                    <Image className="footer-icon" src={isHovered || isActive ? "./icons/red-card.png" : "./icons/blue-card.png"} rounded fluid />
                </a>
            </Container>
        </>
    )
}
