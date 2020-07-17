import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firestore } from 'firebase';
// import { IServices } from '../../../service';
import { ThunkDispatch } from 'redux-thunk';
import Panorama from '../../../components/Panorama'
import { IState } from '../../../ducks'
import * as postsDuck from '../../../ducks/Panoramas'
import { Spinner, Container, Alert, Button } from 'react-bootstrap'
// import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faHiking, faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons';
import * as utils from '../../../utils';
import SweetAlert from "react-bootstrap-sweetalert";
// import services from 'src/service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IPanorama } from '../../../ducks/Panoramas';



interface IPanoramasRealizados {
    fetchPanoramasRealizados: () => void
    porRealizarAdd: (p: IPanorama, fecha: Date) => any

    // xrealizar: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista  "Por realizar" 
    //  realizado: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista de "Realizados"
    //  share: (a: string) => void // vamos a necesitar la referencia del panorama  al que le damos share
    // sharetemp: (a: string) => void
    fetched: boolean
    loading: boolean
    data: postsDuck.IDataPanorama

}
interface IStateRealizados {
    fechaInicial: Date
    mensajeAccion: string
    uiobtenerFecha: boolean
    alert: React.ReactNode
    panorama: IPanorama
    work: boolean
}

class PanoramasRealizados extends React.Component<IPanoramasRealizados, IStateRealizados>{
    constructor(props: IPanoramasRealizados) {
        super(props)
        const { fetchPanoramasRealizados, fetched } = props
        this.state = {
            alert: null,
            fechaInicial: new Date(),
            mensajeAccion: "",
            panorama: {
                calificacion: 0,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                descripcion: "",
                direccion: "string",
                exigenciaFisica: 0,
                lat: 0,
                lng: 0,
                nombre: "string",
                urlFacebook: " string",
                urlImagen: "string",
                urlImagen1: " string",
                urlImagen2: " string",
                urlMapUbicacion: "string",
                valor: 0,
            },



            uiobtenerFecha: false,
            work: false,
        }
        if (fetched) {
            return
        }

        fetchPanoramasRealizados()
    }

    /**
     *  Cambia el estado para poder obter la fecha que el usuario ingresará
     */
    public uiObterFecha = (panorama: IPanorama, mensajeAccion: string) => () => {
        this.setState({
            mensajeAccion,
            panorama,
            uiobtenerFecha: true

        })
    }

    public cancelAdd = () => {
        this.setState({
            uiobtenerFecha: false
        });

    }
    public handleChangeDate = (date: Date) => {
        this.setState({
            fechaInicial: date
        });
    };



    public onAlert = (irA: string, ruta: string) => {
        // tslint:disable-next-line: no-console
        //  console.log(`value ${value} otro: ${value.length}`);
        this.setState({
            alert: (
                <SweetAlert
                    success={true}
                    // customIcon={logo}
                    title="¡Listo!"
                    showCancel={true}
                    showCloseButton={true}
                    confirmBtnText="Sí"
                    cancelBtnText="No"
                    onCancel={this.hideAlert(true)}
                    onConfirm={this.onClickRegistro(ruta)}>
                    El panorama  ha sido agregado a tu lista de {irA} ¿Deseas revisarla ahora?
                </SweetAlert>
            ),
        });
    };


    public onAlertError = (error: string) => {
        // tslint:disable-next-line: no-console
        //  console.log(`value ${value} otro: ${value.length}`);
        this.setState({
            alert: (
                <SweetAlert
                    error={true}
                    // customIcon={logo}
                    title="¡Error!"
                    //  showCancel={true}
                    showCloseButton={true}
                    confirmBtnText="OK"
                    //     cancelBtnText="No"
                    //  onCancel={this.hideAlert}
                    onConfirm={this.hideAlert(false)}>
                    Se ha producido un error: {error}
                </SweetAlert>
            ),
        });
    };



    public hideAlert = (redireccionar: boolean) => () => {
        this.setState({
            alert: null,
        });
        if (redireccionar) {
            location.href = "/app/realizados"
        }

    };

    public onClickRegistro = (ruta: string) => () => {
        // location.href = '/register'
        location.href = `/app/${ruta}`

    }

