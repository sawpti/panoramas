import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { IServices } from '../../../service';
import { ThunkDispatch } from 'redux-thunk';
import Panorama from '../../../components/Panorama'
import { IState } from '../../../ducks'
import * as postsDuck from '../../../ducks/Panoramas'
import { Spinner, Container, Alert } from 'react-bootstrap'
// import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faChartLine } from '@fortawesome/free-solid-svg-icons'
import * as utils from '../../../utils';
import SweetAlert from "react-bootstrap-sweetalert";
import services from 'src/service';



interface IPanoramasRealizados {
    fetchPanoramasRealizados: () => void
    xrealizar: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista  "Por realizar" 
    realizado: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista de "Realizados"
    share: (a: string) => void // vamos a necesitar la referencia del panorama  al que le damos share
    sharetemp: (a: string) => void
    fetched: boolean
    loading: boolean
    data: postsDuck.IDataPanorama

}
interface IStateRealizados {
    alert: React.ReactNode
    work: boolean
}




class PanoramasRealizados extends React.Component<IPanoramasRealizados, IStateRealizados>{
    constructor(props: IPanoramasRealizados) {
        super(props)
        const { fetchPanoramasRealizados, fetched } = props
        this.state = {
            alert: null,
            work: false
        }
        if (fetched) {
            return
        }

        fetchPanoramasRealizados()
    }

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
                    onCancel={this.hideAlert}
                    onConfirm={this.onClickRegistro(ruta)}>
                    El panorama  ha sido agregado a tu lista de {irA} ¿Deseas revisarla ahora?
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
    public onClickRegistro = (ruta: string) => () => {
        // location.href = '/register'
        location.href = `/app/${ruta}`

    }

    public render() {
        const { data, loading } = this.props
        //  const {auth, db} = service   
        //   const uid = auth.currentUser ? auth.currentUser.uid : undefined
        // const {loading} = this.state
        // tslint:disable-next-line: no-console
        console.log("Data", data)
        if (this.state.work) {
            return (
                <Alert variant="info" className="container">
                    <Alert.Heading className="d-flex container justify-content-center" > Procesando... </Alert.Heading>
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
                            <FontAwesomeIcon icon={faThumbsUp} /> Tus panoramas realizados
                        </div>
                    </Alert.Heading>
                    <div className="d-flex pl-5">
                        Tienes {Object.keys(data).length} panoramas en esta lista
                      </div>
                    <hr />
                    <p className="mb-0 font-weight-bold">
                        <code> <FontAwesomeIcon icon={faChartLine} size="2x" /> Tu nivel es  {utils.nivelEplorador(Object.keys(data).length)} </code>
                    </p>
                </Alert>
                {Object.keys(data).map(x => {
                    const post = data[x]
                    return <div key={x} style={{ margin: '0 auto' }}>
                        <Panorama
                            setSharedClicked={this.handleShare(x)}
                            urlImagen={post.urlImagen}
                            nombre={post.nombre}
                            descripcion={post.descripcion}
                            urlImagen1={post.urlImagen1}
                            urlImagen2={post.urlImagen2}
                            urlFacebook={post.urlFacebook}
                            urlInstagram={post.urlInstagram}
                            urlTripAdvisor={post.urlTripAdvisor}
                            urlWeb={post.urlWeb}
                            calificacion={post.calificacion}
                            exigenciaFisica={post.exigenciaFisica}
                            valor={post.valor}
                            porRealizar={this.handlePorRealizar(x)}
                            realizado={this.handleRealizado(x)}
                            titulo={"Realizado"}
                            nombuton={"Más informácion"}
                            hidenCompartir={false}
                            hiddenRealizado={true}
                            hiddenXRealizar={false}
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
                <Alert.Heading>¡Hola! Nada por acá</Alert.Heading>
                <p>
                    No tienes panoramas en tu lista de  "Realizados". Cada vez que concretes un panorama, márcalo como "Realizado" para que aparezca acá.
              </p>
                <hr />
                <p className="mb-0">
                    Sigue explorando y conociendo nuevos lugares. Y que la naturaleza no note que estuviste ahí.
            </p>
            </Alert>)
        }

    }

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
        this.onAlert("Por Realizar", "xrealizar")

    };

    private handleRealizado = (panoramaId: string) => async () => {
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
                    await db.collection('realizados').doc(`${panoramaId}_${u.uid}`).set({
                        // ...post,
                        ciudadOrigen: post.ciudad,
                        createdAt: new Date(),
                        email: post.email,
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
        this.onAlert("Realizados", "realizados")

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

