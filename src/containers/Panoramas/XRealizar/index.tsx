import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Panorama from '../../../components/Panorama'
import { IState } from '../../../ducks'
import * as postsDuck from '../../../ducks/Panoramas'
import { Spinner, Container, Alert, Button } from 'react-bootstrap'
// import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons';
import SweetAlert from "react-bootstrap-sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IPanorama } from '../../../ducks/Panoramas';
import { firestore } from 'firebase';
import BeautyStars from 'beauty-stars';
interface IPanoramasxRealizar {
    fetchPanoramasPorRealizar: () => void
    realizadoAdd: (p: IPanorama, fecha: Date, calificacion:number) => any
    comentarioAdd: (idPanorama: string, fecha: Date, calificacion: number, comentario: string) => any
    // xrealizar: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista  "Por realizar" 
    // realizado: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista de "Realizados"
    // share: (a: string) => void // vamos a necesitar la referencia del panorama  al que le damos share
    // sharetemp: (a: string) => void
    fetched: boolean
    loading: boolean
    data: postsDuck.IDataPanorama

}
interface IStatePorRealizr{
    calificacion:number
    fechaInicial:Date
    idPanorama:string
    mensajeAccion:string
    uiobtenerFecha:boolean
    alert: React.ReactNode
    panorama: IPanorama
    resenia: string,
    uidProveedor: string
    work:boolean
}

class PanoramasXRealizar extends React.Component<IPanoramasxRealizar, IStatePorRealizr>{
    constructor(props: IPanoramasxRealizar) {
        super(props)
        const { fetchPanoramasPorRealizar, fetched } = props
        this.state={
            alert:null,
            calificacion:0, // Calificacion otorgada por el usuario cuano lo selecciona como realizado
            fechaInicial: new Date(),
            idPanorama:"",
            mensajeAccion:"",
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
            resenia: "",
            uidProveedor: "",
            uiobtenerFecha:false,
            work:false,
        }
        if (fetched) {
            return
        }

        fetchPanoramasPorRealizar()
    }

    public cambiarCalificacion = (value: any) => {

        this.setState({
            calificacion: value
        })


    }
    public cambiarResenia = (evt: any) => {

        this.setState({
            resenia: evt.target.value
        })


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
    public cancelAdd=()=>{
        this.setState({
            uiobtenerFecha: false
        });

    }
    public handleChangeDate =( date:any)=>{
        this.setState({
            fechaInicial: date
        });
    };
    
  
/**
 * @param
 * @param ruta:Lugar a dónde direcionará luego de realizada la acción
 * @param lista: Lista donde fue agregado el panorama
 */
    public onAlertOk = (lista: string, ruta: string) => {
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
                    El panorama  ha sido agregado a tu lista de {lista} ¿Deseas revisarla ahora?
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
            location.href = "/app/xrealizar"
        }

    };



  
    public onClickRegistro = (ruta: string) => () => {
        // location.href = '/register'
        location.href = `/app/${ruta}`

    }

