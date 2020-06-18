import * as React from 'react';
import service from '../../service'
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Spinner, Container, Alert, Button, Table, Card, Row, Col } from 'react-bootstrap';
// import Panorama from '../../components/PanoramaEdit'
import * as postsDuck from '../../ducks/Panoramas'
import { IState } from '../../ducks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain, faArrowAltCircleLeft, faRetweet, faArrowAltCircleUp, faPlusCircle, faDesktop, faUserFriends, faChartLine } from '@fortawesome/free-solid-svg-icons';
import EditarPanorama from '../../components/EditarPanorama';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap/';
import { panoramaMasRealizado, panoramaMasDeseado } from 'src/utils';
// import Usuario from '../../components/Usuario';



interface IAdmin {
  fetchPanoramasRealizadosByProveedor: () => void
  fetchPanoramasDeseadosByProveedor: () => void
  fetchFindPanoramaUsuario: (uid: string) => void
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

}

// const volver = () => {

//   return (
//     <div>
//       volver asfdasd
//     </div>
//   )
// }

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

        loading1: false,
        pMasDeseado: pMasD,
        pMasRealizado: pMasR,
      })
    }

    // tslint:disable-next-line: no-console
    //  console.log(" Util panoramasMasRealizados:", pMasR)
    // panoramasMasRealizados();

  }

  public render() {
    const { loading1, rol, mEditar, uiSeleccionada, pMasRealizado, pMasDeseado } = this.state
    const { data, loading } = this.props
    let i = 0;
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
                <div className="d-flex  flex-wrap container justify-content-end">
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
                            <Button block={true} variant="outline-info">
                              <FontAwesomeIcon icon={faChartLine} /> Información detallada
                            </Button>
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
                            <Button block={true} variant="outline-info">
                              <FontAwesomeIcon icon={faChartLine} /> Información detallada
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>

                    </Col >
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
                    </Card></Col>
                  </Row>
                  <Row>

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

                  </Row>
                </Container>






              </div>

            )


            break;
          case "Panoramas":
            return (
              <div className="d-flex flex-wrap container justify-content-end">
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
              <div className="d-flex flex-wrap container justify-content-end">
                {this.subMenuAdmin()}
                <Alert variant="info" className="container">
                  <Alert.Heading>  <FontAwesomeIcon icon={faUserFriends} /> Usuarios </Alert.Heading>
                  <p>
                    Usuarios
             </p>
                  <hr />


                </Alert>
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