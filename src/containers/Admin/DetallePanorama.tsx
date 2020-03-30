/* 
  Con este contenedor se itentó edirar un panorama, al cual se accediapor medio de una ruta configurada en App.tsx
  Sin embargo se desechó puesto ese enviava muchos parametros en la ruta url
**/



import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { withRouter, RouteComponentProps } from "react-router";
import services from "src/service";
import SweetAlert from "react-bootstrap-sweetalert";





interface IPathParamsType {
  idPanorama: string
  descripcion: string
  nombre: string;
  urlWeb: string;
  urlMapUbicacion: string;
  valor:string;

}
interface IStateDetalle {
  idPanorama: string
  nombre: string
  descripcion: string
  urlWeb: string;
  urlMapUbicacion: string;
  valor: string;
  alert: React.ReactNode;

}

type PropsType = RouteComponentProps<IPathParamsType> & {


}

class DetallePanorama extends React.Component<PropsType, IStateDetalle>{
  constructor(props: PropsType) {
    super(props);
    this.state = {
      alert: null,
      descripcion: props.match.params.descripcion || "np hay",
      idPanorama: props.match.params.idPanorama,
      nombre: props.match.params.nombre,
      urlMapUbicacion: props.match.params.urlMapUbicacion,
      urlWeb: props.match.params.urlWeb,
      valor: props.match.params.valor,
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
    const { idPanorama } = this.props.match.params

    // tslint:disable-next-line: no-console
    console.log(`Nombre: ${this.state.nombre} / Descripción: ${this.state.descripcion} Descripción: ${this.state.urlWeb}`);
    // // tslint:disable-next-line: no-console
    // console.log(this.props.match.params.idPanorama); // Prints 'abc'
    // // tslint:disable-next-line: no-console
    // console.log(typeof this.props.match.params.nombre === 'string'); // prints 'true'

    return (
      <React.Fragment>
        <div className="container">
          <hr className="noshade" />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Panorama [{idPanorama}]</p>
          <div className="d-flex justify-content-between">
            <input value={this.state.nombre} onChange={this.updateInputValue} type="text" name="nombre" id="nombre" className="form-control" />
            <button onClick={this.setDato("nombre")} type="button" className="btn btn-outline-primary">Guadar</button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold"><FontAwesomeIcon icon={faEdit} size="1x" /> Descripción</p>
          <div className="d-flex justify-content-between">
            <textarea value={this.state.descripcion} onChange={this.updateInputValue} name="descripcion" id="descripcion" className="form-control" />
            <button onClick={this.setDato("descripcion")} type="button" className="btn btn-outline-primary">Guardar</button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Url Ubicación</p>
          <div className="d-flex justify-content-between">
            <input value={this.state.urlMapUbicacion} onChange={this.updateInputValue} type="text" name="urlMapUbicacion" id="urlMapUbicacion" className="form-control" />
            <button onClick={this.setDato("urlMapUbicacion")} type="button" className="btn btn-outline-primary">Guadar</button>
          </div>
          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Url Ubicación</p>
          <div className="d-flex justify-content-between">
            <input value={this.state.urlWeb} onChange={this.updateInputValue} type="text" name="urlWeb" id="urlWeb" className="form-control" />
            <button onClick={this.setDato("urlWeb")} type="button" className="btn btn-outline-primary">Guadar</button>
          </div>


          

        </div>
        {this.state.alert}

      </React.Fragment>
    )



  }
  public setDatosf = () => {
    this.setState({
      nombre: "Otro Nombre"
    }
    )
  }
  // React.FormEvent<HTMLFormElement>
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
      default:
        // tslint:disable-next-line: no-console
        // console.log("No se ha realizado ninguna acción en la bd");
        break;
    }


  }
  public setDato = (nombreValor: string) => async () => {
    const { idPanorama, nombre, descripcion,urlMapUbicacion } = this.state

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

      default:
        //  this.onReceiveInput(respInput, nombreValor)
        // tslint:disable-next-line: no-console
        console.log("No se ha realizado ninguna acción en la bd");
        break;
    }
  };



}
export default withRouter(DetallePanorama)

// export interface IDetalleProps {
//   idPanorama: string
//   calificacion?: number
//   descripcion: string
//   destacado?: boolean
//   exigenciaFisica?: number
//   nomProveedor?: string
//   nombre: string
//   nombuton?:string
//   urlImagen?: string
//   urlImagen1?: string
//   urlImagen2?: string
//   urlWeb?: string
//   urlMapUbicacion?: string
//   urlInstagram?: string
//   urlFacebook?: string
//   urlTripAdvisor?: string
//   titulo?:string
//   valor?: number
//   hiddenXRealizar?:boolean
//   hiddenRealizado?:boolean
//   hidenCompartir?:boolean
//   setSharedClicked?: () => void
//   porRealizar?: () => void
//   editar?: () =>any

// }
// interface IDetallePanorama extends RouteComponentProps<IDetalleProps> {
//   // any other props (leave empty if none)
// }
// const setDatos = (dato: string) => () => {
//   // tslint:disable-next-line: no-console
//   console.log(` Clg:${dato}`);
// }

// const TopicDetail: React.FC<IDetallePanorama> = ({ match }) => {
//   const { nombre, idPanorama, descripcion } = match.params


//   return (
//     <React.Fragment>
//       <div className="container">
//         <hr className="noshade" />
//         <p className="mb-2 font-weight-bold">
//           <FontAwesomeIcon icon={faEdit} size="1x" /> Panorama [{idPanorama}]</p>
//         <div className="d-flex justify-content-between">
//           <input type="text" name="nombre" id="nombre" className="form-control" value={nombre} />
//           <button type="button" onClick={setDatos($("#num").val())} className="btn btn-outline-primary">Editar</button>
//         </div>

//         <hr />
//         <p className="mb-2 font-weight-bold"><FontAwesomeIcon icon={faEdit} size="1x" /> Descripción
//        </p>
//         <div className="d-flex justify-content-between">
//           <textarea name="descripcion" id="descripcion" className="form-control" value={descripcion} />
//           <button type="button" className="btn btn-outline-primary">Editar</button>
//         </div>



//       </div>

//     </React.Fragment>
//   )


// }

// export default withRouter(TopicDetail);




