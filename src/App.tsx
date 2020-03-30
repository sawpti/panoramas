import * as React from 'react'
import { History } from 'history'
import { Route } from 'react-router'
import { Spinner, Container } from 'react-bootstrap'
import BarraSuperior from './components/BarraSuperiorUsuario';
import Inicio from './containers/Inicio';
import Register from './containers/Auth/Register'
import RegisterPanorama from './containers/Admin/RegisterPanorama'

import Login from './containers/Auth/Login';
import Perfil from './containers/Profile/perfil';
import AllPanoramas from './containers/Panoramas';
import PanoramasRealizados from './containers/Panoramas/Realizados';
import PanoramasXRealizar from './containers/Panoramas/XRealizar';
import Admin from './containers/Admin/admin'
import DetallePanorama from './containers/Admin/DetallePanorama'
// import { IDetalleProps } from './containers/Admin/DetallePanorama'
import service from './service'
// import BarraSuperiorUsuario from './components/BarraSuperiorUsuario';
// import Login from './containers/Auth/Login';
interface IAppProps {
  history: History
  loadInitialData: () => void
}


class App extends React.Component<IAppProps> {
  public state = {
    loading: true
  }
  public componentDidMount() {
    const { auth, db } = service

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // el usuario se esta registrando o iniciando sesion con exito.
        const { loadInitialData } = this.props
        // tslint:disable-next-line: no-console
        //  console.log('hola', loadInitialData())
        loadInitialData()
        if (['/', '/register'].indexOf(location.pathname) > -1) {
          const { history } = this.props
          history.push('/app/allpanoramas')
        }
      } else {
        //  alert (user)
        if (/\app\/./.test(location.pathname)) {
          const { history } = this.props
          history.push('/')
        }
      }

      const u = auth.currentUser

      if (u != null) {

        const snaps = await db.collection('users')
          .where('uid', '==', u.uid)
          .limit(1)
          .get()
        const users = {}
        snaps.forEach(x => users[x.id] = x.data())
        // Si el usuario verificó su e-mail, pregunto si este cambio se actulizó en firestore
        if (u.emailVerified === true && users[u.uid].emailVerified === false) {
          const doc = db.collection('users').doc(u.uid)
          // Actulizo la propiedad  emailVerified 
          doc.update({
            emailVerified: u.emailVerified
          })


        }

        // tslint:disable-next-line: no-console
        console.log("e-mail Vericado:", u.emailVerified)

        // db.collection('realizados').where('uid', '==', u.uid)
        //   .onSnapshot(querySnapshot => {
        //     querySnapshot.docChanges().forEach(change => {
        //       if (change.type === 'added') {
        //         this.setState({
        //           loading: true,
        //         })
        //         // tslint:disable-next-line: no-console
        //         console.log('New Panorama realizado: ', change.doc.data());

        //         this.setState({
        //           loading: false,
        //         })
        //       }
        //       if (change.type === 'modified') {
        //         // tslint:disable-next-line: no-console
        //         console.log('Modified Panorama realizado: ', change.doc.data());
        //       }
        //       if (change.type === 'removed') {
        //         // tslint:disable-next-line: no-console
        //         console.log('Removed Panorama realizado: ', change.doc.data());
        //       }
        //     });
        //   });


        //   db.collection('xrealizar').where('uid', '==', u.uid)
        //   .onSnapshot(querySnapshot => {
        //     querySnapshot.docChanges().forEach(change => {
        //       if (change.type === 'added') {
        //         this.setState({
        //           loading: true,
        //         })
        //         // tslint:disable-next-line: no-console
        //         console.log('New Panorama por realizar: ', change.doc.data());

        //         this.setState({
        //           loading: false,
        //         })
        //       }
        //       if (change.type === 'modified') {
        //         // tslint:disable-next-line: no-console
        //         console.log('Modified Panorama por realizar: ', change.doc.data());
        //       }
        //       if (change.type === 'removed') {
        //         // tslint:disable-next-line: no-console
        //         console.log('Removed Panorama por realoizar: ', change.doc.data());
        //       }
        //     });
        //   });





      }

      this.setState({
        loading: false,
      })
    })
  }

  public render() {
    const { loading } = this.state
    return (
      loading ? (
        <Container fluid={true} className="align-content-center justify-content-center d-flex p-5">
          <Spinner className="mt-5 align-middle" animation="border" variant="primary" />
        </Container>) :

        <div >

          <Route exact={true} path='/' component={Inicio} />
          <Route exact={true} path='/login' component={Login} />
          <Route exact={true} path='/register' component={Register} />
          <Route path='/app' component={BarraSuperior} />
          <Route exact={true} path='/app/allpanoramas' component={AllPanoramas} />
          <Route exact={true} path='/app/realizados' component={PanoramasRealizados} />
          <Route exact={true} path='/app/xrealizar' component={PanoramasXRealizar} />
          <Route exact={true} path='/app/perfil' component={Perfil} />
          <Route exact={true} path='/app/admin' component={Admin} />
          <Route exact={true} path='/app/admin/register' component={RegisterPanorama} />
          <Route

            path='/app/admin/detalle/:idPanorama/:nombre/:descripcion/:urlMapUbicacion/:urlWeb'

            component={DetallePanorama}

          />






          {/* {  <Route exact={true} path='/' component={Login} />} */}
          <hr className="my-4 bg-light" />
          <div className="d-flex footer-copyright bg-light mt-5 justify-content-center container-fluid p-4 " >

            <p>
              <small>Esta es una App gratuita de Parque Saltos Pocolpén para que todos los visitantes de Curarrehue disfruten al máximo.</small>
            </p>

          </div>
          <hr className="my-4" />


        </div>


    );
  }
  // public renderDetalle = (p: IDetalleProps) => {

  //   return (
  //     <DetallePanorama idPanorama={p.idPanorama} descripcion={p.descripcion} nombre="Hola"
  //       {...p} />

  //   )
  // }

}

export default App;