    // handleLike recibe un id y retorna una funcion. Esto nos permite 
    public render() {
        const { data, loading } = this.props
        const {work, uiobtenerFecha,  mensajeAccion}= this.state
        //  tslint:disable-next-line: no-console
       //  console.log("data", Object.keys(data).length);
        //  tslint:disable-next-line: no-console
       //  console.log("Fecha: "+this.state.fechaInicial);


        if (uiobtenerFecha) {
            return (

                <Alert variant="info" className="container justify-content-center">

                    <Alert.Heading className="d-flex"> <div className="p-3"><img src={this.state.panorama.urlImagen} style={{
                        borderRadius: '10%',
                        height: '80px',
                        width: '80px',
                    }} /></div> <div className="pt-3"> {this.state.panorama.nombre}. <small>¿Cuándo {mensajeAccion}? Selecciona una fecha, otorga una calificación y escribe una reseña.</small></div></Alert.Heading>

                    <hr />

                    <div className="flex-column  container justify-content-center">
                        <div className="d-flex justify-content-center pt-3">
                            Fecha: <DatePicker
                                selected={this.state.fechaInicial}
                                onChange={this.handleChangeDate}
                            />
                        </div>


                        <div className="d-flex justify-content-center pt-3">
                            Calificación: <BeautyStars
                                maxStars={5}
                                value={this.state.calificacion}
                                inactiveColor="#e0e0e0"
                                size="26px"
                                editable={true}
                                onChange={this.cambiarCalificacion}
                            />
                        </div>


                        <div className="d-flex justify-content-center pt-3">
                            <textarea
                                rows={10}
                                value={this.state.resenia}
                                onChange={this.cambiarResenia}
                                className="form-control"
                                placeholder="Por favor cuéntanos qué te pareció este panorama"
                                maxLength={300}
                            />
                        </div>




                        <hr />
                        <div className="d-flex justify-content-center">

                            <Button variant="outline-primary" onClick={this.realizado} ><FontAwesomeIcon icon={faCheckCircle} /> Agregar </Button>
                            <Button variant="outline-secondary" onClick={this.cancelAdd} ><FontAwesomeIcon icon={faBan} /> Cancelar </Button>
                            {this.state.alert}
                        </div>

                    </div>
                </Alert>

                // {<Alert variant="info" className="container justify-content-center">
                //     <Alert.Heading className="d-flex  container justify-content-center" > 
                //     <hr/>
                //     ¿Cuándo {mensajeAccion}? Selecciona una fecha y otorga una calificación. 
                //     </Alert.Heading>
                //     <div className="flex-column  container justify-content-center">


                //         <div className="d-flex justify-content-center">
                //             Fecha: <DatePicker
                //                 selected={this.state.fechaInicial}
                //                 onChange={this.handleChangeDate}
                //             />
                //         </div>

                //         <hr />


                //         <div className="d-flex justify-content-center">
                //             Calificación: <BeautyStars
                //                 maxStars={5}
                //                 value={this.state.calificacion}
                //                 inactiveColor="#e0e0e0"
                //                 size="26px"
                //                 editable={true}
                //                 onChange={this.cambiarCalificacion}
                //             />
                //         </div>

                //         <hr />
                //         <div className="d-flex justify-content-center">

                //             <Button variant="outline-primary" onClick={this.realizado} ><FontAwesomeIcon icon={faCheckCircle} /> Agregar </Button>
                //             <Button variant="outline-secondary" onClick={this.cancelAdd} ><FontAwesomeIcon icon={faBan} /> Cancelar </Button>
                //             {this.state.alert}
                //         </div>

                //     </div>
                // </Alert>}

            
            );
        }

//  onClick={this.realizado}


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
                            <FontAwesomeIcon icon={faHeart} /> Tus panoramas deseados
                        </div>

                      
                    </Alert.Heading>

                    <div className="d-flex pl-5">
                        Tienes {Object.keys(data).length} panoramas agregados a tu lista  de deseados pendientes de realizar.
                      </div>
                    <hr />
                       <p className="mb-0">
                        Esperamos pronto puedas cumplir tus deseos. Recuerda equiparte adecuadamente y calcular bien los tiempos.
                        </p>
                   
                </Alert>
                {Object.keys(data).map(x => {
                    const post = data[x]
                    return <div key={x} style={{ margin: '0 auto' }}>
                        <Panorama
                            setSharedClicked={this.handleShare(x)}
                            urlImagen={post.urlImagen}
                            nombre={post.nombre}
                            nombuton={"Más informácion"}
                            descripcion={post.descripcion}
                            urlImagen1={post.urlImagen1}
                            urlImagen2={post.urlImagen2}
                            urlFacebook={post.urlFacebook || ""}
                            urlInstagram={post.urlInstagram}
                            urlTripAdvisor={post.urlTripAdvisor}
                            urlWeb={post.urlWeb}
                            calificacion={post.calificacion}
                            exigenciaFisica={post.exigenciaFisica}
                            valor={post.valor}
                          //  porRealizar={this.handlePorRealizar(x)}
                            realizado={this.uiObterFecha(post, "realizaste el panorama")}
                            titulo={"Por realizar"}
                            hidenCompartir={false}
                            hiddenRealizado={false}
                            hiddenXRealizar={true}
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
                   Por ahora no tienes panoramas agregados a esta lista. Aquí econtrarás los panoramas que marques  como "Deseados".
                   
            </p>
                <hr />
                <p className="mb-0">
                    Sigue explorando panoramas y etiquétalos según tu interés.
            </p>
            </Alert>)
        }


    }
    private realizado = () => {
        const { panorama, fechaInicial, calificacion, resenia } = this.state
        const { realizadoAdd, comentarioAdd} = this.props
        if (!panorama.idPanorama) {
            return
        }
        if (calificacion === 0 || resenia==="") {

            this.setState({
                alert: (
                    <SweetAlert
                        warning={true}
                        title="¡Cuidado!"
                        showCloseButton={true}
                        confirmBtnText="Entendí"
                        onConfirm={this.hideAlert(false)}>
                        Debes marcar una calificación.
                        {/* {  <BeautyStars
                            maxStars={5}
                            value={this.state.calificacion}
                            inactiveColor="#e0e0e0"
                            size="26px"
                            editable={true}
                            onChange={this.cambiarCalificacion}
                        />} */}
                    </SweetAlert>
                ),
            });
          

        } else {
            this.setState({
                uiobtenerFecha: false,
                work: true,
            });
            realizadoAdd(panorama, fechaInicial, calificacion).then((res: string) => {
                if (res === "OK") {
                    this.setState({
                        work: false,
                    });

                   

                } else {
                    this.setState({
                        work: false,
                    });
                    this.onAlertError(res)
                }
            })


            comentarioAdd(panorama.idPanorama, fechaInicial, calificacion, resenia).then((res: string) => {
                if (res === "OK") {
                    this.setState({
                        work: false,
                    });

                    //  this.onAlert("Deseados", "xrealizar")

                } else {
                    this.setState({
                        work: false,
                    });
                    this.onAlertError(res)
                }
            })

            this.onAlertOk("Realizados", "realizados")


        }

    }

    private handleShare = (id: string) => () => {
        // const { share } = this.props
        // share(id)
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
export default connect(mapStateToProps, mapDispatchToProps)(PanoramasXRealizar)

