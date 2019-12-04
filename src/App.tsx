import * as React from 'react'
import {History} from 'history'
import {Route} from 'react-router'
import { Spinner, Container } from 'react-bootstrap'
import BarraSuperior from './components/BarraSuperiorUsuario';
import Inicio from './containers/Inicio';
import Register from './containers/Auth/Register'
import Login from './containers/Auth/Login';
// import Perfil from './containers/Profile/perfil';
import AllPanoramas from './containers/Panoramas';
import PanoramasRealizados from './containers/Panoramas/Realizados';
import PanoramasXRealizar from './containers/Panoramas/XRealizar'
import service from './service'
// import BarraSuperiorUsuario from './components/BarraSuperiorUsuario';
// import Login from './containers/Auth/Login';
interface IAppProps{
  history: History  
  loadInitialData: () => void
}

class App extends React.Component<IAppProps> {
  public state ={
    loading: true,
  }
  public  componentDidMount(){
    const {auth} = service   
        
    auth.onAuthStateChanged(user => {      
      if (user){
        // el usuario se esta registrando o iniciando sesion con exito.
        
   const { loadInitialData} = this.props
    // tslint:disable-next-line: no-console
     //  console.log('hola', loadInitialData())
       
          loadInitialData()  // este método no  me lo toma acá, es como si no existiera...
       //  console.log('hola')
        // ahora tenemos que inyectarle esta propiedad (loadInitialData)desde nuestro archivo index.tsx 
        if (['/','/register'].indexOf(location.pathname) > -1){
          const {history} = this.props
          history.push('/app/allpanoramas')
        }
      }else{
      //  alert (user)
        if (/\app\/./.test(location.pathname)){
          const {history} = this.props
          history.push('/')
        }
      }
    // tslint:disable-next-line: no-console
     //  console.log(user)
        this.setState({
        loading: false,
      })
    })
  }
  
  public render() {
    const {loading} = this.state
    return (
      loading ? (
      <Container fluid={true} className="align-content-center justify-content-center d-flex p-5"> 
      <Spinner className="mt-5 align-middle"  animation="border" variant="primary"/>
      </Container>)  : 

      <div >
        
           <Route exact={true} path='/' component={Inicio} />
           <Route exact={true} path='/login' component={Login} />
           <Route exact={true} path='/register' component={Register} />
          <Route path='/app' component={BarraSuperior} />
          <Route exact={true} path='/app/allpanoramas' component={AllPanoramas} />
          <Route exact={true} path='/app/realizados' component={PanoramasRealizados} />
          <Route exact={true} path='/app/xrealizar' component={PanoramasXRealizar} />
        {/* {  <Route exact={true} path='/app/perfil' component={Perfil} />} */}




        {/* {  <Route exact={true} path='/' component={Login} />} */}
                 
           
     </div>
    );
  }
}

export default App;
