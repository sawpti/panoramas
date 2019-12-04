import * as React from 'react';
import { useState } from 'react';
import { Card, Button, Modal, Container, Row, Col, ProgressBar, Carousel, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faShare, faMapMarked, faThumbsUp, faHiking, faMoneyBill, faTimes } from '@fortawesome/free-solid-svg-icons'
import iconFb from '../images/iconfacebook.png'
import iconIn from '../images/iconinstagram.png'
import iconWeb from '../images/iweb.png'
import iconTA from '../images/tripAdvisor.png'
import * as utils from '../utils';


export interface IPanoramaProps {
  calificacion: number
  descripcion: string
  destacado?: boolean
  exigenciaFisica: number
  nomProveedor?: string
  nombre: string
  urlImagen: string
  urlImagen1: string
  urlImagen2: string
  urlWeb?: string
  urlMapUbicacion: string
  urlInstagram?: string
  urlFacebook?: string
  urlTripAdvisor?: string
  titulo?:string
  valor: number
  setSharedClicked: () => void
  porRealizar?: () => void
  realizado?: () => void

}
function ModalPanorama(datos: IPanoramaProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        <FontAwesomeIcon icon={faInfoCircle} size="1x" /> Más información
        </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton={true}>
  <Modal.Title>  {datos.nombre}: <mark> {datos.titulo}</mark></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="show-grid">
              <Col xs={12} md={6}>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={datos.urlImagen}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={datos.urlImagen1}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={datos.urlImagen2}
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>
              <Col xs={12} md={6}>
                <h4> Descripción</h4>
                {datos.descripcion}
                <h6> <a href={datos.urlMapUbicacion} target="_blank">
                  <FontAwesomeIcon icon={faMapMarked} size="1x" color="Dodgerblue" /> Cómo llegar
                </a></h6>

                <h6 className="text-info">  <FontAwesomeIcon icon={faMoneyBill} size="1x" /> Precio <mark> $ {datos.valor} p/p</mark>
                </h6>

                <div>
                  <h4>Indicadores</h4>
                  <code>
                    <ProgressBar variant="warning" now={datos.calificacion} max={7} />
                    <h6> <small>Calificación promedio:</small> {utils.calificacion(datos.calificacion)}
                    </h6>

                    <ProgressBar variant="success" now={datos.exigenciaFisica} max={7} />
                    <h6><small>Exigencia física requerida:</small> {utils.eFisica(datos.exigenciaFisica)} </h6>
                  </code>

                  <h4>Web y redes</h4>
                  <small>Al hacer click o dar touch en el icono se deplegrá una nueva pestaña del navegador con la información correspondiente.</small>
                  <div className="d-flex justify-content-around">
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{utils.eMensaje(datos.urlWeb)}</Tooltip>}>
                      <span className="d-inline-block">
                        <a href={datos.urlWeb} target="_blank" >
                          <img src={iconWeb} width="38" height="38" className="rounded bg-info" />
                        </a>
                      </span>
                    </OverlayTrigger>

                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{utils.eMensaje(datos.urlFacebook)}</Tooltip>}>
                      <span className="d-inline-block">
                    <a href={datos.urlFacebook} target="_blank">
                      <img src={iconFb} width="40" height="40" className="rounded bg-info" />
                    </a>
                    </span>
                    </OverlayTrigger>

                    
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{utils.eMensaje(datos.urlInstagram)}</Tooltip>}>
                      <span className="d-inline-block">
                    <a href={datos.urlInstagram} target="_blank">
                      <img src={iconIn} width="40" height="40" className="rounded bg-info" />
                    </a>
                    </span>
                    </OverlayTrigger>

                   
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{utils.eMensaje(datos.urlTripAdvisor)}</Tooltip>}>
                      <span className="d-inline-block">
                    <a href={datos.urlTripAdvisor} target="_blank">
                      <img src={iconTA} width="40" height="40" className="rounded bg-info" />
                    </a>
                    </span>
                    </OverlayTrigger>
                  </div>

                </div>

              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">

          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Compartir en redes sociales</Tooltip>}>
            <span className="d-inline-block">
              <div onClick={datos.setSharedClicked} >
                <FontAwesomeIcon icon={faShare} size="2x" color="Dodgerblue" />
                <p className="text-info text-center small">Compartir</p>
              </div>
            </span>
          </OverlayTrigger>

          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Agrega el panorama a tu lista "Por realizar"</Tooltip>}>
            <span className="d-inline-block">
              <div onClick={datos.porRealizar} >
                <FontAwesomeIcon icon={faHiking} size="2x" color="Dodgerblue" />
                <p className="text-info text-center small">Por realizar</p>
              </div>
            </span>
          </OverlayTrigger>

          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled"> Agrega el panorama a tu lista de "Realizados"</Tooltip>}>
            <span className="d-inline-block">
              <div onClick={datos.realizado} >
                <FontAwesomeIcon icon={faThumbsUp} size="2x" color="Dodgerblue" />
                <p className="text-info text-center small">Realizado</p>
              </div>
            </span>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled"> Cierra esta ventana"</Tooltip>}>
            <span className="d-inline-block">
              <div onClick={handleClose} >
                <FontAwesomeIcon icon={faTimes} size="2x" color="Dodgerblue" />
                <p className="text-info text-center small">Cerrar</p>
              </div>
            </span>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default class Panorama extends React.Component<IPanoramaProps> {
  public render() {
    const { descripcion, nombre, urlImagen, urlImagen1, urlImagen2, setSharedClicked, urlMapUbicacion,
      urlFacebook, urlWeb, urlInstagram, urlTripAdvisor, calificacion, exigenciaFisica, valor , porRealizar, realizado, titulo} = this.props
    // tslint:disable-next-line: no-console
  //   console.log(utils.eFisica(exigenciaFisica) + "=>" + exigenciaFisica)
    //   console.log("Url:" + urlWeb)
    return (
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={urlImagen} />
          <Card.Body>
            <Card.Title>{nombre}</Card.Title>
            <Card.Text>
              {descripcion}
            </Card.Text>
            {/* { <Button variant="primary">  <FontAwesomeIcon icon={faInfoCircle} size="1x"/> Más información</Button>} */}
            <ModalPanorama
              setSharedClicked={setSharedClicked}
              nombre={nombre}
              descripcion={descripcion}
              urlImagen={urlImagen}
              urlImagen1={urlImagen1}
              urlImagen2={urlImagen2}
              urlMapUbicacion={urlMapUbicacion}
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
            />
          </Card.Body>
        </Card>

      </div>
    );
  }
}
