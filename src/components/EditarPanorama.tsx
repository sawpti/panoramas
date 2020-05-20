import * as React from "react";
// import React, { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEdit,
  faSave,
  faRetweet,
  faArrowAltCircleLeft,
  faMapMarked,
} from "@fortawesome/free-solid-svg-icons";
// nimport GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
// import Geocode from 'react-geocode'
import useOnclickOutside from "react-cool-onclickoutside";

// import 'react-google-places-autocomplete/dist/index.min.css';
import services from "../service";
import SweetAlert from "react-bootstrap-sweetalert";
import { Alert, Image, ListGroup } from "react-bootstrap";
import noImage from "../images/unnamed.jpg";

// Geocode.setApiKey("AIzaSyAHTaKvQEE-WnvtbneuXD0rqmtej1CZY5c");

// // set response language. Defaults to english.
// Geocode.setLanguage("en");

// // set response region. Its optional.
// // A Geocoding request with region=es (Spain) will return the Spanish city.
// Geocode.setRegion("es");
// // Enable or disable logs. Its optional.
// Geocode.enableDebug();

interface IPanoramaProps {
  idPanorama: string;
  lat: number;
  lng: number;
  calificacion?: number;
  descripcion?: string;
  destacado?: string;
  exigenciaFisica?: number;
  nomProveedor?: string;
  nombre?: string;
  urlImagen?: string;
  urlImagen1?: string;
  urlImagen2?: string;
  urlWeb?: string;
  urlMapUbicacion?: string;
  urlInstagram?: string;
  urlFacebook?: string;
  urlTripAdvisor?: string;
  titulo?: string;
  valor?: number;
  direccion?: string;
}

interface IStateEditar {
  idPanorama: string;
  lat: number;
  lng: number;
  nombre: string;
  descripcion: string;
  urlImagen: string;
  urlImagen1: string;
  urlImagen2: string;
  urlWeb: string;
  urlInstagram: string;
  urlFacebook: string;
  urlTripAdvisor: string;
  uploadValue: number;
  uploadValue1: number;
  uploadValue2: number;
  calificacion: number;
  exigenciaFisica?: number;
  valor: number;
  destacado: string;
  alert: React.ReactNode;
  direccion: string;
  placeId?:string
  comuna?:string
  region?:string,
  pais?:string
}

export default class EditarPanorama extends React.Component<
  IPanoramaProps,
  IStateEditar
