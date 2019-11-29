import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Panorama from '../../../components/Panorama'
import { IState } from '../../../ducks'
import * as postsDuck from '../../../ducks/PanoramasXRealizar'
import { Spinner, Container } from 'react-bootstrap'


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
class PanoramasRealizados extends React.Component<IPanoramasRealizados>{
    constructor(props: IPanoramasRealizados) {
        super(props)
        const { fetchPosts, fetched} = props
        if (fetched) {
            return
        }
        fetchPosts()
    }
    // handleLike recibe un id y retorna una funcion. Esto nos permite 
    public render() {
        const { data, loading} = this.props
                   
        return (
            loading ? (
                <Container fluid={true} className="align-content-center justify-content-center d-flex p-5"> 
                <Spinner className="mt-5 align-middle"  animation="border" variant="primary"/>
                </Container>) :
            <div className="d-flex flex-wrap container justify-content-center">
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

                        />


                    </div>
                })}
            </div>
        )
    }
    private handlePorRealizar = (id: string) => () => {
        const {xrealizar } = this.props
       xrealizar(id)
    }
    private handleRealizado = (id: string) => () => {
        const {realizado } = this.props
       realizado(id)
    }


    private handleShare = (id: string) => () => {
        const { share} = this.props
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
export default connect(mapStateToProps, mapDispatchToProps)(PanoramasRealizados)

