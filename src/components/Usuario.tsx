import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCity, faMobile, faAddressBook, faAddressCard, faCheckCircle, faFlag } from '@fortawesome/free-solid-svg-icons';
import * as utils from '../utils';
import services from 'src/service';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Spinner, Container } from 'react-bootstrap'

// @ts-ignore
window.React = React;
// @ts-ignore
window.SweetAlert = SweetAlert;


export interface IUsuarioProps {
  ciudad: string
  comuna: string
  direccion: string
  email: string
  emailVerified: boolean
  fono: string
  nombre: string


}
interface IState {
  alert: React.ReactNode
  writebd: boolean
}

export default class Usuario extends React.Component<IUsuarioProps, IState> {
  constructor(props: IUsuarioProps) {
    super(props)
    this.state = {
      alert: null,
      writebd: false,
    }
  }

  // public inputAlert(titulo: string, nombreValor: string) {
  //   this.setState({
  //     alert: (
  //       <SweetAlert
  //         input={true}
  //         showCancel={true}
  //         cancelBtnBsStyle="default"
  //         defaultValue={this.props.nombre}
  //         title={titulo}
  //         //  placeholder="Write something"
  //         onConfirm={this.onClick(nombreValor)}
  //         onCancel={this.hideAlert}
  //       >
  //         Escribe el nuevo {nombreValor}
  //       </SweetAlert>
  //     )
  //   })


  // }
  public onReceiveInput = (value: string, nombreCampo: string, ) => {
    // tslint:disable-next-line: no-console
    //  console.log(`value ${value} otro: ${value.length}`);
    this.setState({
      alert: (
        <SweetAlert success={true} title="¡Listo!" onConfirm={this.hideAlert}>
          Valor '{nombreCampo}' ha sido actualizado a: {value.substr(0, 50)}...
        </SweetAlert>
      )
    });
    // tslint:disable-next-line: no-console
    //  console.log(`value  estado  funcion ${this.state.dato}`);
  }
  public hideAlert = () => {
    this.setState({
      alert: null
    });
    location.href = "/app/perfil"
  }
  public hideAlert1 = () => {
    this.setState({
      alert: null
    });
    // location.href = "/app/perfil"
  }

