import * as React from 'react';
import { Navbar, Nav} from 'react-bootstrap/';
// import { Link } from 'react-router-dom'
// import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faQuestionCircle, faInfoCircle, faHiking, faMountain, faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import logo from '../images/logo.png';

interface IBarraSUperiorInicioProps {
  todosClicked?: () => any
  realizadosClicked?: () => any
  porRealziarClicked?: () => any

}

export default class BarraSuperiorUsuario extends React.Component<IBarraSUperiorInicioProps> {
  public render() {
   
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
              <Nav.Link href="/app/allpanoramas"><FontAwesomeIcon icon={faQuestionCircle} /> Ayuda </Nav.Link>
              <Nav.Link href="#acercada"><FontAwesomeIcon icon={faInfoCircle} /> Acerca de..</Nav.Link>
            </Nav>
            <Nav>

               <Nav.Link href="/app/allpanoramas"><FontAwesomeIcon icon={faHiking}  size="1x"/> Panoramas por realizar </Nav.Link>
               <Nav.Link href="/app/allpanoramas"><FontAwesomeIcon icon={faThumbsUp} size="1x" /> Panoramas realizados </Nav.Link>
               <Nav.Link href="/app/allpanoramas"><FontAwesomeIcon icon={faMountain} size="1x" /> Todos los panoramas </Nav.Link>
              <Nav.Link href="/app/perfil"><FontAwesomeIcon icon={faUser} size="1x" /> Perfil </Nav.Link>
              

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
