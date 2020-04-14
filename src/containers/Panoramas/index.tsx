import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Panorama from '../../components/Panorama'
import { IState } from '../../ducks'
import * as postsDuck from '../../ducks/Panoramas'
import { Spinner, Container, Alert } from 'react-bootstrap'
// import { useState } from 'react';
// import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain } from '@fortawesome/free-solid-svg-icons'


interface INewsFeedProps {

    fetchPosts: () => void
    xrealizar: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista  "Por realizar" 
    realizado: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista de "Realizados"
    share: (a: string) => void // vamos a necesitar la referencia del panorama  al que le damos share
    sharetemp: (a: string) => void
    fetched: boolean
    loading: boolean
    data: postsDuck.IDataPanorama


}
interface IStatePanorama {
    // alert: any
    work: boolean

}


class AllPanoramas extends React.Component<INewsFeedProps, IStatePanorama>{

    constructor(props: INewsFeedProps) {
        super(props)
        const { fetchPosts, fetched } = props
        if (fetched) {
            this.state = {
                work: false
            }
            return
        }
        fetchPosts()
        //  tslint:disable-next-line: no-console
        //  console.log("Work de los props:")
        this.state = {
            work: false
        }
        //  tslint:disable-next-line: no-console
        console.log("Eastado work construcor:" + this.state.work)

    }
    // public componentDidMount(){
    //     this.state = {
    //         work: false
    //     };


    // }

    // public accionThisGoal(mensaje:string) {
    //     const getAlert = () => (
    //       <SweetAlert 
    //         success={true}
    //         title="¡Listo" 
    //         onConfirm={this.hideAlert}
    //       >
    //         {mensaje}
    //       </SweetAlert>
    //     );

    //     this.setState({
    //       alert: getAlert()
    //     });
    //   }

    //  public hideAlert=()=> {
    //       //  tslint:disable-next-line: no-console
    //     console.log('Oculatando...');
    //     this.setState({
    //       alert: null
    //     });
    //   }
    public render() {
        const { data, loading } = this.props
        // location.href = "/app/allpanoramas";   

        //  tslint:disable-next-line: no-console
        console.log("Eastado work:" + this.state.work)

        if (loading) {
            return (

                <Container fluid={true} className="align-content-center justify-content-center d-flex p-5">
                    <Spinner className="mt-5 align-middle" animation="border" variant="info" />
                </Container>

            )


        }

        if (this.state.work) {
            return (


                <Alert variant="info" className="container">
                    <Alert.Heading>Agegando a la lista   </Alert.Heading>
                    <div className="d-flex container justify-content-center">
                        <Spinner className="m-5 align-middle" animation="border" variant="warning" />
                    </div>
                </Alert>

            )

        }

        return (
            <div className="d-flex flex-wrap container justify-content-center">

                <Alert variant="info" className="container">
                    <Alert.Heading>  <FontAwesomeIcon icon={faMountain} /> Estos son todos los panoramas disponibles</Alert.Heading>
                    <p>
                        Tienes {Object.keys(data).length} panoramas disponibles en esta zona
                      </p>
                    <hr />


                </Alert>

                {Object.keys(data).map(x => {
                    const post = data[x]
                    //  tslint:disable-next-line: no-console
                    // console.log("key ",x)

                    return <div key={x} style={{ margin: '0 auto' }}>
                        <Panorama
                            setSharedClicked={this.handleShare(x)}
                            urlImagen={post.urlImagen}
                            nombre={post.nombre}
                            nombuton={"Más informácion"}
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
                            hidenCompartir={false}
                            hiddenRealizado={false}
                            hiddenXRealizar={false}
                            lat={post.lat}
                            lng={post.lng}
                            direccion={post.direccion}

                        />

                    </div>

                })}
            </div>


        )



        // return (
        //     loading ? (
        //         <Container fluid={true} className="align-content-center justify-content-center d-flex p-5">
        //             <Spinner className="mt-5 align-middle" animation="border" variant="primary" />
        //         </Container>) :
        //         <div className="d-flex flex-wrap container justify-content-center">
        //             {Object.keys(data).map(x => {
        //                 const post = data[x]
        //                 //  tslint:disable-next-line: no-console
        //                 // console.log("key ",x)

        //                 return <div key={x} style={{ margin: '0 auto' }}>
        //                     {/* { <Post 
        //                 share={this.handleShare(x)} 
        //                 like={this.handleLike(x)} 
        //                 image= {post.imageURL}
        //             />} */}
        //                     <Panorama
        //                         setSharedClicked={this.handleShare(x)}
        //                         urlMapUbicacion={post.urlMapUbicacion}
        //                         urlImagen={post.urlImagen}
        //                         nombre={post.nombre}
        //                         descripcion={post.descripcion}
        //                         urlImagen1={post.urlImagen1}
        //                         urlImagen2={post.urlImagen2}
        //                         urlFacebook={post.urlFacebbok}
        //                         urlInstagram={post.urlInstagram}
        //                         urlTripAdvisor={post.urlTripAdvisor}
        //                         urlWeb={post.urlWeb}
        //                         calificacion={post.calificacion}
        //                         exigenciaFisica={post.exigenciaFisica}
        //                         valor={post.valor}
        //                         porRealizar={this.handlePorRealizar(x)}
        //                         realizado={this.handleRealizado(x)}
        //                         hidenCompartir={false}
        //                         hiddenRealizado={false}
        //                         hiddenXRealizar={false}
        //                     />

        //                 </div>

        //             })}
        //         </div>
        // )
    }
    private handlePorRealizar = (id: string) => () => {
        const { xrealizar } = this.props
        this.setState({
            work: true
        })
        xrealizar(id)
        //  tslint:disable-next-line: no-console
        console.log("Agregando a la lista de por realizar ", this.state.work)
        setTimeout(() => {
            // tslint:disable-next-line: no-console
            console.log("Ya se agregó  a la lista por realizar", this.state.work)
            this.setState({
                work: false
            })

        }, 2000)

        //   location.href = "/app/xrealizar";         

    }
    private handleRealizado = (id: string) => () => {
        const { realizado } = this.props
        this.setState({
            work: true
        })
        realizado(id);

        setTimeout(() => {

            this.setState({
                work: false
            })

            // location.href = "/app/realizados";

        }, 2000)

        //   this.accionThisGoal('El panorama fue agregado a tu lista de "Realizados". Y quitado de tu lista "Por realizar"')


    }


    private handleShare = (id: string) => () => {
        // const { share} = this.props
        // share(id)
        // Implmentar compartir
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
export default connect(mapStateToProps, mapDispatchToProps)(AllPanoramas)

