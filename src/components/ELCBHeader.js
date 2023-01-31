import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function ELCBHeader() {
    return (
        <Navbar bg="black" expand="lg">
            <Container>
                <Navbar.Brand href="#home">EAST LONDON COMMUNITY BAND</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav >
                        <Nav.Link href="#home">Members</Nav.Link>
                        <Nav.Link href="#link">Attendance</Nav.Link>
                        <Nav.Link href="#link">Subscriptions</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default ELCBHeader;