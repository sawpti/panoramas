import * as React from 'react'
import {History} from 'history'
import {Route} from 'react-router'
// import BarraSuperior from './components/BarraSuperiorInicio';
import Inicio from './containers/Inicio';
import Register from './containers/Auth/Register'
import Login from './containers/Auth/Login';
import Perfil from './containers/Profile/perfil';
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
          history.push('/app/perfil')
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
      loading ? 'Loading' : 

      <div >
        
           <Route exact={true} path='/' component={Inicio} />
          {  <Route exact={true} path='/login' component={Login} />}
           <Route exact={true} path='/register' component={Register} />
          {/* { <Route path='/app' component={BarraSuperiorUsuario} />} */}
            <Route exact={true} path='/app/perfil' component={Perfil} />




        {/* {  <Route exact={true} path='/' component={Login} />} */}
                 
           
     </div>
    );
  }
}

export default App;