  public onClick = (nombreValor: string) => async (respInput: string) => {
    const { ciudad, comuna, direccion, email, nombre, fono} = this.props
    const { auth, db } = services
    const u = auth.currentUser

    // tslint:disable-next-line: no-console
    console.log(`respInput ${respInput}  nombreValor: ${nombreValor}`);

    switch (nombreValor) {
      case "ciudad":
        if (respInput !== ciudad) {
          this.setState({
            writebd: true
          })
          if (u != null) {
            const doc = db.collection('users').doc(u.uid)
            await doc.update({
              ciudad: respInput.substr(0, 50) // Solo guarda los primero 50 caracteres
            })
          }
          this.setState({
            writebd: false
          })
          this.onReceiveInput(respInput, nombreValor)
        }
        // tslint:disable-next-line: no-console
        console.log(`la cuidad es la misma, valor ingresado ${respInput}  valor en bd: ${ciudad}`)
        this.onReceiveInput(respInput, nombreValor)
        break;
      case "comuna":
        if (respInput !== comuna) {
          this.setState({
            writebd: true
          })
          if (u != null) {
            const doc = db.collection('users').doc(u.uid)
            await doc.update({
              comuna: respInput.substr(0, 50)
            })
          }
          this.setState({
            writebd: false
          })
          this.onReceiveInput(respInput, nombreValor)
        }
        // tslint:disable-next-line: no-console
        console.log(`La comuna es la misma, valor ingresado ${respInput}  valor en bd: ${comuna}`)
        this.onReceiveInput(respInput, nombreValor)
        break;
      case "direccion":
        if (respInput !== direccion) {
          this.setState({
            writebd: true
          })
          if (u != null) {
            const doc = db.collection('users').doc(u.uid)
            await doc.update({
              direccion: respInput.substr(0, 100)
            })
          }
          this.setState({
            writebd: false
          })
          this.onReceiveInput(respInput, nombreValor)
        }
        // tslint:disable-next-line: no-console
        console.log(`La dirección  es la misma, valor ingresado ${respInput}  valor en bd: ${direccion}`)
        this.onReceiveInput(respInput, nombreValor)
        break;
      case "email":
        if (respInput !== email) {
          this.setState({
            writebd: true
          })
          if (u != null) {

            // Actualizo el email en firabase auth
            await u.updateEmail(respInput).then(() => {
              // Update successful.
              // tslint:disable-next-line: no-console
              console.log(`La dirección de email ha sido actualizada de  ${email}  a ${respInput} `)
              // Finalmente actualizo la direccion de email en firestone
              const doc = db.collection('users').doc(u.uid)
              doc.update({
                email: respInput.substr(0, 60),
                emailVerified: false

              })
              // Envio un e-mail al usuario para que valide su correo
              u.sendEmailVerification().then(() => {
                // Email sent.
                // tslint:disable-next-line: no-console
                console.log("Se envió corectamente el e-mail de verificacion", u)
              }).catch((error) => {
                // An error happened.
                // tslint:disable-next-line: no-console
                console.log("Se ha producido un error al enviar el correo de verificación", error)
                return
              });
              this.onReceiveInput(respInput, nombreValor)





            }).catch((error) => {


              // An error happened.
              // tslint:disable-next-line: no-console
              console.log('Se ha producido el siguiene error al intentar actulizar el email en Firbase Authentication:', error)
              this.setState({
                alert: (
                  <SweetAlert error={true} title="¡Error!" onConfirm={this.hideAlert1}>
                    Se ha producido un error al intentar actualizar el email en Firebase Authentication.
                    <hr />
                    Código: {error.code}
                    <br />
                    Mensaje: {error.message}
                  </SweetAlert>
                )
              });

            });

          }


          this.setState({
            writebd: false
          })
          auth.signOut().then(() => {
            // tslint:disable-next-line: no-console
            console.log("Has salido")



          }).catch((error) => {
            // tslint:disable-next-line: no-console
            console.log("error", error)
            // alert(` Se ha producido un error  ${error}`)
          });


        } else {
          // tslint:disable-next-line: no-console
          console.log(`El e-mail es el mismo;  valor ingresado ${respInput}  valor en bd: ${email}`)
          this.setState({
            alert: (
              <SweetAlert info={true} title="¡Información!" onConfirm={this.hideAlert1}>
                El e-mail es el mismo;  valor ingresado {respInput}  valor en bd: {email}
              </SweetAlert>
            )
          });
        }
        //  this.onReceiveInput(respInput, nombreValor)
        break;
      case "nombre":
        if (respInput !== nombre) {
          this.setState({
            writebd: true
          })
          if (u != null) {
            const doc = db.collection('users').doc(u.uid)
            await doc.update({
              nombre: respInput.substr(0, 80)
            })
          }
          this.setState({
            writebd: false
          })
          this.onReceiveInput(respInput, nombreValor)
        }
        // tslint:disable-next-line: no-console
        console.log(`El  nombre es el mismo, valor ingresado ${respInput}  valor en bd: ${ciudad}`)
        this.onReceiveInput(respInput, nombreValor)
        break;
      case "fono":
        if (respInput !== fono) {
          this.setState({
            writebd: true
          })
          if (u != null) {
            const doc = db.collection('users').doc(u.uid)
            await doc.update({
              fono: respInput.substr(0, 40)
            })
          }
          this.setState({
            writebd: false
          })
          this.onReceiveInput(respInput, nombreValor)
        }
        // tslint:disable-next-line: no-console
        console.log(`El  nombre es el mismo, valor ingresado ${respInput}  valor en bd: ${ciudad}`)
        this.onReceiveInput(respInput, nombreValor)
        break;

      default:
        //  this.onReceiveInput(respInput, nombreValor)
        break;
    }



  }
  public render() {
    const { ciudad, comuna, direccion, email, emailVerified, fono, nombre } = this.props
    const { writebd } = this.state
    // tslint:disable-next-line: no-console
    // console.log(`value  estado  render ${this.state.dato}`);
    return (

      writebd ? (
        <Container fluid={true} className="align-content-center justify-content-center d-flex p-5">
          <Spinner className="mt-5 align-middle" animation="border" variant="primary" />
        </Container>) :
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
            <FontAwesomeIcon icon={faAddressBook} size="1x" /> E-mail  </p>

          <div className="d-flex justify-content-between">{email}   <button onClick={this.setDatos("email")} type="button" className="btn btn-outline-primary">Editar</button>

          </div>
          <p> ¡Importante! <code>
            <small>Cuando edites el cambio de email automáticamente se cerrará tu sesión, entoces deberás iniciar sesión con tu nuevo correo.
              Tu contraseña seguirá siendo la que ya tenías. También te llegará una url de validación a tu nuevo correo. </small></code>
          </p>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faCheckCircle} size="1x" /> ¿E-mail validado? </p>
          <div className="d-flex justify-content-between"> {utils.emailVerificado(emailVerified)}   <button onClick={this.setDatos("validar")} type="button" className="btn btn-outline-primary">Validar</button>
          </div>
          <hr />
          {this.state.alert}

        </div>
    );
  }

  public setDatos = (d: string) => () => {
    switch (d) {
      case "fono":
        this.setState({
          alert: (
            <SweetAlert
              input={true}
              showCancel={true}
              cancelBtnBsStyle="default"
              defaultValue={this.props.fono}
              title="Actualiza tu teléfono"
              //  placeholder="Write something"
              onConfirm={this.onClick("fono")}
              onCancel={this.hideAlert1}
            >
              Ingresa tu nuevo número de teléfono. Para más de uno, separalos por una coma.
                  </SweetAlert>
          )
        })
        break;

      
      case "ciudad":

        this.setState({
          alert: (
            <SweetAlert
              input={true}
              showCancel={true}
              cancelBtnBsStyle="default"
              defaultValue={this.props.ciudad}
              title="Cambiar la ciudad"
              //  placeholder="Write something"
              onConfirm={this.onClick("ciudad")}
              onCancel={this.hideAlert1}
            >
              Escribe el  nombre de tu nueva ciudad
              </SweetAlert>
          )
        })

        break;
      case "comuna":
        this.setState({
          alert: (
            <SweetAlert
              input={true}
              showCancel={true}
              cancelBtnBsStyle="default"
              defaultValue={this.props.comuna}
              title="Cambiar la comuna"
              //  placeholder="Write something"
              onConfirm={this.onClick("comuna")}
              onCancel={this.hideAlert1}
            >
              Escribe el  nombre de tu nueva comuna
                </SweetAlert>
          )
        })

        break;
      case "direccion":
        this.setState({
          alert: (
            <SweetAlert
              input={true}
              showCancel={true}
              cancelBtnBsStyle="default"
              defaultValue={this.props.direccion}
              title="Cambiar la dirección"
              //  placeholder="Write something"
              onConfirm={this.onClick("direccion")}
              onCancel={this.hideAlert1}
            >
              Escribe tu nueva dirección
                </SweetAlert>
          )
        })

        break;
      case "email":
        this.setState({
          alert: (
            <SweetAlert
              input={true}
              showCancel={true}
              cancelBtnBsStyle="default"
              defaultValue={this.props.email}
              title="Cambiar el e-mail"
              //  placeholder="Write something"
              onConfirm={this.onClick("email")}
              onCancel={this.hideAlert1}
            >
              Escribe tu nuevo e-mail
                </SweetAlert>
          )
        })
        break;
      case "nombre":
        this.setState({
          alert: (
            <SweetAlert
              input={true}
              showCancel={true}
              cancelBtnBsStyle="default"
              defaultValue={this.props.nombre}
              title="Modificar tu nombre"
              //  placeholder="Write something"
              onConfirm={this.onClick("nombre")}
              onCancel={this.hideAlert1}
            >
              Corrige los errores en tu nombre
                </SweetAlert>
          )
        })
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
              //    alert(` Te hemos enviado un  correo a ${u.email}, pincha la url enviada y luego entra nuevamente a la app o dale refesh a tu nabegador`)
              this.setState({
                alert: (
                  <SweetAlert info={true} title="¡Información!" onConfirm={this.hideAlert1}>
                    Te hemos enviado un  correo a {u.email}, pincha la url enviada y luego entra nuevamente a la app o dale refesh a tu navegador
                  </SweetAlert>
                )
              });
            }).catch((error) => {
              // An error happened.
              // tslint:disable-next-line: no-console
              console.log("Se ha producido un error al enviar el correo de verificación", error)
              this.setState({
                alert: (
                  <SweetAlert error={true} title="¡Error!" onConfirm={this.hideAlert1}>
                    Se ha producido un error al intentar enviar el correo de verificación desde Firebase Authentication.
                    <hr />
                    Código: {error.code}
                    <br />
                    Mensaje: {error.message}
                  </SweetAlert>
                )
              });
            });

          } else {
            // alert("Tu correo ya fue validado")
            this.setState({
              alert: (
                <SweetAlert success={true} title="¡Acción ya realizada!" onConfirm={this.hideAlert1}>
                  Ya habías validado tu correo. ¡Gracias!
                </SweetAlert>
              ),

            });
          }
        }
        break;

      default:
        break;
    }
  }


}
