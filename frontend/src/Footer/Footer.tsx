import Container from "react-bootstrap/Container";
import './Footer.css'
import {Image} from "react-bootstrap";



export default function Footer() {
    return (
        <>
            <Container className="footer">
                <Image className="footer-icon" src={"./icons/book-basic-icon.png"} fluid />
            </Container>
        </>
    )
}
