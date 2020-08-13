import * as React from "react";
import { useState } from "react";
import BeautyStars from "beauty-stars";

import {
  Card,
  Button,
  Modal,
  Container,
  Row,
  Col,
  ProgressBar,
  Carousel,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faShare,
  faMapMarked,
  faHiking,
  faMoneyBill,
  faTimes,
  faHeart,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import iconFb from "../images/iconfacebook.png";
import iconIn from "../images/iconinstagram.png";
import iconWeb from "../images/iweb.png";
import iconTA from "../images/tripAdvisor.png";
import * as utils from "../utils";

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
// import services from 'src/service';



export interface IPanoramaProps {
  calificacion: number;
  idPanorama?: string;
  descripcion: string;
  destacado?: string;
  exigenciaFisica: number;
  nomProveedor?: string;
  nombre: string;
  nombuton?: string;
  urlImagen: string;
  urlImagen1: string;
  urlImagen2: string;
  urlWeb?: string;
  urlInstagram?: string;
  urlFacebook?: string;
  urlTripAdvisor?: string;
  titulo?: string;
  valor: number;
  lat: number;
  lng: number;
  direccion?: string;
  hiddenXRealizar: boolean;
  hiddenRealizado: boolean;
  hidenCompartir: boolean;
  btnComentario: boolean
  setSharedClicked: () => void;
  porRealizar?: () => void;
  realizado?: () => void;
  showComnent?: () => any;
}

// const noComment = (c:boolean) => {

//   if (c) {

//     return (
//       <div>
//         <Button variant="outline-success" block={true} onClick={datos.showComnent} > Ver los comentarios  <FontAwesomeIcon
//           icon={faComment}
//         /></Button>

//       </div>
//     )

//   } else {
//     return (<div >
//       {null}

//     </div>)
//   }

// }

function ModalPanorama(datos: IPanoramaProps) {
  // const { auth, db } = services
  // const listComentarios = {}

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);





  // if (!auth.currentUser) {
  //   return (
  //     <div>Debes iniciar sesión</div>
  //   )
  // }
  // const snap = db.collection('panoramas')
  //   .doc(datos.idPanorama)
  //   .collection("comentarios")

  // snap.get().then(sn => {
  //   sn.forEach(x => {
  //     listComentarios[x.id] = x.data()
  //   })

  // })

  // // .get()
  // // tslint:disable-next-line: no-console
  // console.log("COmentarios: ", listComentarios);

  // const Iframe = () => {

  //   const iframe = `<iframe  height="400" frameborder="0" style="border:0"
  //     src="https://www.google.com/maps/embed/v1/place?q=${datos.direccion}&key=AIzaSyAHTaKvQEE-WnvtbneuXD0rqmtej1CZY5c" allowfullscreen></iframe>`
  //   return (<div dangerouslySetInnerHTML={{ __html: iframe }} />)
  // }
  const MapWithAMarker = withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: datos.lat, lng: datos.lng }}
    >
      <Marker position={{ lat: datos.lat, lng: datos.lng }} />
    </GoogleMap>
  ));

  return (
    <>
      <Button variant="outline-success" block={true} onClick={handleShow}>
        <FontAwesomeIcon icon={faInfoCircle} size="1x" /> {datos.nombuton}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>
            {" "}
            {datos.nombre}:{" "}
            <small>
              {" "}
              {datos.titulo}/{datos.direccion}{" "}
            </small>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <div className="d-flex justify-content-between">
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">
                    Agrega el panorama a tu lista de Panoramas Deseados"
                  </Tooltip>
                }
              >
                <div
                  className="text-dark"
                  onClick={datos.porRealizar}
                  hidden={datos.hiddenXRealizar}
                >
                  <FontAwesomeIcon icon={faHeart} size="2x" color="#689f38" />{" "}
                  Marcar como deseado
                </div>
              </OverlayTrigger>

              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">
                    {" "}
                    Agrega el panorama a tu lista de "Panoramas Realizados"
                  </Tooltip>
                }
              >
                <div className="d-inline-block">
                  <div
                    className="text-dark"
                    onClick={datos.realizado}
                    hidden={datos.hiddenRealizado}
                  >
                    <FontAwesomeIcon
                      icon={faHiking}
                      size="2x"
                      color="#689f38"
                    />{" "}
                    Marcar como realizado
                  </div>
                </div>
              </OverlayTrigger>
            </div>
            <hr />
            <Row className="show-grid">
              <Col xs={12} md={6}>
                <Carousel>
                  <Carousel.Item >
                    <img className="d-block w-100" src={datos.urlImagen} />

                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src={datos.urlImagen1} />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src={datos.urlImagen2} />
                  </Carousel.Item>
                </Carousel>

                <h6 className="text-info">
                  {" "}

                  <FontAwesomeIcon icon={faMoneyBill} size="1x" /> Precio{" "}
                  <mark> $ {datos.valor} p/p</mark>
                </h6>

                <div>
                  <h4>Indicadores</h4>

                  <BeautyStars
                    maxStars={5}
                    value={datos.calificacion}
                    inactiveColor="#e0e0e0"
                    size="26px"
                    editable={false}
                  //  onChange={value => this.setState({ value })}
                  />
                  <h6>
                    {" "}
                    <small>Calificación promedio:</small>{" "}
                    {utils.calificacion(datos.calificacion)}
                  </h6>

                  <ProgressBar
                    variant="success"
                    now={datos.exigenciaFisica}
                    max={5}
                  />
                  <h6>
                    <small>Exigencia física requerida:</small>{" "}
                    {utils.eFisica(datos.exigenciaFisica)}{" "}
                  </h6>

                  <h4>Web, redes y comentarios</h4>
                  <small>
                    Al hacer click o dar touch en el icono se deplegrá una nueva
                    pestaña del navegador con la información correspondiente.
                  </small>
                  <div className="d-flex justify-content-around">
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">
                          {utils.eMensaje(datos.urlWeb)}
                        </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <a href={datos.urlWeb} target="_blank">
                          <img
                            src={iconWeb}
                            width="30"
                            height="30"
                            className="rounded bg-info"
                          />
                        </a>
                      </span>
                    </OverlayTrigger>

                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">
                          {utils.eMensaje(datos.urlFacebook)}
                        </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <a href={datos.urlFacebook} target="_blank">
                          <img
                            src={iconFb}
                            width="30"
                            height="30"
                            className="rounded bg-info"
                          />
                        </a>
                      </span>
                    </OverlayTrigger>

                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">
                          {utils.eMensaje(datos.urlInstagram)}
                        </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <a href={datos.urlInstagram} target="_blank">
                          <img
                            src={iconIn}
                            width="30"
                            height="30"
                            className="rounded bg-info"
                          />
                        </a>
                      </span>
                    </OverlayTrigger>

                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">
                          {utils.eMensaje(datos.urlTripAdvisor)}
                        </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <a href={datos.urlTripAdvisor} target="_blank">
                          <img
                            src={iconTA}
                            width="30"
                            height="30"
                            className="rounded bg-info"
                          />
                        </a>
                      </span>
                    </OverlayTrigger>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <h4> Descripción</h4>
                {datos.descripcion}
                <br />
                <h6>
                  <a
                    href={`https://maps.google.com/?q=${datos.lat},${datos.lng}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={faMapMarked}
                      size="1x"
                      color="Dodgerblue"
                    />   Cómo llegar
                  </a>
                </h6>

              </Col>
            </Row>
            <Row className="show-grid">
              <Col className=" d-flex justify-content-center mt-2 mb-2">

                <Button hidden={datos.btnComentario} variant="outline-success" block={true} onClick={datos.showComnent} > Ver los comentarios  <FontAwesomeIcon
                  icon={faComment}
                /></Button>
              </Col>
            </Row>
            <Row className="show-grid">

              <div className="card-img pl-2">
                <h4>  Mapa</h4>

                <MapWithAMarker
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </div>
            </Row>
          </Container>
        </Modal.Body>
        <hr />
        <Modal.Footer>
          <Container>


            <Row >


              <Col className=" d-flex justify-content-center">
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-disabled">
                      Compartir en redes sociales
                  </Tooltip>
                  }
                >
                  <span className="d-inline-block">
                    <div
                      onClick={datos.setSharedClicked}
                      hidden={datos.hidenCompartir}
                    >
                      <FontAwesomeIcon
                        icon={faShare}
                        size="2x"
                        color="#689f38"
                      />
                      <p className="text-info text-center small">Compartir</p>
                    </div>
                  </span>
                </OverlayTrigger>
              </Col>
              <Col className=" d-flex justify-content-center">
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-disabled"> Cierra esta ventana"</Tooltip>
                  }
                >
                  <span className="d-inline-block">
                    <div onClick={handleClose}>
                      <FontAwesomeIcon
                        icon={faTimes}
                        size="2x"
                        color="#689f38"
                      />
                      <p className="text-info text-center small">Cerrar</p>
                    </div>
                  </span>
                </OverlayTrigger>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default class Panorama extends React.Component<IPanoramaProps> {
  public render() {
    const {
      idPanorama,
      descripcion,
      nombre,
      urlImagen,
      urlImagen1,
      urlImagen2,
      setSharedClicked,
      urlFacebook,
      urlWeb,
      urlInstagram,
      urlTripAdvisor,
      calificacion,
      exigenciaFisica,
      valor,
      porRealizar,
      realizado,
      titulo,
      showComnent,
      hiddenRealizado,
      hiddenXRealizar,
      hidenCompartir,
      nombuton,
      btnComentario,
      lat,
      lng,
      direccion,
    } = this.props;
    // tslint:disable-next-line: no-console
    // console.log(`Lat: ${lat}  Long: ${lng} `);

    const descripcionCorta = descripcion.substring(0, 150);
    // tslint:disable-next-line: no-console
    //   console.log(utils.eFisica(exigenciaFisica) + "=>" + exigenciaFisica)
    //   console.log("Url:" + urlWeb)
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={urlImagen} />
          <Card.Body>
            <Card.Title>{nombre}</Card.Title>
            <Card.Text>{`${descripcionCorta}...`}</Card.Text>
            <div className="pb-3">
              <BeautyStars
                value={calificacion}
                size="26px"
                inactiveColor="#e0e0e0"
              //  onChange={value => this.setState({ value })}
              />
            </div>

            {/* { <Button variant="primary">  <FontAwesomeIcon icon={faInfoCircle} size="1x"/> Más información</Button>} */}
            <ModalPanorama
              idPanorama={idPanorama}
              setSharedClicked={setSharedClicked}
              nombre={nombre}
              nombuton={nombuton}
              descripcion={descripcion}
              urlImagen={urlImagen}
              urlImagen1={urlImagen1}
              urlImagen2={urlImagen2}
              urlFacebook={urlFacebook}
              urlInstagram={urlInstagram}
              urlTripAdvisor={urlTripAdvisor}
              urlWeb={urlWeb}
              titulo={titulo}
              calificacion={calificacion}
              exigenciaFisica={exigenciaFisica}
              valor={valor}
              porRealizar={porRealizar}
              realizado={realizado}
              showComnent={showComnent}
              hiddenRealizado={hiddenRealizado}
              hiddenXRealizar={hiddenXRealizar}
              hidenCompartir={hidenCompartir}
              lat={lat}
              lng={lng}
              direccion={direccion}
              btnComentario={btnComentario}
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
