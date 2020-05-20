import * as React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap/';
// import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SweetAlert from "react-bootstrap-sweetalert";
import { faUser, faQuestionCircle, faInfoCircle, faHiking, faMountain } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.png';

interface IBarraSUperiorInicioProps {
  setInicioClicked: () => void
  setRegistroClicked?: () => void

}
interface IBarraSuperiorState {
  alert: React.ReactNode
}

export default class BarraSuperior extends React.Component<IBarraSUperiorInicioProps, IBarraSuperiorState> {
  constructor(props: IBarraSUperiorInicioProps) {
    super(props)
    this.state = {
      alert: null
    }

  }
  public onReceiveInput = () => {
    // tslint:disable-next-line: no-console
    //  console.log(`value ${value} otro: ${value.length}`);
    this.setState({
      alert: (
        <SweetAlert
          info={true}
          // customIcon={logo}
          title=" "
          showCancel={true}
          showCloseButton={true}
          confirmBtnText="Registrarme"
          cancelBtnText="Ahora no"
          onCancel={this.hideAlert}
          onConfirm={this.onClickRegistro}>
          Para ver los panoramas outdoor de naturaleza y aventura debes registrarte.
        </SweetAlert>
      ),
    });
  };
  public hideAlert = () => {
    this.setState({
      alert: null,
    });
    // location.href = "/app/admin"
  };
  public onClickRegistro = () => {
    // location.href = '/register'
    location.href = "/register"

  }

  public render() {
    const { setInicioClicked } = this.props
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
              <Nav.Link onClick={this.onReceiveInput}><FontAwesomeIcon icon={faMountain} size="1x" /> Todos los panoramas </Nav.Link>
              <Nav.Link href="/register"><FontAwesomeIcon icon={faHiking} /> Registrarse</Nav.Link>
              <Button variant="outline-success" onClick={setInicioClicked} >
                <FontAwesomeIcon icon={faUser} />  Iniciar sesión</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.state.alert}
      </div>
    );
  }
}
