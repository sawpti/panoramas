import * as React from 'react';
import { Navbar, Nav } from 'react-bootstrap/';
import service from '../service'
// import SweetAlert from 'react-bootstrap-sweetalert';
// import { Link } from 'react-router-dom'
// import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faQuestionCircle, faInfoCircle, faHiking, faMountain, faThumbsUp, faSignOutAlt, faUserLock } from '@fortawesome/free-solid-svg-icons'
import logo from '../images/logo.png';

interface IBarraSUperiorInicioProps {
  todosClicked?: () => any
  realizadosClicked?: () => any
  porRealzarClicked?: () => any
  closeSesion: () => any

}

interface IState {
  loading: boolean
  rol: string

}

export default class BarraSuperiorUsuario extends React.Component<IBarraSUperiorInicioProps, IState> {
  constructor(props: IBarraSUperiorInicioProps) {
    super(props);
    this.state = {
      loading: true,
      rol: "turista"
    };

  };

  public async componentDidMount() {
    const { auth, db } = service
    const u = auth.currentUser
    //   const uid= u?u.uid:"usuario no existe"

    if (u != null) {

      const snaps = await db.collection('users')
        .where('uid', '==', u.uid)
        .limit(1)
        .get()
      const users = {}
      snaps.forEach(x => users[x.id] = x.data())
      // Si el usuario verificó su e-mail, pregunto si este cambio se actulizó en firestore
      if (users[u.uid].role === "admin") {
        this.setState({
          rol: "admin"

        })

      }
      this.setState({
        loading: false
      })



    }
  }

  public render() {

    const { loading, rol } = this.state

    if (loading) {
      return (

        <div className="div"> cargando</div>
      )

    } else {

      if (rol === "admin") {
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
                  <Nav.Link href="/app/allpanoramas"><FontAwesomeIcon icon={faMountain} size="1x" /> Todos los panoramas </Nav.Link>
                  <Nav.Link href="/app/xrealizar"><FontAwesomeIcon icon={faHiking} size="1x" /> Panoramas por realizar </Nav.Link>
                  <Nav.Link href="/app/realizados"><FontAwesomeIcon icon={faThumbsUp} size="1x" /> Panoramas realizados </Nav.Link>
                  <Nav.Link href="/app/perfil"><FontAwesomeIcon icon={faUser} size="1x" /> Perfil </Nav.Link>
                  <Nav.Link href="/app/admin"><FontAwesomeIcon icon={faUserLock} size="1x" /> Admin </Nav.Link>
                  <Nav.Link onClick={this.closeSesion} ><FontAwesomeIcon icon={faSignOutAlt} size="1x" /> Cerrar sesión </Nav.Link>


                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        )
      }
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
                <Nav.Link href="/app/allpanoramas"><FontAwesomeIcon icon={faMountain} size="1x" /> Todos los panoramas </Nav.Link>
                <Nav.Link href="/app/xrealizar"><FontAwesomeIcon icon={faHiking} size="1x" /> Panoramas por realizar </Nav.Link>
                <Nav.Link href="/app/realizados"><FontAwesomeIcon icon={faThumbsUp} size="1x" /> Panoramas realizados </Nav.Link>
                <Nav.Link href="/app/perfil"><FontAwesomeIcon icon={faUser} size="1x" /> Perfil </Nav.Link>
                <Nav.Link onClick={this.closeSesion} ><FontAwesomeIcon icon={faSignOutAlt} size="1x" /> Cerrar sesión </Nav.Link>


              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

      )
    }


  }

  // private hideAlert = () => {
  //   return (
  //     < SweetAlert
  //       success={true}
  //       title="Cerra sesión!"
  //       onConfirm={this.hideAlert}
  //     >
  //       Has cerrado tu sesión
  //    </SweetAlert >

  //   )
  // }
  private closeSesion = () => {
    service.auth.signOut().then(() => {
      // tslint:disable-next-line: no-console
      console.log("Has salido")
    }).catch((error) => {
      // tslint:disable-next-line: no-console
      console.log("error", error)
      // alert(` Se ha producido un error  ${error}`)
    });

  }

}
