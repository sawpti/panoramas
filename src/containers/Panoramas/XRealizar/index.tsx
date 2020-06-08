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
import services from 'src/service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



interface IPanoramasxRealizar {
    fetchPanoramasPorRealizar: () => void
    xrealizar: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista  "Por realizar" 
    realizado: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista de "Realizados"
    share: (a: string) => void // vamos a necesitar la referencia del panorama  al que le damos share
    sharetemp: (a: string) => void
    fetched: boolean
    loading: boolean
    data: postsDuck.IDataPanorama

}
interface IStatePorRealizr{
    fechaInicial:Date
    idPanorama:string
    mensajeAccion:string
    uiobtenerFecha:boolean
    alert: React.ReactNode
    work:boolean
}

class PanoramasXRealizar extends React.Component<IPanoramasxRealizar, IStatePorRealizr>{
    constructor(props: IPanoramasxRealizar) {
        super(props)
        const { fetchPanoramasPorRealizar, fetched } = props
        this.state={
            alert:null,
            fechaInicial: new Date(),
            idPanorama:"",
            mensajeAccion:"",
            uiobtenerFecha:false,
            work:false,
        }
        if (fetched) {
            return
        }

        fetchPanoramasPorRealizar()
    }

   /**
    *  Cambia el estado para poder obter la fecha que el usuario ingresará
    */
    public uiObterFecha=(idPanorama:string, mensajeAccion: string)=>()=>{
        this.setState({
            idPanorama,
            mensajeAccion,
            uiobtenerFecha:true

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
                    title="Listo"
                    showCancel={true}
                    showCloseButton={true}
                    confirmBtnText="Sí"
                    cancelBtnText="No"
                    onCancel={this.hideAlert}
                    onConfirm={this.onClickRegistro(ruta)}>
                    El panorama  ha sido agregado a tu lista de {lista} ¿Deseas revisarla ahora?
                </SweetAlert>
            ),
        });
    };





    public hideAlert = () => {
        this.setState({
            alert: null,
        });
     location.href = "/app/xrealizar"
    };
    public onClickRegistro = (ruta: string) => () => {
        // location.href = '/register'
        location.href = `/app/${ruta}`

    }

    // handleLike recibe un id y retorna una funcion. Esto nos permite 
    public render() {
        const { data, loading } = this.props
        const {work, uiobtenerFecha, idPanorama, mensajeAccion}= this.state

        //  tslint:disable-next-line: no-console
       //  console.log("data", Object.keys(data).length);

        //  tslint:disable-next-line: no-console
       //  console.log("Fecha: "+this.state.fechaInicial);


        if (uiobtenerFecha) {
            return (
                <Alert variant="info" className="container">
                    <Alert.Heading className="d-flex   container justify-content-center" >¿Cuándo {mensajeAccion}? Selecciona una fecha. </Alert.Heading>
                    <div className="d-flex flex-wrap container justify-content-center">
                        <DatePicker
                            selected={this.state.fechaInicial}
                            onChange={this.handleChangeDate}
                        />  <Button variant="outline-primary" onClick={this.handleRealizado(idPanorama)} ><FontAwesomeIcon icon={faCheckCircle} /> Agregar </Button>
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
                            porRealizar={this.handlePorRealizar(x)}
                            realizado={this.uiObterFecha(x, "realizaste el panorama")}
                            titulo={"Por realizar"}
                            hidenCompartir={false}
                            hiddenRealizado={false}
                            hiddenXRealizar={true}
                            lat={post.lat}
                            lng={post.lng}
                            direccion={post.direccion}

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

    // public setDatos = () => () => {
      
    //             this.setState({
    //                 alert: (
    //                     <SweetAlert
    //                         input={true}
    //                         showCancel={true}
    //                         cancelBtnBsStyle="default"
    //                         defaultValue={this.props.fono}
    //                         title="Actualiza tu teléfono"
    //                         //  placeholder="Write something"
    //                         onConfirm={this.onClick("fono")}
    //                         onCancel={this.hideAlert1}
    //                     >
    //                         Ingresa tu nuevo número de teléfono. Para más de uno, separalos por una coma.
    //                     </SweetAlert>
    //                 )
    //             })
            
            
    //     }
    private handlePorRealizar = (panoramaId: string) => async () => {
        const { auth, db } = services
        const u = auth.currentUser
        this.setState({
        
            work: true,

        });
        if (u != null) {
            try {
                // Buscamos el post en cuestion
                const snap = await db.collection('users').doc(u.uid).get()
                const post = snap.data()
                if (post != null) {
                    await db.collection('xrealizar').doc(`${panoramaId}_${u.uid}`).set({
                        // ...post,
                        ciudadOrigen: post.ciudad,
                        createdAt: new Date(),
                        email: post.email,
                        nombreUsuario: post.nombre,
                        pid: panoramaId,
                        uid: u.uid
                    })
                    const sn = await db.collection('realizados').doc(`${panoramaId}_${u.uid}`).get()
                    const xrealizar = sn.data()
                    if (xrealizar !== undefined) {
                        await db.collection('realizados').doc(`${panoramaId}_${u.uid}`).delete()
                    }
                }
            } catch (error) {
                alert(error.message)
            }

        }
        this.setState({
            work: false,
        });
        // `app/xrealizar
        this.onAlertOk("Deseados", "xrealizar")
        // const { xrealizar } = this.props;
        // this.setState({
        //     work: true,
        // });
        // xrealizar(id);
        // //  tslint:disable-next-line: no-console
        // console.log("Agregando a la lista de por realizar ", this.state.work);
        // setTimeout(() => {
        //     // tslint:disable-next-line: no-console
        //     console.log("Ya se agregó  a la lista por realizar", this.state.work);
        //     this.setState({
        //         work: false,
        //     });
        // }, 2000);

        //   location.href = "/app/xrealizar";
    };

    private handleRealizado = (panoramaId: string) => async () => {
        const { auth, db } = services
        const u = auth.currentUser
      
        this.setState({
            uiobtenerFecha: false,
            work: true,
        });
        if (u != null) {
            try {
                // Buscamos el post en cuestion
                const snap = await db.collection('users').doc(u.uid).get()
                const post = snap.data()
                if (post != null) {
                    await db.collection('realizados').doc(`${panoramaId}_${u.uid}`).set({
                        // ...post,
                        ciudadOrigen: post.ciudad,
                        createdAt: new Date(),
                        email: post.email,
                        fechaRealizado:this.state.fechaInicial,
                        nombreUsuario: post.nombre,
                        pid: panoramaId,
                        uid: u.uid
                    })
                    const sn = await db.collection('xrealizar').doc(`${panoramaId}_${u.uid}`).get()
                    const xrealizar = sn.data()
                    if (xrealizar !== undefined) {
                        await db.collection('xrealizar').doc(`${panoramaId}_${u.uid}`).delete()
                    }
                }
            } catch (error) {
                alert(error.message)
            }

        }
        this.setState({
            work: false,
        });
        this.onAlertOk("Realizados", "realizados")

    };



    // private handlePorRealizar = (id: string) => () => {
    //     const { xrealizar } = this.props
    //     xrealizar(id)
    //     setTimeout(() => {

    //         location.href = "/app/xrealizar";
    //     }, 1000)


    // }
    // private handleRealizado = (id: string) => () => {
    //     const { realizado } = this.props
    //     realizado(id)
    //     setTimeout(() => {

    //         location.href = "/app/realizados";
    //     }, 1000)


    // }

    private handleShare = (id: string) => () => {
        const { share } = this.props
        share(id)
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

