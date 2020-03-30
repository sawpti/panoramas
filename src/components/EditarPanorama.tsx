import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons'
import services from "../service";
import SweetAlert from "react-bootstrap-sweetalert";
import { Alert } from 'react-bootstrap';
import ProfileImg from './ProfileImg';
import noImage from '../images/unnamed.jpg';
interface IPanoramaProps {
    idPanorama:string
    calificacion?: number
    descripcion?: string
    destacado?: string
    exigenciaFisica?: number
    nomProveedor?: string
    nombre?: string
    urlImagen?: string
    urlImagen1?: string
    urlImagen2?: string
    urlWeb?: string
    urlMapUbicacion?: string
    urlInstagram?: string
    urlFacebook?: string
    urlTripAdvisor?: string
    titulo?: string
    valor?: number
   
}

interface IStateEditar {
  idPanorama: string
  nombre: string
  descripcion: string
  urlImagen:string
  urlWeb: string
  urlMapUbicacion: string
  urlInstagram: string
  urlFacebook: string
  urlTripAdvisor: string
  calificacion:number
  exigenciaFisica?: number
  valor: number
  destacado:string
  alert: React.ReactNode;

}

 export default class  EditarPanorama extends React.Component<IPanoramaProps, IStateEditar>{
  constructor(props: IPanoramaProps) {
    super(props);
    this.state = {
      alert: null,
      calificacion:props.calificacion||0,
      descripcion: props.descripcion || "No se ha ingresado",
      destacado: props.destacado ? props.destacado:"NO",
      exigenciaFisica:props.exigenciaFisica||0,
      idPanorama: props.idPanorama,
      nombre: props.nombre||"No se ha ingreasado",
      urlFacebook: props.urlFacebook||"No se ha ingresado",
      urlImagen:props.urlImagen||noImage,
      urlInstagram: props.urlInstagram || "No se ha ingresado",
      urlMapUbicacion: props.urlMapUbicacion||"No se ha ingredo",
      urlTripAdvisor:props.urlTripAdvisor || "No se ha ingresado",
      urlWeb: props.urlWeb||"No se ha ingresado",
      valor: props.valor||0,
    };
  }
   public onReceiveInput = (value: string, nombreCampo: string) => {
    // tslint:disable-next-line: no-console
    //  console.log(`value ${value} otro: ${value.length}`);
    this.setState({
      alert: (
        <SweetAlert success={true} title="¡Listo!" onConfirm={this.hideAlert}>
          Valor '{nombreCampo}' ha sido actualizado a: {value.substr(0, 50)}...
        </SweetAlert>
      )
    });
   
  };
  public hideAlert = () => {
    this.setState({
      alert: null
    });
    // location.href = "/app/admin"
  };

  public render() {
    const { idPanorama } = this.props

    // tslint:disable-next-line: no-console
    console.log(`Destacado: ${this.state.destacado}`);
    // // tslint:disable-next-line: no-console
    // console.log(this.props.match.params.idPanorama); // Prints 'abc'
    // // tslint:disable-next-line: no-console
    // console.log(typeof this.props.match.params.nombre === 'string'); // prints 'true'

    return (
      <React.Fragment>
        <div className="container">
          <Alert variant="info" className="container">
            <Alert.Heading> <FontAwesomeIcon icon={faEdit} size="2x" /> Modo edición</Alert.Heading>
            <p>
              
              Realiza los cambios en él o los campos que quieras editar y luego presiona el botón <FontAwesomeIcon icon={faSave} size="1x" />  para guardar.
            </p>
            
           
          </Alert>
            <hr className="noshade" />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Panorama [{idPanorama}]</p>
          <div className="d-flex justify-content-between">
            <input value={this.state.nombre} onChange={this.updateInputValue} type="text" name="nombre" id="nombre" className="form-control" />
            <button onClick={this.setDato("nombre")} type="button" className="btn btn-outline-primary"> <FontAwesomeIcon icon={faSave}  size="1x"/> </button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold"><FontAwesomeIcon icon={faEdit} size="1x" /> Descripción</p>
          <div className="d-flex justify-content-between">
            <textarea rows={10} value={this.state.descripcion} onChange={this.updateInputValue} name="descripcion" id="descripcion" className="form-control" />
            <button onClick={this.setDato("descripcion")} type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faSave} size="1x" /> </button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Url Ubicación</p>
          <div className="d-flex justify-content-between">
            <input  value={this.state.urlMapUbicacion} onChange={this.updateInputValue} type="url" name="urlMapUbicacion" id="urlMapUbicacion" className="form-control" />
            <button onClick={this.setDato("urlMapUbicacion")} type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faSave} size="1x" /></button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Url sitio web</p>
          <div className="d-flex justify-content-between">
            <input value={this.state.urlWeb} onChange={this.updateInputValue} 
            type="url" 
            x-moz-errormessage="Por favor, especifique una url de correo válida."
            name="urlWeb" id="urlWeb" className="form-control" />
            <button onClick={this.setDato("urlWeb")} type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faSave} size="1x" /></button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Url Facebbok</p>
          <div className="d-flex justify-content-between">
            <input value={this.state.urlFacebook} onChange={this.updateInputValue}
              type="url"
              x-moz-errormessage="Por favor, especifique una url de correo válida."
              name="urlFacebook" id="urlFacebook" className="form-control" />
            <button onClick={this.setDato("urlFacebook")} type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faSave} size="1x" /></button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Url Instagram</p>
          <div className="d-flex justify-content-between">
            <input value={this.state.urlInstagram} onChange={this.updateInputValue}
              type="url"
              x-moz-errormessage="Por favor, especifique una url de correo válida."
              name="urlInstagram" id="urlInstagram" className="form-control" />
            <button onClick={this.setDato("urlInstagram")} type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faSave} size="1x" /></button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Url TripAdvisor</p>
          <div className="d-flex justify-content-between">
            <input value={this.state.urlTripAdvisor} onChange={this.updateInputValue}
              type="url"
              x-moz-errormessage="Por favor, especifique una url de correo válida."
              name="urlTripAdvisor" id="urlTripAdvisor" className="form-control" />
            <button onClick={this.setDato("urlTripAdvisor")} type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faSave} size="1x" /></button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Calificación ( 1 a 7)</p>
          <div className="d-flex justify-content-between">
            <input value={this.state.calificacion} onChange={this.updateInputValue}
              type='number' min="1" max="7"
              name="calificacion" id="calificacion" className="form-control" />
            <button onClick={this.setDato("calificacion")} type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faSave} size="1x" /></button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Exigencia Física ( 1 a 7)</p>
          <div className="d-flex justify-content-between">
            <input value={this.state.exigenciaFisica} onChange={this.updateInputValue}
              type='number' min="1" max="7"
              name="exigenciaFisica" id="exigenciaFisica" className="form-control" />
            <button onClick={this.setDato("exigenciaFisica")} type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faSave} size="1x" /></button>
          </div>


          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Valor por persona</p>
          <div className="d-flex justify-content-between">
            <input value={this.state.valor} onChange={this.updateInputValue}
              type='number' min="1" max="1000000"
              name="valor" id="valor" className="form-control" />
            <button onClick={this.setDato("valor")} type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faSave} size="1x" /></button>
          </div>

          <hr />
           <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" />¿Este panorama es destacado?</p>
          <div className="d-flex justify-content-between">

            <select name="destacado" id="destacado" className="form-control selectpicker" value={this.state.destacado} onChange={this.cambioDestacado}> 
              <option >SI</option>
              <option >NO</option>
           </select>
            <button onClick={this.setDato("destacado")} type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faSave} size="1x" /></button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" />Imagenes. Para cambiarla toca sobra una y cambiala por la que desees)</p>
          <div className="d-flex  justify-content-between container">
            <ProfileImg
              profileImage={this.state.urlImagen}
              onSubmit={this.handleProfileImageSubmit}
              submitProfileImg={this.submitProfileImg} /> 

          </div>
         
        </div>
        {this.state.alert}

      </React.Fragment>
    )
  }
  // React.FormEvent<HTMLFormElement>

  public handleProfileImageSubmit=()=>{
    alert("handleProfileImageSubmit")
  }
   public submitProfileImg = () => {
     alert("submitProfileImg")
   }




  public cambioDestacado=(e:any)=>{
    this.setState({
     destacado: e.target.value
    })
  }
  public updateInputValue = (evt: any) => {
    // tslint:disable-next-line: no-console
    //  console.log("No se ha realizado ninguna acción en la bd", evt);
    switch (evt.target.name) {
      case "nombre":
        this.setState({
          nombre: evt.target.value
        });
        break;
      case "descripcion":
        this.setState({
          descripcion: evt.target.value
        });
        break;
      case "urlMapUbicacion":
        this.setState({
         urlMapUbicacion: evt.target.value
        });
        break;
      case "urlWeb":
        this.setState({
          urlWeb: evt.target.value
        });
        break;
      case "urlFacebook":
        this.setState({
          urlFacebook: evt.target.value
        });
        break;
      case "urlInstagram":
        this.setState({
          urlInstagram: evt.target.value
        });
        break;
      case "urlTripAdvisor":
        this.setState({
          urlTripAdvisor: evt.target.value
        });
        break;
      case "calificacion":
        this.setState({
          calificacion: evt.target.value
        });
        break;
      case "exigenciaFisica":
        this.setState({
          exigenciaFisica: evt.target.value
        });
        break;
      case "valor":
        this.setState({
          valor: evt.target.value
        });
        break;
            

      default:
        // tslint:disable-next-line: no-console
        // console.log("No se ha realizado ninguna acción en la bd");
        break;
    }


  }
  public setDato = (nombreValor: string) => async () => {
    const { idPanorama, nombre, descripcion,urlMapUbicacion, urlWeb, urlFacebook, urlInstagram, urlTripAdvisor, calificacion, exigenciaFisica, valor, destacado} = this.state

    const { auth, db } = services;
    const uid = auth.currentUser ? auth.currentUser.uid : undefined;
    const doc = db.collection("panoramas").doc(idPanorama);

    // tslint:disable-next-line: no-console
    // console.log(
    //   `respInput:  ${respInput}  nombreValor: ${nombreValor}  id Panorama ${idPanorama} `
    // );

    switch (nombreValor) {
      case "nombre":
        try {
          await doc.update({
            lastModification: new Date(),
            nombre: nombre.substr(0, 50), // Solo guarda los primero 50 caracteres
            userToModify: uid
          });
          this.onReceiveInput(nombre, nombreValor);
          // alert("Nombre del panorama ha sido actualizado")
        } catch (error) {
          alert("Error" + error.message)

        }

        break;
      case "descripcion":
        await doc.update({
          descripcion: descripcion.substr(0, 350), // Solo guarda los primero 350 caracteres
          lastModification: new Date(),
          userToModify: uid
        });
        this.onReceiveInput(descripcion, nombreValor);
        break;
      case "urlMapUbicacion":
        await doc.update({
          lastModification: new Date(),
          urlMapUbicacion: urlMapUbicacion.substr(0, 150), 
          userToModify: uid,
        });
        this.onReceiveInput(urlMapUbicacion, nombreValor);
        break;
      case "urlWeb":
        await doc.update({
          lastModification: new Date(),
          urlWeb: urlWeb.substr(0, 150),
          userToModify: uid,
        });
        this.onReceiveInput(urlWeb, nombreValor);
        break;
      case "urlFacebook":
        await doc.update({
          lastModification: new Date(),
          urlFacebook: urlFacebook.substr(0, 150),
          userToModify: uid,
        });
        this.onReceiveInput(urlFacebook, nombreValor);
        break;
      case "urlInstagram":
        await doc.update({
          lastModification: new Date(),
          urlInstagram: urlInstagram.substr(0, 150),
          userToModify: uid,
        });
        this.onReceiveInput(urlInstagram, nombreValor);
        break;
      case "urlTripAdvisor":
        await doc.update({
          lastModification: new Date(),
          urlTripAdvisor: urlTripAdvisor.substr(0, 150),
          userToModify: uid,
        });
        this.onReceiveInput(urlTripAdvisor, nombreValor);
        break;
      case "calificacion":
        await doc.update({
          calificacion,
          lastModification: new Date(),
          userToModify: uid,
        });
        this.onReceiveInput(calificacion.toString(), nombreValor);
        break;
      case "exigenciaFisica":
        await doc.update({
          exigenciaFisica,
          lastModification: new Date(),
          userToModify: uid,
        });
        this.onReceiveInput(`${exigenciaFisica}`, nombreValor);
        break;
      case "valor":
        await doc.update({
          lastModification: new Date(),
          userToModify: uid,
          valor,
        });
        this.onReceiveInput(`${valor}`, nombreValor);
        break;
      case "destacado":
        await doc.update({
          destacado,
          lastModification: new Date(),
          userToModify: uid,
        });
        this.onReceiveInput(`${destacado}`, nombreValor);
        break;
      default:
        //  this.onReceiveInput(respInput, nombreValor)
        // tslint:disable-next-line: no-console
        console.log("No se ha realizado ninguna acción en la bd");
        break;
    }
  }

}