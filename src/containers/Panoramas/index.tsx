import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Panorama from '../../components/Panorama'
import { IState } from '../../ducks'
import * as postsDuck from '../../ducks/Panoramas'
import { Spinner, Container } from 'react-bootstrap'

interface INewsFeedProps {
    fetchPosts: () => void
    like: (a: string) => void// vamos a necesitar la referencia del post al que le damos like
    share: (a: string) => void// vamos a necesitar la referencia del post al que le damos share
    fetched: boolean
    loading: boolean
    data: postsDuck.IDataPosts
}
class AllPanoramas extends React.Component<INewsFeedProps>{
    constructor(props: INewsFeedProps) {
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
        // const {loading} = this.state
      
        //  tslint:disable-next-line: no-console
                console.log("propos",this.props)
                
               
        return (
            loading ? (
                <Container fluid={true} className="align-content-center justify-content-center d-flex p-5"> 
                <Spinner className="mt-5 align-middle"  animation="border" variant="primary"/>
                </Container>) :
            <div className="d-flex flex-wrap container justify-content-center">
                 {Object.keys(data).map(x => {
                    const post = data[x]
                    return <div key={x} style={{ margin: '0 auto' }}>
                        {/* { <Post 
                        share={this.handleShare(x)} 
                        like={this.handleLike(x)} 
                        image= {post.imageURL}
                    />} */}
                        <Panorama 
                        setSharedClicked={this.handleShare(x)} 
                        urlMapUbicacion={post.urlMapUbicacion} 
                        urlImagen={post.urlImagen}
                        nombre={post.nombre}
                        descripcion={post.descripcion} 
                        urlImagen1={post.urlImagen1}
                        urlImagen2={post.urlImagen2}
                        />


                    </div>
                })}
            </div>
        )
    }
    // private handleLike = (id: string) => () => {
    //     const { like } = this.props
    //     like(id)
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
export default connect(mapStateToProps, mapDispatchToProps)(AllPanoramas)

