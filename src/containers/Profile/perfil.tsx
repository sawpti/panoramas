import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import Usuario from 'src/components/Usuario'
import { submit } from 'redux-form'
import * as usersDuck from '../../ducks/Users'
import { IState } from '../../ducks'
import ProfileImg from '../../components/ProfileImg'
import { Spinner, Container } from 'react-bootstrap'

// import services from 'src/service'
// import services from '../../service'
// import SweetAlert from 'react-bootstrap-sweetalert';
interface IUser {
   fetchUsers: () => void
   handleProfileImageSubmit: (a: { profileImg: File }) => void
   submitProfileImg: () => void
   fetched: boolean
   loading: boolean
   profileImage: string
   data: usersDuck.IDataUsers

}
interface IState1 {
   alert: React.ReactNode
   dato: string
}
class Perfil extends React.Component<IUser, IState1>{
   constructor(props: IUser) {
      super(props)
      const { fetchUsers, fetched } = props
      if (fetched) {
         return
      }
      fetchUsers()

   }

   public render() {
      const { data, loading, submitProfileImg, handleProfileImageSubmit, profileImage } = this.props
      // tslint:disable-next-line: no-console
      // console.log('Usuario', Object.keys(data[0].nombre));
      return (
         loading ? (
            <Container fluid={true} className="align-content-center justify-content-center d-flex p-5">
               <Spinner className="mt-5 align-middle" animation="border" variant="primary" />
            </Container>) :
            <div>
               <div className="d-flex  justify-content-between container">
                  <h3>Información de tu cuenta</h3>
                  <ProfileImg
                     profileImage={profileImage}
                     onSubmit={handleProfileImageSubmit}
                     submitProfileImg={submitProfileImg} />

               </div>

               {Object.keys(data).map(x => {
                  const user = data[x]
                  return <div key={x} style={{ margin: '10 auto' }}>

                     <Usuario
                        ciudad={user.ciudad}
                        comuna={user.comuna}
                        direccion={user.direccion ? user.direccion : "No ingresada"}
                        email={user.email}
                        emailVerified={user.emailVerified}
                        fono={user.fono}
                        nombre={user.nombre}

                     />

                  </div>
               })}

            </div>
      )
   }

   // private setDatos = (a:string) => {
   // const { auth } = services
   // const u = auth.currentUser
   // if (a==="fono"){
   //    alert (a)
   // }

   // if (u != null) {


   //    if (!u.emailVerified) {
   //       u.sendEmailVerification().then(() => {
   //          // Email sent.
   //          // tslint:disable-next-line: no-console
   //          console.log("Se envió corectamente el e-mail de verificacion", u)
   //          alert(` Te hemos enviado un  correo a ${u.email}, pincha la url enviada y luego entra nuevamente a la app o dale refesh a tu nabegador`)
   //       }).catch((error) => {
   //          // An error happened.
   //          // tslint:disable-next-line: no-console
   //          console.log("Se ha producido un error al enviar el correo de verificación", error)
   //       });

   //    } else{
   //       alert("Tu correo ya fue validado")
   //    }
   // }



   //  }


}


const mapStateToProps = (state: IState) => {
   const { Users: { data, fetched, fetching, profileImage: tempPI } } = state
   const profileImage = tempPI || 'http://lorempixel.com/200/200/nature'
   const loading = fetching || !fetched

   return {
      data,
      fetched,
      loading,
      profileImage
   }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) =>
   bindActionCreators({
      ...usersDuck,
      submitProfileImg: () => submit('profileImg'),

   }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Perfil)
