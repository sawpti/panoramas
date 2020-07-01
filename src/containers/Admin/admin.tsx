import * as React from 'react';
import { useState } from "react";
import service from '../../service'
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Spinner, Container, Alert, Button, Table, Card, Row, Col, Modal } from 'react-bootstrap';
// import Panorama from '../../components/PanoramaEdit'
import * as postsDuck from '../../ducks/Panoramas'
import { IState } from '../../ducks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain, faArrowAltCircleLeft, faRetweet, faArrowAltCircleUp, faPlusCircle, faDesktop, faUserFriends, faChartLine, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import EditarPanorama from '../../components/EditarPanorama';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap/';
import { panoramaMasRealizado, panoramaMasDeseado } from 'src/utils';




interface IAdmin {
  fetchPanoramasRealizadosByProveedor: () => void
  fetchPanoramasDeseadosByProveedor: () => void
  fetchFindPanoramaUsuario: (uid: string) => void
  findUsersByIdPanoramaMR: (idPanorama: string) => any
  findUsersByIdPanoramaMD: (idPanorama: string) => any
  editar: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista  "Por realizar" 
  guardar: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista de "Realizados"
  fetched: boolean
  loading: boolean
  data: postsDuck.IDataPanorama
  dataRealizadosByProveedor: postsDuck.IDataPanorama
  dataDeseadosByProveedor: postsDuck.IDataPanorama

}
interface IStateAdmin {
  lat?: number
  lng?: number
  direccion?: string
  calificacion?: number
  exigenciaFisica?: number
  idPanorama?: string
  descripcion?: string
  destacado?: string
  loading1: boolean
  rol: string
  uid: string
  mEditar: boolean
  pMasRealizado: any
  pMasDeseado: any
  nombre?: string
  usuariosByPanoramaMR: any
  usuariosByPanoramaMD: any
  urlImagen?: string
  urlImagen1?: string
  urlImagen2?: string
  urlInstagram?: string
  urlFacebook?: string
  urlTripAdvisor?: string
  urlWeb?: string
  urlMapUbicacion?: string
  uiSeleccionada: string // Dashboard, Panoramas,Usuarios
  valor?: number
  usuarios?: any

}




// const volver = () => {

//   return (
//     <div>
//       volver asfdasd
//     </div>
//   )
// }


