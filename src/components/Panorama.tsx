import * as React from 'react';
import { useState } from 'react';
import { Card, Button, Modal, Container, Row, Col, ProgressBar, Carousel } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faShare, faMapMarked,  faWindowClose, faHeart } from '@fortawesome/free-solid-svg-icons'

export interface IPanoramaProps {
  calificacion?: number
  descripcion: string
  destacado?: boolean
  nomProveedor?: string
  nombre: string
  urlImagen: string
  urlImagen1: string
  urlImagen2: string
  urlWeb?: string
  urlMapUbicacion: string
  urlInstagram?: string
  urlFacebbok?: string
  setSharedClicked: () => void
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
          <Modal.Title>{datos.nombre}</Modal.Title>
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

                {datos.descripcion}
                <div>
                  <code>

                    <ProgressBar variant="warning" now={6.9} max={7} />
                    <h6>Calificación promedio</h6>

                    <ProgressBar variant="success" now={3} max={7} />
                    <h6>Exigencia física</h6>

                    <ProgressBar variant="info" now={0.5} max={7} />
                    <h6>Nivel técnico requerido</h6>
                  </code>
                </div>

              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>

          <div onClick={datos.setSharedClicked}>
            <FontAwesomeIcon icon={faShare} size="2x" />
          </div>
          <div onClick={datos.setSharedClicked}>
            <FontAwesomeIcon icon={faHeart} size="2x" />
          </div>
          <a href={datos.urlMapUbicacion} target="_blank">
            <FontAwesomeIcon icon={faMapMarked} size="2x" />
          </a>
          <div onClick={handleClose}>
            <FontAwesomeIcon icon={faWindowClose} size="2x" />
          </div>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default class Panorama extends React.Component<IPanoramaProps> {
  public render() {
    const { descripcion, nombre, urlImagen, urlImagen1, urlImagen2, setSharedClicked, urlMapUbicacion } = this.props
    // tslint:disable-next-line: no-console
    console.log("UrlImagen1:" + urlImagen1)
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
              urlMapUbicacion={urlMapUbicacion} />
          </Card.Body>
        </Card>

      </div>
    );
  }
}
