import Container from "react-bootstrap/Container";
import './Footer.css'
import {Image} from "react-bootstrap";


export default function Footer() {
    return (
        <>
            <Container className="footer">
                <a href="#header">
                    <Image className="footer-icon" src="/icons/Icon small.png" rounded fluid />
                </a>
            </Container>
        </>
    )
}