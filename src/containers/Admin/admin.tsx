import * as React from 'react';
import service from '../../service'
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Spinner, Container, Alert, Button, Card } from 'react-bootstrap'
import Panorama from '../../components/PanoramaEdit'
import * as postsDuck from '../../ducks/Panoramas'
import { IState } from '../../ducks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import EditarPanorama from '../../components/EditarPanorama';

interface IAdmin {
  fetchPosts: () => void
  editar: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista  "Por realizar" 
  guardar: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista de "Realizados"
  fetched: boolean
  loading: boolean
  data: postsDuck.IDataPanorama
}
interface IStateAdmin {
  calificacion?: number
  exigenciaFisica?: number
  idPanorama?: string
  descripcion?: string
  destacado?: string
  loading1: boolean
  rol: string
  mEditar: boolean
  nombre?: string
  urlImagen?: string
  urlInstagram?: string
  urlFacebook?: string
  urlTripAdvisor?: string
  urlWeb?: string
  urlMapUbicacion?: string
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
    const { fetchPosts, fetched } = props
    if (fetched) {
      return
    }
    fetchPosts()
    this.state = {
      loading1: true,
      mEditar: false,
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
        loading1: false
      })



    }
  }

  public render() {
    const { loading1, rol, mEditar } = this.state
    const { data, loading } = this.props


    if (loading1 && loading) {
      return (



        <Container fluid={true} className="align-content-center justify-content-center d-flex p-5">
          <Spinner className="mt-5 align-middle" animation="border" variant="info" />
        </Container>


      )

    } else {


      if (!mEditar && rol === "admin") {

        return (
          <div className="d-flex flex-wrap container justify-content-center">

            <Alert variant="info" className="container">
              <Alert.Heading>  <FontAwesomeIcon icon={faMountain} /> Estos son todos los panoramas disponibles</Alert.Heading>
              <p>

                Tienes {Object.keys(data).length} panoramas disponibles en esta zona
                      </p>
              <hr />
              <div className="container d-flex justify-content-lg-end"> <Button href="/app/admin/register"> Agregar un panorama</Button> </div>

            </Alert>

            {Object.keys(data).map(x => {
              const post = data[x]
              //  tslint:disable-next-line: no-console
              // console.log("key ",x)

              return <div key={x} style={{ margin: '0 auto' }}>
                <Panorama
                  urlImagen={post.urlImagen}
                  nombre={post.nombre}
                  descripcion={post.descripcion}
                />
                <Card style={{ width: "18rem" }}>
                  <Card.Body className="d-flex justify-content-center">
                    <Card.Text>
                      {/* {(idP: string, nom: string, des: string, urlMap: string,
                        urlW: string, urlF: string, urlI: string, urlT: string)} */}
                      <Button variant="outline-primary"
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
                          post.urlImagen


                        )

                        }
                      // size="lg"
                      > Editar panorama</Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

            })}
          </div>


        )

      }
      if (mEditar && rol === "admin") {

        return (
          <div className="container">
            <Button variant="outline-primary"
              onClick={this.volver}
            > <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Regresar</Button>
            <hr />

            <EditarPanorama
              idPanorama={this.state.idPanorama || ""}
              nombre={this.state.nombre || ""}
              descripcion={this.state.descripcion || ""}
              urlWeb={this.state.urlWeb}
              urlMapUbicacion={this.state.urlMapUbicacion}
              urlFacebook={this.state.urlFacebook}
              urlInstagram={this.state.urlInstagram}
              urlTripAdvisor={this.state.urlTripAdvisor}
              calificacion={this.state.calificacion}
              exigenciaFisica={this.state.exigenciaFisica}
              valor={this.state.valor}
              destacado={this.state.destacado}
              urlImagen={this.state.urlImagen}
            />
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
    v: number, d: string, urlIma: string) => () => {

      this.setState({
        calificacion: cali,
        descripcion: des,
        destacado: d,
        exigenciaFisica: eF,
        idPanorama: idP,
        mEditar: true,
        nombre: nom,
        urlFacebook: urlF,
        urlImagen: urlIma,
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



}

const mapStateToProps = (state: IState) => {
  const { Posts: { data, fetched, fetching } } = state
  const loading = fetching || !fetched


  // cuando retornemos el estado vamos a traer solamente loading pero tambien fetched
  // porque lo estamos usando en el constructor. Y data que son los datos de los posts
  return {
    data,
    fetched,
    loading,

  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators(postsDuck, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Admin)