    public render() {
        const { data, loading } = this.props
        const { work, uiobtenerFecha, mensajeAccion } = this.state

        //  const {auth, db} = service   
        //   const uid = auth.currentUser ? auth.currentUser.uid : undefined
        // const {loading} = this.state
        // tslint:disable-next-line: no-console
        // console.log("Data", data)
        // tslint:disable-next-line: no-console
        // console.log("panorama", panorama)
        // tslint:disable-next-line: no-console
        // console.log("fecha", fechaInicial)




        if (uiobtenerFecha) {
            return (
                <Alert variant="info" className="container">
                    <Alert.Heading className="d-flex container justify-content-center" > ¿Cuándo {mensajeAccion}? Selecciona una fecha. </Alert.Heading>
                    <div className="d-flex  flex-wrap container justify-content-center">
                        <DatePicker
                            selected={this.state.fechaInicial}
                            onChange={this.handleChangeDate}
                        />  <Button variant="outline-primary" onClick={this.porRealizar} ><FontAwesomeIcon icon={faCheckCircle} /> Agregar </Button>
                        <Button variant="outline-secondary" onClick={this.cancelAdd} ><FontAwesomeIcon icon={faBan} /> Cancelar </Button>
                        {this.state.alert}
                    </div>
                </Alert>
            );
        }

        if (work) {
            return (
                <Alert variant="info" className="container">
                    <Alert.Heading className="d-flex container justify-content-center" > Procesando </Alert.Heading>

                    <div className="d-flex container justify-content-center">
                        <Spinner
                            className="m-5 align-middle"
                            animation="border"
                            variant="warning"
                        />
                    </div>
                </Alert>
            );
        }

        if (loading) {

            return (<Container fluid={true} className="align-content-center justify-content-center d-flex p-5">
                <Spinner className="mt-5 align-middle" animation="border" variant="primary" />
            </Container>)

        } else if (Object.keys(data).length > 0) {


            return (<div className="d-flex flex-wrap container justify-content-center">
                <Alert variant="light" className="container">
                    <Alert.Heading>
                        <div style={{
                            color: "#689f38"
                        }}>
                            <FontAwesomeIcon icon={faHiking} /> Tus panoramas realizados
                        </div>
                    </Alert.Heading>
                    <div className="d-flex pl-5">
                        Tienes {Object.keys(data).length} panoramas en esta lista
                      </div>
                    <hr />
                    <p className="mb-0 font-weight-bold">
                        <code> <FontAwesomeIcon icon={faChartLine} size="2x" /> Tu nivel es  {utils.nivelEplorador(Object.keys(data).length)}. </code>
                    </p>
                </Alert>
                {Object.keys(data).map(x => {
                    const post = data[x]
                    return <div key={x} style={{ margin: '0 auto' }}>
                        <Panorama
                            setSharedClicked={this.handleShare(x)}
                            urlImagen={post.urlImagen}
                            nombre={post.nombre}
                            descripcion={post.descripcion || ""}
                            urlImagen1={post.urlImagen1}
                            urlImagen2={post.urlImagen2}
                            urlFacebook={post.urlFacebook}
                            urlInstagram={post.urlInstagram}
                            urlTripAdvisor={post.urlTripAdvisor}
                            urlWeb={post.urlWeb}
                            calificacion={post.calificacion}
                            exigenciaFisica={post.exigenciaFisica}
                            valor={post.valor}
                            porRealizar={this.uiObterFecha(post, "deseas cumplir este deseo")}
                            // realizado={this.handleRealizado(x)}
                            titulo={"Realizado"}
                            nombuton={"Más informácion"}
                            hidenCompartir={false}
                            hiddenRealizado={true}
                            hiddenXRealizar={false}
                            lat={post.lat}
                            lng={post.lng}
                            direccion={post.direccion}
                            btnComentario={true}

                        />

                    </div>
                })}
                {this.state.alert}
            </div>)

        } else {
            return (<Alert variant="info" className="container">
                <Alert.Heading>¡Hola! Nada por acá.</Alert.Heading>
                <p>
                    No tienes panoramas en tu lista de  "Realizados". Cada vez que concretes un panorama, márcalo como "Realizado" para que aparezca en esta lista.
              </p>
                <hr />
                <p className="mb-0">
                    Sigue explorando y conociendo nuevos lugares. Y que la naturaleza no note que estuviste ahí.
            </p>
            </Alert>)
        }

    }
    private porRealizar = () => {
        const { panorama, fechaInicial } = this.state
        const { porRealizarAdd } = this.props
        this.setState({
            uiobtenerFecha: false,
            work: true,
        });
        porRealizarAdd(panorama, fechaInicial).then((res: string) => {
            if (res === "OK") {
                this.setState({
                    work: false,
                });

                this.onAlert("Deseados", "xrealizar")

            } else {
                this.setState({
                    work: false,
                });
                this.onAlertError(res)
            }
        })
    }

    private handleShare = (id: string) => () => {
        // const { share } = this.props
        // share(id)
        // Pendiente
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
export default connect(mapStateToProps, mapDispatchToProps)(PanoramasRealizados)