> {
  constructor(props: IPanoramaProps) {
    super(props);
    this.state = {
      alert: null,
      calificacion: props.calificacion || 0,
      descripcion: props.descripcion || "No se ha ingresado",
      destacado: props.destacado ? props.destacado : "NO",
      direccion: props.direccion || "",
      exigenciaFisica: props.exigenciaFisica || 0,
      idPanorama: props.idPanorama,
      lat: props.lat,
      lng: props.lng,
      nombre: props.nombre || "No se ha ingreasado",
      uploadValue: 0,
      uploadValue1: 0,
      uploadValue2: 0,
      urlFacebook: props.urlFacebook || "No se ha ingresado",
      urlImagen: props.urlImagen || noImage,
      urlImagen1: props.urlImagen1 || noImage,
      urlImagen2: props.urlImagen2 || noImage,
      urlInstagram: props.urlInstagram || "No se ha ingresado",
      urlTripAdvisor: props.urlTripAdvisor || "No se ha ingresado",
      urlWeb: props.urlWeb || "No se ha ingresado",
      valor: props.valor || 0,
    };
  }

  // https://carlosazaustre.es/usando-firebase-storage-con-react-js
  public handleOnChange = (r: string, img: number) => async (e: any) => {
    const { storage } = services;
    const file = e.target.files[0];
    const storageRef = storage.ref();
    switch (img) {
      case 0:
        this.setState({
          uploadValue: 50,
        });
        const response = await storageRef
          .child(`panoramas`)
          .child(`${r}.jpeg`)
          .put(file);
        this.setState({
          uploadValue: 100,
        });
        const url = await response.ref.getDownloadURL();
        // tslint:disable-next-line:no-console
        //  console.log(`url Imagen:  ${url}`);

        this.setState({
          urlImagen: url,
        });

        break;
      case 1:
        this.setState({
          uploadValue1: 50,
        });
        const response1 = await storageRef
          .child(`panoramas`)
          .child(`${r}.jpeg`)
          .put(file);
        this.setState({
          uploadValue1: 100,
        });
        const url1 = await response1.ref.getDownloadURL();
        // tslint:disable-next-line:no-console
        //  console.log(`url Imagen:  ${url}`);

        this.setState({
          urlImagen1: url1,
        });

        break;
      case 2:
        this.setState({
          uploadValue2: 50,
        });
        const response2 = await storageRef
          .child(`panoramas`)
          .child(`${r}.jpeg`)
          .put(file);
        this.setState({
          uploadValue2: 100,
        });
        const url2 = await response2.ref.getDownloadURL();
        // tslint:disable-next-line:no-console
        //  console.log(`url Imagen:  ${url}`);

        this.setState({
          urlImagen2: url2,
        });

        break;

      default:
        break;
    }
  };

  public onReceiveInput = (value: string, nombreCampo: string) => {
    // tslint:disable-next-line: no-console
    //  console.log(`value ${value} otro: ${value.length}`);
    this.setState({
      alert: (
        <SweetAlert success={true} title="¡Listo!" onConfirm={this.hideAlert}>
          Valor '{nombreCampo}' ha sido actualizado a: {value.substr(0, 50)}...
        </SweetAlert>
      ),
    });
  };
  public hideAlert = () => {
    this.setState({
      alert: null,
    });
    // location.href = "/app/admin"
  };

  public render() {
    const { idPanorama } = this.props;
    //  let direccion=""
    // let lt=0
    // let ln=0

    const PlacesAutocomplete = () => {
      const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        debounce: 300,
        requestOptions: {
          /* Define search scope here */
        },
      });

      const ref = React.useRef<HTMLInputElement>(null);
      // const ref = useRef<HTMLElement | null>(null);
      // const ref = useRef<HTMLElement>(null!);
      useOnclickOutside(ref, () => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
      });

      const handleInput = (e: any) => {
        // Update the keyword of the input element
        setValue(e.target.value);
      };

      const handleSelect = (
        { description }: any,
       
      ) => () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter as "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        // getGeocode({ address: description })
        //   .then((results) => getLatLng(results[0]))
        //   .then((latLng) => {
        //     const { lat, lng } = latLng;
        //     // tslint:disable-next-line:no-console
        //     console.log("📍 Coordinates: ", { lat, lng });
        //     this.setState({
        //       direccion: `${dirMax},${dirMin}`,
        //       lat,
        //       lng,
        //     });
        //   })
        //   .catch((error) => {
        //     // tslint:disable-next-line:no-console
        //     console.log("😱 Error: ", error);
        //   });

        // Opcion para obtener más datos de la api

        getGeocode({ address: description })
          .then((results) => {
            // tslint:disable-next-line:no-console
            console.log("📍 Results: ", results);
            // tslint:disable-next-line:no-console
            console.log("📍 Results[0]: ", results[0]);

            // tslint:disable-next-line:no-console
            console.log(
              "📍 Results[0].geometry.location.lat: ",
              results[0].geometry.location.lat()
            );
            // tslint:disable-next-line:no-console
            console.log(
              "📍 Results[0].geometry.location.lng: ",
              results[0].geometry.location.lng()
            );

            // tslint:disable-next-line:no-console
            console.log("📍 Results[2]: ", results[2]);
       
            getLatLng(results[0])
              .then(({ lat, lng }) => {
               
                const largo = results[0].address_components.length
                 // tslint:disable-next-line:no-console
                console.log("📍 Coordinates: ", { lat, lng });

                 this.setState({
                   comuna: results[0].address_components[largo-4].long_name,
                   direccion: results[0].formatted_address,
                   lat,
                   lng,
                   pais:results[0].address_components[largo-1].long_name,
                   placeId: results[0].place_id,
                   region: results[0].address_components[largo-2].long_name,
                   
                 })
              })
              .catch((error) => {
                // tslint:disable-next-line:no-console
                console.log("😱 Error: ", error);
              });
          })
          .catch((error) => {
            // tslint:disable-next-line:no-console
            console.log("😱 Error: ", error);
          });
      };

      const renderSuggestions = () =>
        data.map((suggestion) => {
          const {
            id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
          //  direccion=`${main_text},${secondary_text}`

          return (
            <ListGroup.Item
              key={id}
              onClick={handleSelect(suggestion)}
            >
              {" "}
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </ListGroup.Item>
          );
        });

      return (
        <div ref={ref} className="container-fluid">
          <input
            className="form-control"
            value={value}
            // value={this.state.direccion}
            onChange={handleInput}
            // onFocus={handleInputOnFocus}
            // onClick={handleInputOnFocus}
            disabled={!ready}
            placeholder="Escribe el nombre de la comuna dónde está ubicado el panorama"
          />
          {/* We can use the "status" to decide whether we should display the dropdown or not */}
          {status === "OK" && <ul>{renderSuggestions()}</ul>}
        </div>
      );
    };

    // tslint:disable-next-line: no-console
    console.log(
       `Latitud: ${this.state.lat}/ Longitud: ${this.state.lng} <br/> Dirección: ${this.state.direccion}`
    );
    // // tslint:disable-next-line: no-console
    // console.log(this.props.match.params.idPanorama); // Prints 'abc'
    // // tslint:disable-next-line: no-console
    // console.log(typeof this.props.match.params.nombre === 'string'); // prints 'true'

    return (
      <React.Fragment>
        <div className="container">
          <Alert variant="info" className="container">
            <Alert.Heading>
              {" "}
              <FontAwesomeIcon icon={faEdit} size="2x" /> Modo edición
            </Alert.Heading>
            <p>
              Realiza el cambio quieras editar y luego presiona el botón{" "}
              <FontAwesomeIcon icon={faSave} size="1x" /> junto al campo para
              guardar. Para actualizar presiona "{" "}
              <FontAwesomeIcon icon={faRetweet} size="1x" /> Actualizar" y para
              regresar sin haber realizado cambios usa el botón "
              <FontAwesomeIcon icon={faArrowAltCircleLeft} size="1x" />{" "}
              Regresar"
            </p>
          </Alert>

          <hr className="noshade" />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Panorama [{idPanorama}]
          </p>
          <div className="d-flex justify-content-between">
            <input
              value={this.state.nombre}
              onChange={this.updateInputValue}
              type="text"
              name="nombre"
              id="nombre"
              className="form-control"
              maxLength={150}
            />
            <button
              onClick={this.setDato("nombre")}
              type="button"
              className="btn btn-outline-primary"
            >
              {" "}
              <FontAwesomeIcon icon={faSave} size="1x" />{" "}
            </button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faMapMarked} size="1x" /> Ubicación:{" "}
            {this.state.direccion}
          </p>
          <div className="d-flex justify-content-between">
            <PlacesAutocomplete />
            <button
              onClick={this.setDato("coordenadas")}
              type="button"
              className="btn btn-outline-primary"
            >
              <FontAwesomeIcon icon={faSave} size="1x" />{" "}
            </button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Descripción
          </p>
          <div className="d-flex justify-content-between">
            <textarea
              rows={10}
              value={this.state.descripcion}
              onChange={this.updateInputValue}
              name="descripcion"
              id="descripcion"
              className="form-control"
              maxLength={300} 
            />
            <button
              onClick={this.setDato("descripcion")}
              type="button"
              className="btn btn-outline-primary"
            >
              <FontAwesomeIcon icon={faSave} size="1x" />{" "}
            </button>
          </div>

             <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Url sitio web
          </p>
          <div className="d-flex justify-content-between">
            <input
              maxLength={150}
              value={this.state.urlWeb}
              onChange={this.updateInputValue}
              type="url"
              x-moz-errormessage="Por favor, especifique una url de correo válida."
              name="urlWeb"
              id="urlWeb"
              className="form-control"
            />
            <button
              onClick={this.setDato("urlWeb")}
              type="button"
              className="btn btn-outline-primary"
            >
              <FontAwesomeIcon icon={faSave} size="1x" />
            </button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Url Facebbok
          </p>
          <div className="d-flex justify-content-between">
            <input
              maxLength={150}
              value={this.state.urlFacebook}
              onChange={this.updateInputValue}
              type="url"
              x-moz-errormessage="Por favor, especifique una url de correo válida."
              name="urlFacebook"
              id="urlFacebook"
              className="form-control"
            />
            <button
              onClick={this.setDato("urlFacebook")}
              type="button"
              className="btn btn-outline-primary"
            >
              <FontAwesomeIcon icon={faSave} size="1x" />
            </button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Url Instagram
          </p>
          <div className="d-flex justify-content-between">
            <input
              maxLength={150}
              value={this.state.urlInstagram}
              onChange={this.updateInputValue}
              type="url"
              x-moz-errormessage="Por favor, especifique una url de correo válida."
              name="urlInstagram"
              id="urlInstagram"
              className="form-control"
            />
            <button
              onClick={this.setDato("urlInstagram")}
              type="button"
              className="btn btn-outline-primary"
            >
              <FontAwesomeIcon icon={faSave} size="1x" />
            </button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Url TripAdvisor
          </p>
          <div className="d-flex justify-content-between">
            <input
              maxLength={150}
              value={this.state.urlTripAdvisor}
              onChange={this.updateInputValue}
              type="url"
              x-moz-errormessage="Por favor, especifique una url de correo válida."
              name="urlTripAdvisor"
              id="urlTripAdvisor"
              className="form-control"
            />
            <button
              onClick={this.setDato("urlTripAdvisor")}
              type="button"
              className="btn btn-outline-primary"
            >
              <FontAwesomeIcon icon={faSave} size="1x" />
            </button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Calificación ( 1 a 5)
          </p>
          <div className="d-flex justify-content-between">
            <input
              value={this.state.calificacion}
              onChange={this.updateInputValue}
              type="number"
              min="1"
              max="5"
              name="calificacion"
              id="calificacion"
              className="form-control"
            />
            <button
              onClick={this.setDato("calificacion")}
              type="button"
              className="btn btn-outline-primary"
            >
              <FontAwesomeIcon icon={faSave} size="1x" />
            </button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Exigencia Física ( 1 a
            5)
          </p>
          <div className="d-flex justify-content-between">
            <input
              value={this.state.exigenciaFisica}
              onChange={this.updateInputValue}
              type="number"
              min="1"
              max="5"
              name="exigenciaFisica"
              id="exigenciaFisica"
              className="form-control"
            />
            <button
              onClick={this.setDato("exigenciaFisica")}
              type="button"
              className="btn btn-outline-primary"
            >
              <FontAwesomeIcon icon={faSave} size="1x" />
            </button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" /> Valor por persona
          </p>
          <div className="d-flex justify-content-between">
            <input
              value={this.state.valor}
              onChange={this.updateInputValue}
              type="number"
              min="1"
              max="1000000"
              name="valor"
              id="valor"
              className="form-control"
            />
            <button
              onClick={this.setDato("valor")}
              type="button"
              className="btn btn-outline-primary"
            >
              <FontAwesomeIcon icon={faSave} size="1x" />
            </button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" />
            ¿Este panorama es destacado?
          </p>
          <div className="d-flex justify-content-between">
            <select
              name="destacado"
              id="destacado"
              className="form-control selectpicker"
              value={this.state.destacado}
              onChange={this.cambioDestacado}
            >
              <option>SI</option>
              <option>NO</option>
            </select>
            <button
              onClick={this.setDato("destacado")}
              type="button"
              className="btn btn-outline-primary"
            >
              <FontAwesomeIcon icon={faSave} size="1x" />
            </button>
          </div>

          <hr />
          <p className="mb-2 font-weight-bold">
            <FontAwesomeIcon icon={faEdit} size="1x" />
            Imágenes. En sección puedes cambiar las imágenes
          </p>
          <div className="flex-column justify-content-between">
            <div>
              <Image
                src={this.state.urlImagen}
                rounded={true}
                thumbnail={true}
                width={500}
              />
              <br />
              <progress value={this.state.uploadValue} max="100">
                <br />
                {this.state.uploadValue} %
              </progress>
              <br />
              <input
                className="btn btn-outline-primary"
                type="file"
                accept="image/png, .jpeg, .jpg, image/gif"
                onChange={this.handleOnChange(idPanorama, 0)}
              />

              <br />
            </div>

            <hr />
            <div>
              <Image
                src={this.state.urlImagen1}
                rounded={true}
                thumbnail={true}
                width={500}
              />
              <br />
              <progress value={this.state.uploadValue1} max="100">
                {this.state.uploadValue1} %
              </progress>
              <br />
              <input
                type="file"
                className="btn btn-outline-primary"
                onChange={this.handleOnChange(`${idPanorama}1`, 1)}
              />

              <br />
            </div>

            <hr />
            <div>
              <Image
                src={this.state.urlImagen2}
                rounded={true}
                thumbnail={true}
                width={500}
              />
              <br />
              <progress value={this.state.uploadValue2} max="100">
                {this.state.uploadValue2} %
              </progress>
              <br />
              <input
                type="file"
                className="btn btn-outline-primary"
                onChange={this.handleOnChange(`${idPanorama}2`, 2)}
              />

              <br />
            </div>
          </div>
        </div>
        {this.state.alert}
      </React.Fragment>
    );
  }
  // React.FormEvent<HTMLFormElement>

  public handleProfileImageSubmit = () => {
    alert("handleProfileImageSubmit");
  };
  public submitProfileImg = () => {
    alert("submitProfileImg");
  };

  public cambioDestacado = (e: any) => {
    this.setState({
      destacado: e.target.value,
    });
  };
  public updateInputValue = (evt: any) => {
    // tslint:disable-next-line: no-console
    //  console.log("No se ha realizado ninguna acción en la bd", evt);
    switch (evt.target.name) {
      case "nombre":
        this.setState({
          nombre: evt.target.value,
        });
        break;
      case "descripcion":
        this.setState({
          descripcion: evt.target.value,
        });
        break;
      case "urlWeb":
        this.setState({
          urlWeb: evt.target.value,
        });
        break;
      case "urlFacebook":
        this.setState({
          urlFacebook: evt.target.value,
        });
        break;
      case "urlInstagram":
        this.setState({
          urlInstagram: evt.target.value,
        });
        break;
      case "urlTripAdvisor":
        this.setState({
          urlTripAdvisor: evt.target.value,
        });
        break;
      case "calificacion":
        this.setState({
          calificacion: evt.target.value,
        });
        break;
      case "exigenciaFisica":
        this.setState({
          exigenciaFisica: evt.target.value,
        });
        break;
      case "valor":
        this.setState({
          valor: evt.target.value,
        });
        break;

      default:
        // tslint:disable-next-line: no-console
        // console.log("No se ha realizado ninguna acción en la bd");
        break;
    }
  };
  public setDato = (nombreValor: string) => async () => {
    const {
      idPanorama,
      nombre,
      descripcion,
      urlWeb,
      urlFacebook,
      urlInstagram,
      urlTripAdvisor,
      calificacion,
      exigenciaFisica,
      valor,
      destacado,
    } = this.state;

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
            userToModify: uid,
          });
          this.onReceiveInput(nombre, nombreValor);
          // alert("Nombre del panorama ha sido actualizado")
        } catch (error) {
          alert("Error" + error.message);
        }

        break;
      case "descripcion":
        await doc.update({
          descripcion: descripcion.substr(0, 350), // Solo guarda los primero 350 caracteres
          lastModification: new Date(),
          userToModify: uid,
        });
        this.onReceiveInput(descripcion, nombreValor);
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
      case "coordenadas":
        await doc.update({
          
          comuna: this.state.comuna,
          direccion: this.state.direccion,
          lastModification: new Date(),
          lat: this.state.lat,
          lng: this.state.lng,
          pais: this.state.pais,
          placeId:this.state.placeId,
          region: this.state.region,
         // url_map_ubicacion: https://maps.google.com/?q=23.135249,-82.359685
          userToModify: uid,
        });
        this.onReceiveInput(
          `${this.state.lat}, ${this.state.lng} y ${this.state.direccion}`,
          nombreValor
        );
        break;
      default:
        //  this.onReceiveInput(respInput, nombreValor)
        // tslint:disable-next-line: no-console
        console.log("No se ha realizado ninguna acción en la bd");
        break;
    }
  };
}