function ModalEstadisticasMasRealizado(usersByPanoramas: any) {
  let users = {};

  Object.keys(usersByPanoramas).map((x) => {
    users = usersByPanoramas[x];
  });


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button block={true} variant="outline-info" onClick={handleShow}>
        <FontAwesomeIcon icon={faChartLine} /> Información detallada
          </Button>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton={true}>
          <Modal.Title id="example-custom-modal-styling-title">
            Panorama más realizado. Últimos {Object.keys(users).length} visitantes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            responsive={true}
            striped={true}
            bordered={true}
            hover={true}
          >
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Procedencia</th>
                <th>Fecha visita</th>
                <th>Calificación otorgada</th>
                <th>Enviar mensaje</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(users).map((x) => {
                const user = users[x];


                return (
                  <tr key={x}>
                    <td>{user.nombre}</td>
                    <td>{user.procedencia}</td>
                    <td>
                      {new Date(
                        user.fechaVisita.toDate()
                      ).toLocaleDateString()}
                    </td>
                    <td>{user.califiacionOtorgada}</td>
                    <td className="d-flex justify-content-center">
                      {" "}
                      <Button variant="outline-info">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <p>
            Esta tabla muestra la información de los últimos 50 visitantes
            que han realizado el panorama. Si el panorama ha sido realizado
            menos de 50 veces, muestra todos los usuarios que lo han
            realizado. Puedes enviar un e-mail al usuario, agredeciendole o saludandolo, con la función "Enviar mensaje"
              </p>
        </Modal.Body>
      </Modal>
    </>
  );

}
function ModalEstadisticasMasDeseado(usersByPanoramas: any) {
  let users = {};

  Object.keys(usersByPanoramas).map((x) => {
    users = usersByPanoramas[x];
  });


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button block={true} variant="outline-info" onClick={handleShow}>
        <FontAwesomeIcon icon={faChartLine} /> Información detallada
          </Button>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton={true}>
          <Modal.Title id="example-custom-modal-styling-title">
            Panorma más de desado. Últimos {Object.keys(users).length} visitantes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            responsive={true}
            striped={true}
            bordered={true}
            hover={true}
          >
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Procedencia</th>
                <th>Fecha que espera visitar</th>
                <th>Enviar mensaje</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(users).map((x) => {
                const user = users[x];


                return (
                  <tr key={x}>
                    <td>{user.nombre}</td>
                    <td>{user.procedencia}</td>
                    <td>
                      {new Date(
                        user.fechaDeseo.toDate()
                      ).toLocaleDateString()}
                    </td>
                    <td className="d-flex justify-content-center">
                      {" "}
                      <Button variant="outline-info">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <p>
            Esta tabla muestra la información de los últimos 50 usuarios
            que han marcado el panorama como deseado. Si el panorama ha sido marcado como deseados
            menos de 50 veces, muestra todos los usuarios.
            Puedes enviar un e-mail al usuario ofreciendole alguna oferta personalizada con la función "Enviar mensaje"
              </p>
        </Modal.Body>
      </Modal>
    </>
  );

}





class Admin extends React.Component<IAdmin, IStateAdmin> {

  constructor(props: IAdmin) {
    super(props)
    const { fetched, fetchPanoramasRealizadosByProveedor, fetchPanoramasDeseadosByProveedor } = props
    if (fetched) {
      return
    }
    fetchPanoramasRealizadosByProveedor()
    fetchPanoramasDeseadosByProveedor() // Carga en el estado los panoramas realizados por el usuario del proveedor que inició sesión
    this.state = {
      loading1: true,
      mEditar: false,
      pMasDeseado: {},
      pMasRealizado: {},
      rol: "turista",
      uiSeleccionada: "Dashboard",
      uid: "",
      usuariosByPanoramaMD: {},
      usuariosByPanoramaMR: {}

    };

  };


  public subMenuAdmin = () => {
    return (
      <Navbar collapseOnSelect={true} expand="lg" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link onClick={this.onClickSubMenu("Dashboard")}><FontAwesomeIcon icon={faDesktop} size="1x" /> Dashboard </Nav.Link>
            <Nav.Link onClick={this.onClickSubMenu("Panoramas")}><FontAwesomeIcon icon={faMountain} size="1x" /> Panoramas</Nav.Link>
            <Nav.Link onClick={this.onClickSubMenu("Usuarios")}><FontAwesomeIcon icon={faUserFriends} size="1x" /> Usuarios</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  public onClickSubMenu = (opcion: string) => () => {
    this.setState({
      uiSeleccionada: opcion

    })

  }
  public async componentDidMount() {
    const { auth, db } = service
    const u = auth.currentUser
    //   const uid= u?u.uid:"usuario no existe"

    if (u != null) {

      this.setState({
        loading1: true,

      })

      const snaps = await db.collection('users')
        .where('uid', '==', u.uid)
        .limit(1)
        .get()
      const users = {}
      snaps.forEach(x => users[x.id] = x.data())
      // Si el usuario verificó su e-mail, pregunto si este cambio se actulizó en firestore
      if (users[u.uid].role === "admin") {
        this.setState({
          rol: "admin",
          uid: u.uid

        })
      }
      this.props.fetchFindPanoramaUsuario(this.state.uid)
      const pMasR = panoramaMasRealizado(this.props.dataRealizadosByProveedor)
      const pMasD = panoramaMasDeseado(this.props.dataDeseadosByProveedor)

      this.setState({
        pMasDeseado: pMasD,
        pMasRealizado: pMasR,
      })
    }


    this.props.findUsersByIdPanoramaMR(this.state.pMasRealizado.idPanorama).then((res: any) => {
      // tslint:disable-next-line:no-console
      //  console.log("Lista de usuarios PR", res) // esto
      this.setState({
        usuariosByPanoramaMR: res
      })

    })
    // tslint:disable-next-line:no-console
    console.log("Id PMR", this.state.pMasDeseado.idPanorama) // esto
    this.props.findUsersByIdPanoramaMD(this.state.pMasDeseado.idPanorama).then((res: any) => {
      // tslint:disable-next-line:no-console
      //    console.log("Lista de usuarios PD", res) // esto
      this.setState({
        usuariosByPanoramaMD: res
      })

    })

    // tslint:disable-next-line:no-console
    //  console.log("Mas deseados", this.state.pMasDeseado) // esto


    try {
      //      const uid = auth.currentUser ? auth.currentUser.uid : "undefined"
      const snaps = await db.collection('users')
        .get()
      const users = {}
      snaps.forEach(x => users[x.id] = x.data())

      this.setState({
        usuarios: users
      })

      // tslint:disable-next-line: no-console
      //   console.log("Usuarios", users)

    } catch (e) {
      // tslint:disable-next-line: no-console
      console.log("Error", e)


    }


    // tslint:disable-next-line: no-console
    // console.log("Usuarios del estado:", this.state.usuarios)



    this.setState({
      loading1: false,

    })



  }

  public render() {
    const { loading1, rol, mEditar, uiSeleccionada, pMasRealizado, pMasDeseado, usuarios, usuariosByPanoramaMD, usuariosByPanoramaMR } = this.state
    const { data, loading } = this.props
    let i = 0;
    let j = 0;
    let k = 0
    // let usersPanoramasMD = {};
    // let usersPanoramasMR = {};
    // Object.keys(usuariosByPanoramaMD).map((x) => {
    //   usersPanoramasMD = usuariosByPanoramaMR[x];
    // });
    // Object.keys(usuariosByPanoramaMD).map((x) => {
    //   usersPanoramasMR = usuariosByPanoramaMR[x];
    // });
    // const a = [...usersPanoramasMR, ...usersPanoramasMD]
    // Object.keys(usuariosByPanoramaMD).concat(Object.keys(usuariosByPanoramaMR))
    // tslint:disable-next-line: no-console
    // console.log("Usuarios MD+MR", usuariosByPanoramaMD.concat(usuariosByPanoramaMR))
    // // tslint:disable-next-line: no-console
    // console.log("Usuarios MD", usuariosByPanoramaMR)



    // // tslint:disable-next-line: no-console
    // console.log(" dataRealizadosByProveedor", dataRealizadosByProveedor)
    // // tslint:disable-next-line: no-console
    // console.log(" dataDeseadosByProveedor", dataDeseadosByProveedor)


    if (loading1 && loading) {
      return (

        <Container fluid={true} className="align-content-center justify-content-center d-flex p-5">
          <Spinner className="mt-5 align-middle" animation="border" variant="info" />
        </Container>


      )

    } else {

      if (!mEditar && rol === "admin") {

        switch (uiSeleccionada) {
          case "Dashboard":
            return (
              <div className="d-flex flex-wrap container justify-content-between justify-content-center">
                <div className="d-flex  flex-wrap container justify-content-start">
                  {this.subMenuAdmin()}
                  <Alert variant="info" className="container">
                    <Alert.Heading>  <FontAwesomeIcon icon={faDesktop} /> Dashboard </Alert.Heading>
                    <p>
                      Dashboard
             </p>
                    <hr />


                  </Alert>
                </div>
                <Container>
                  <Row>
                    <Col className="d-flex container justify-content-center align-content-center">
                      <Card style={{ width: '18rem', margin: "5px", background: "#f5f5f5" }}>
                        <div className="h4 d-flex justify-content-center bg-light"> Más realizado</div>
                        <Card.Img variant="bottom" src={pMasRealizado.urlImagen} />
                        <Card.Body>

                          <Card.Text>
                            <div className="h4"> {pMasRealizado.nombre}</div>
                          De todos tus panoramas este es el más realizado por los usuarios <br />
                            <h3>{pMasRealizado.vecesRealizado} veces</h3>
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <ModalEstadisticasMasRealizado
                              usersByPanoramas={this.state.usuariosByPanoramaMR}
                            />
                          </div>

                        </Card.Body>
                      </Card>

                    </Col>
                    <Col className="d-flex container justify-content-center" >

                      <Card style={{ width: '18rem', margin: "5px", background: "#f5f5f5" }}>
                        <div className="h4 d-flex justify-content-center bg-light"> Más deseado</div>
                        <Card.Img variant="bottom" src={pMasDeseado.urlImagen} />
                        <Card.Body>

                          <Card.Text>
                            <div className="h4"> {pMasDeseado.nombre}</div>
                          De todos tus panoramas este es el más deseado por los usuarios <br />
                            <h3>{pMasDeseado.vecesRealizado} veces</h3>
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <ModalEstadisticasMasDeseado
                              usersByPanoramas={this.state.usuariosByPanoramaMD}
                            />
                          </div>
                        </Card.Body>
                      </Card>

                    </Col >

                    {/* { <Col className="d-flex container justify-content-center"> <Card style={{ width: '18rem', margin: "5px" }}>
                      <Card.Img variant="top" src={""} />
                      <Card.Body>
                        <Card.Title>Usuario con más panoramas realizados</Card.Title>
                        <Card.Text>
                          De todos tus panoramas este es el más deseado por los usuarios <br />
                          <h3>125 veces</h3>
                        </Card.Text>
                        <Button variant="primary">Info</Button>
                      </Card.Body>
                    </Card></Col>} */}


                  </Row>

                  {/* {  <Row>

                    <Col className="d-flex container justify-content-center"> <Card style={{ width: '18rem', margin: "5px" }}>
                      <Card.Img variant="top" src={""} />
                      <Card.Body>
                        <Card.Title>Usuario con más panoramas realizados</Card.Title>
                        <Card.Text>
                          De todos tus panoramas este es el más deseado por los usuarios <br />
                          <h3>125 veces</h3>
                        </Card.Text>
                        <Button variant="primary">Info</Button>
                      </Card.Body>
                    </Card>
                    </Col>

                  </Row>} */}


                </Container>






              </div>

            )


            break;
          case "Panoramas":
            return (
              <div className="d-flex flex-wrap container justify-content-start">
                {this.subMenuAdmin()}
                <Alert variant="info" className="container">
                  <Alert.Heading>  <FontAwesomeIcon icon={faMountain} /> Panoramas </Alert.Heading>
                  <div className="d-flex container justify-content-end position-absolute pr-5 pb-5" >

                    <Button variant="outline-primary" href="/app/admin/register"> <FontAwesomeIcon size="2x" icon={faPlusCircle} /> </Button>
                  </div>
                  <p>
                    Para agregar un nuevo panorama usa el botón <FontAwesomeIcon icon={faPlusCircle} /> y para editar usa el botón "Editar panorama"

               Tienes {Object.keys(data).length} panoramas bajo tu administración.
                      </p>
                  <hr />


                </Alert>
                <Table responsive={true} striped={true} bordered={true} hover={true}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Ubicacción</th>
                      <th>Acción</th>

                    </tr>
                  </thead>
                  <tbody>

                    {
                      Object.keys(data).map(x => {
                        const post = data[x]
                        i++
                        //  tslint:disable-next-line: no-console
                        // console.log("key ",x)

                        return <tr key={x}  >

                          <td>{i}</td>
                          <td><img src={post.urlImagen} style={{
                            borderRadius: '10%',
                            height: '80px',
                            width: '80px',
                          }} /></td>
                          <td>{post.nombre}</td>
                          <td>{post.direccion}</td>
                          <td>   <Button variant="outline-primary"
                            onClick={this.onEditar(
                              post.idPanorama || "No existe",
                              post.nombre,
                              post.descripcion,
                              post.urlMapUbicacion || "No ingresada",
                              post.urlWeb || "No ingresada",
                              post.urlFacebook,
                              post.urlInstagram || "No ingresada",
                              post.urlTripAdvisor || "No ingresada",
                              post.calificacion || 0,
                              post.exigenciaFisica,
                              post.valor,
                              post.destacado || "NO",
                              post.urlImagen,
                              post.urlImagen1,
                              post.urlImagen2,
                              post.lat,
                              post.lng,
                              post.direccion || ""

                            )}
                          // size="lg"
                          > Editar</Button></td>
                        </tr>


                      })}
                  </tbody>
                </Table>

              </div>


            )

            break;
          case "Usuarios":
            return (
              <div className="d-flex flex-wrap container justify-content-start">
                {this.subMenuAdmin()}
                <Alert variant="info" className="container">
                  <Alert.Heading>  <FontAwesomeIcon icon={faUserFriends} /> Usuarios </Alert.Heading>
                  <p>
                    Existen {Object.keys(usuarios).length} usuarios registrados
             </p>
                  <hr />


                </Alert>

                <div> <b>Usuarios del panorama más realizado</b> </div>

                <Table responsive={true} striped={true} bordered={true} hover={true}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Procedencia</th>
                      <th>Nombre</th>
                      <th>Fono/Email</th>
                      <th>Fecha visita</th>
                      <th>Acción</th>

                    </tr>
                  </thead>
                  <tbody>

                    {
                      Object.keys(usuariosByPanoramaMR).map(x => {
                        const post = usuariosByPanoramaMR[x]
                        i++
                        //  tslint:disable-next-line: no-console
                        // console.log("key ",x)

                        return <tr key={x}  >

                          <td>{i}</td>
                          <td>{post.procedencia}</td>
                          <td>{post.nombre}</td>
                          <td>{post.email}</td>
                          <td>  {new Date(
                            post.fechaVisita.toDate()
                          ).toLocaleDateString()} </td>

                          <td className="d-flex justify-content-sm-center">   <Button variant="outline-primary"

                          // size="lg"
                          > Enviar</Button></td>
                        </tr>


                      })}
                  </tbody>
                </Table>

                <div className="title"> <b>Usuarios del panorama más deseado</b></div>

                <Table responsive={true} striped={true} bordered={true} hover={true}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Procedencia</th>
                      <th>Nombre</th>
                      <th>Fono/Email</th>
                      <th>Fecha estimada</th>
                      <th>Acción</th>

                    </tr>
                  </thead>
                  <tbody>

                    {
                      Object.keys(usuariosByPanoramaMD).map(x => {
                        const post = usuariosByPanoramaMD[x]
                        j++
                        //  tslint:disable-next-line: no-console
                        // console.log("key ",x)

                        return <tr key={x}  >

                          <td>{j}</td>
                          <td>{post.procedencia}</td>
                          <td>{post.nombre}</td>
                          <td>{post.email}</td>
                          <td>  {new Date(
                            post.fechaDeseo.toDate()
                          ).toLocaleDateString()} </td>

                          <td className="d-flex justify-content-sm-center">   <Button variant="outline-primary"

                          // size="lg"
                          > Enviar</Button></td>
                        </tr>


                      })}
                  </tbody>
                </Table>

                <div > <b>Todos los usuarios</b></div>

                <Table responsive={true} striped={true} bordered={true} hover={true}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>UID</th>
                      <th>Nombre</th>
                      <th>Fono/Email</th>
                      <th>Fecha registro</th>
                      <th>Acción</th>

                    </tr>
                  </thead>
                  <tbody>

                    {
                      Object.keys(usuarios).map(x => {
                        const post = usuarios[x]
                        k++
                        //  tslint:disable-next-line: no-console
                        // console.log("key ",x)

                        return <tr key={x}  >

                          <td>{k}</td>
                          <td>{post.uid}</td>
                          <td>{post.nombre}</td>
                          <td>{post.email}/ {post.fono}</td>
                          <td>  {new Date(
                            post.createdAt.toDate()
                          ).toLocaleDateString()} </td>

                          <td className="d-flex justify-content-sm-center">   <Button variant="outline-primary"

                          // size="lg"
                          > Enviar</Button></td>
                        </tr>


                      })}
                  </tbody>
                </Table>


              </div>
            )
            break;

          default:
            break;
        }



      }
      if (mEditar && rol === "admin") {

        return (
          <div className="container">
            <a id="arriba" />

            <div className="d-flex justify-content-lg-between">
              <Button variant="outline-primary"
                onClick={this.volver}
              > <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Regresar</Button>
              <Button variant="outline-primary"
                onClick={this.actualizar}
              > <FontAwesomeIcon icon={faRetweet} /> Actualizar</Button>


            </div>

            <hr />

            <EditarPanorama
              idPanorama={this.state.idPanorama || ""}
              nombre={this.state.nombre || ""}
              descripcion={this.state.descripcion || ""}
              urlWeb={this.state.urlWeb}
              urlFacebook={this.state.urlFacebook}
              urlInstagram={this.state.urlInstagram}
              urlTripAdvisor={this.state.urlTripAdvisor}
              calificacion={this.state.calificacion}
              exigenciaFisica={this.state.exigenciaFisica}
              valor={this.state.valor}
              destacado={this.state.destacado}
              urlImagen={this.state.urlImagen}
              urlImagen1={this.state.urlImagen1}
              urlImagen2={this.state.urlImagen2}
              lat={this.state.lat || 0}
              lng={this.state.lng || 0}
              direccion={this.state.direccion || "No ingresada"}

            />
            <hr />
            <div className="d-flex justify-content-lg-between">
              <Button variant="outline-primary"
                onClick={this.volver}
              > <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Regresar</Button>
              <Button variant="outline-primary"
                onClick={this.actualizar}>
                <FontAwesomeIcon icon={faRetweet} /> Actualizar</Button>

              <Button variant="outline-primary">
                <FontAwesomeIcon icon={faArrowAltCircleUp} /><a href="#arriba" title="Ir Arriba"> Ir arriba</a> </Button>



            </div>
          </div>
        )
      }
      return (

        <div className="container d-flex justify-content-center text-primary"> No estás autorizado a administritar esta área de la aplicación. Contacta a tu asesor.</div>
      )

    }




  }

  public onEditar = (idP: string, nom: string, des: string, urlMap: string,
    urlW: string, urlF: string, urlI: string, urlT: string, cali: number, eF: number,
    v: number, d: string, urlIma: string, urlIma1: string, urlIma2: string, lt: number, ln: number, dic: string) => () => {

      this.setState({
        calificacion: cali,
        descripcion: des,
        destacado: d,
        direccion: dic,
        exigenciaFisica: eF,
        idPanorama: idP,
        lat: lt,
        lng: ln,
        mEditar: true,
        nombre: nom,
        urlFacebook: urlF,
        urlImagen: urlIma,
        urlImagen1: urlIma1,
        urlImagen2: urlIma2,
        urlInstagram: urlI,
        urlMapUbicacion: urlMap,
        urlTripAdvisor: urlT,
        urlWeb: urlW,
        valor: v


      })

    }
  public volver = () => {
    //  const { findUsersByIdPanorama } = this.props
    // Si no quiseramos actualizar la página, solo cambiariamos el estado
    this.setState({
      mEditar: false
    })
    // location.href = "/app/admin" // Se utliza esta opción para actualizar la página

  }
  public actualizar = () => {

    location.href = "/app/admin" // Se utliza esta opción para actualizar la página
    this.setState({
      uiSeleccionada: "Panoramas"
    })

  }



}

const mapStateToProps = (state: IState) => {
  const { Posts: { data, dataRealizadosByProveedor, dataDeseadosByProveedor, fetched, fetching } } = state
  const loading = fetching || !fetched


  // cuando retornemos el estado vamos a traer solamente loading pero tambien fetched
  // porque lo estamos usando en el constructor. Y data que son los datos de los posts
  return {
    data,
    dataDeseadosByProveedor,
    dataRealizadosByProveedor,
    fetched,
    loading,

  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators(postsDuck, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Admin)