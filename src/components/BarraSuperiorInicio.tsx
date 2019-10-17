import * as React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap/';
// import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,  faQuestionCircle, faInfoCircle, faHiking} from '@fortawesome/free-solid-svg-icons'
import logo from '../images/logo.png';

interface IBarraSUperiorInicioProps {
  setInicioClicked: () => void
  setRegistroClicked: () => void
 
  }

export default class BarraSuperior extends React.Component<IBarraSUperiorInicioProps> {
  public render() {
    const {setRegistroClicked, setInicioClicked} =this.props
    return (
      <div>
       <Navbar collapseOnSelect={true} expand="lg" bg="light" variant="light">
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="70"
              height="70"
              className="d-inline-block align-top"
              alt="Logo Saltos Pocolpén"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#ayuda"><FontAwesomeIcon icon={faQuestionCircle} /> Ayuda </Nav.Link>
              <Nav.Link href="#acercada"><FontAwesomeIcon icon={faInfoCircle} /> Acerca de..</Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-primary" onClick={setInicioClicked} >
                <FontAwesomeIcon icon={faUser} />  Iniciar sesión</Button>

              <Button variant="outline-success" onClick={setRegistroClicked}><FontAwesomeIcon icon={faHiking} />  Registrarse</Button>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
