import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Panorama from '../../../components/Panorama'
import { IState } from '../../../ducks'
import * as postsDuck from '../../../ducks/PanoramasXRealizar'
import { Spinner, Container, Alert } from 'react-bootstrap'
// import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHiking } from '@fortawesome/free-solid-svg-icons'

interface IPanoramasRealizados {
    fetchPosts: () => void
    xrealizar: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista  "Por realizar" 
    realizado: (a: string) => void // Referencia del panorama que vamos a a gregar a la lista de "Realizados"
    share: (a: string) => void // vamos a necesitar la referencia del panorama  al que le damos share
    sharetemp: (a: string) => void
    fetched: boolean
    loading: boolean
    data: postsDuck.IDataPosts

}

class PanoramasXRealizar extends React.Component<IPanoramasRealizados>{
    constructor(props: IPanoramasRealizados) {
        super(props)
        const { fetchPosts, fetched } = props
        if (fetched) {
            return
        }
      
        fetchPosts()
    }
    // handleLike recibe un id y retorna una funcion. Esto nos permite 
    public render() {
        const { data, loading } = this.props
            
        //  tslint:disable-next-line: no-console
        console.log("data", Object.keys(data).length);
        //  console.log('Oculatando...');
        if (loading) {

            return (<Container fluid={true} className="align-content-center justify-content-center d-flex p-5">
                <Spinner className="mt-5 align-middle" animation="border" variant="primary" />
            </Container>)

        } else if (Object.keys(data).length > 0) {
        
                return (<div className="d-flex flex-wrap container justify-content-center">
                    <Alert variant="info" className="container">
                        <Alert.Heading><FontAwesomeIcon icon={faHiking} /> Tus panoramas Por realizar</Alert.Heading>
                        <p>
                            Tienes {Object.keys(data).length} panoramas agregados a tu lista como pendiente de realizar.
                      </p>
                        <hr />
                        <p className="mb-0">
                            Esperamos pronto los puedas concretar. Recuerda equiparte adecuadamente y calcular bien los tiempos
                        </p>

                    </Alert>
                    {Object.keys(data).map(x => {
                        const post = data[x]
                        return <div key={x} style={{ margin: '0 auto' }}>
                            <Panorama
                                setSharedClicked={this.handleShare(x)}
                                urlMapUbicacion={post.urlMapUbicacion}
                                urlImagen={post.urlImagen}
                                nombre={post.nombre}
                                descripcion={post.descripcion}
                                urlImagen1={post.urlImagen1}
                                urlImagen2={post.urlImagen2}
                                urlFacebook={post.urlFacebbok}
                                urlInstagram={post.urlInstagram}
                                urlTripAdvisor={post.urlTripAdvisor}
                                urlWeb={post.urlWeb}
                                calificacion={post.calificacion}
                                exigenciaFisica={post.exigenciaFisica}
                                valor={post.valor}
                                porRealizar={this.handlePorRealizar(x)}
                                realizado={this.handleRealizado(x)}
                                titulo={"Por realizar"}
                                hidenCompartir={false}
                                hiddenRealizado={false}
                                hiddenXRealizar={true}

                            />

                        </div>
                    })}
                  
                </div>)
            



        } else {
            return (<Alert variant="info" className="container">
                <Alert.Heading>¡Hola!, nada por acá</Alert.Heading>
                <p>
                    No tienes panoramas en tu lista "Por realizar". Aquí econtrarás los panoramas que marques "Por realizar".
                    Y cuando los marques como "Realizados" desaparecerán de acá.
            </p>
                <hr />
                <p className="mb-0">
                    Sigue explorando panoramas y márcalos según tu interés. Que tu espiritu aventurero te lleve a hermosos parajes.
            </p>
            </Alert>)
        }

    }
    private handlePorRealizar = (id: string) => () => {
        const { xrealizar } = this.props
        xrealizar(id)
        setTimeout(() => {
          
            location.href = "/app/xrealizar";
            }, 1000)
             

    }
    private handleRealizado = (id: string) => () => {
        const { realizado} = this.props
        realizado(id)
        setTimeout(() => {
          
            location.href = "/app/realizados";
            }, 1000)
             

    }

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

