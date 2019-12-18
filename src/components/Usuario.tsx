import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCity, faMobile, faAddressBook, faAddressCard, faCheckCircle, faFlag } from '@fortawesome/free-solid-svg-icons';
import * as utils from '../utils';
import services from 'src/service';


export interface IUsuarioProps {
  ciudad: string
  comuna: string
  direccion: string
  email: string
  emailVerified: boolean
  fono: string
  nombre: string
  // setDatos: (a: string) => void

}

export default class Usuario extends React.Component<IUsuarioProps> {
  public render() {
    const { ciudad, comuna, direccion, email, emailVerified, fono, nombre } = this.props
    return (
      <div className="container">
        <hr className="noshade" />
        <p className="mb-2 font-weight-bold">
          <FontAwesomeIcon icon={faUser} size="1x" /> Nombre
        </p>
        <div className="d-flex justify-content-between">
          {nombre}  <button onClick={this.setDatos("nombre")} type="button" className="btn btn-outline-primary">Editar</button>
        </div>
        <hr />

        <p className="mb-2 font-weight-bold">
          <FontAwesomeIcon icon={faCity} size="1x" /> Ciudad
        </p>
        <div className="d-flex justify-content-between">
          {ciudad}   <button onClick={this.setDatos("ciudad")} type="button" className="btn btn-outline-primary">Editar</button>
        </div>

        <hr />
        <p className="mb-2 font-weight-bold">
          <FontAwesomeIcon icon={faFlag} size="1x" />    Comuna  </p>
        <div className="d-flex justify-content-between">
          {comuna}   <button onClick={this.setDatos("comuna")} type="button" className="btn btn-outline-primary">Editar</button>

        </div>

        <hr />
        <p className="mb-2 font-weight-bold">
          <FontAwesomeIcon icon={faAddressCard} size="1x" /> Direccion  </p>
        <div className="d-flex justify-content-between">{direccion}  <button onClick={this.setDatos("direccion")} type="button" className="btn btn-outline-primary">Editar</button>
        </div>
        <hr />
        <p className="mb-2 font-weight-bold">
          <FontAwesomeIcon icon={faMobile} size="1x" /> Fono  </p>

        <div className="d-flex justify-content-between">{fono}   <button onClick={this.setDatos("fono")} type="button" className="btn btn-outline-primary">Editar</button>
        </div>
        <hr />
        <p className="mb-2 font-weight-bold">
          <FontAwesomeIcon icon={faAddressBook} size="1x" /> E-mail <br /> {email}
        </p>
        <hr />
        <p className="mb-2 font-weight-bold">
          <FontAwesomeIcon icon={faCheckCircle} size="1x" /> ¿E-mail validado? </p>
        <div className="d-flex justify-content-between"> {utils.emailVerificado(emailVerified)}   <button onClick={this.setDatos("validar")} type="button" className="btn btn-outline-primary">Validar</button>
        </div>
        <hr />


      </div>
    );
  }

  private setDatos = (d: string) => () => {
    switch (d) {
      case "fono":
        alert(d)
        break;
      case "ciudad":
        alert(d)
        break;
      case "comuna":
        alert(d)
        break;
      case "direccion":
        alert(d)
        break;
      case "email":
        alert(d)
        break;
      case "nombre":
        alert(d)
        break;
      case "validar":
        const { auth } = services
        const u = auth.currentUser
        if (u != null) {
            if (!u.emailVerified) {
              u.sendEmailVerification().then(() => {
                 // Email sent.
                 // tslint:disable-next-line: no-console
                 console.log("Se envió corectamente el e-mail de verificacion", u)
                 alert(` Te hemos enviado un  correo a ${u.email}, pincha la url enviada y luego entra nuevamente a la app o dale refesh a tu nabegador`)
              }).catch((error) => {
                 // An error happened.
                 // tslint:disable-next-line: no-console
                 console.log("Se ha producido un error al enviar el correo de verificación", error)
              });
  
           } else{
              alert("Tu correo ya fue validado")
           }
        }
        break;

      default:
        break;
    }

    // if (d === "fono") {
    //   alert("Fono")
    // } else { alert("No Fono") }

  }


}
