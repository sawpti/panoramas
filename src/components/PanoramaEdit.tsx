import * as React from "react";

import { Card } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";


// import { Link } from "react-router-dom";

export interface IPanoramaProps {
  descripcion: string;
  nombre: string;
  urlImagen: string;
}


export default class Panorama extends React.Component<IPanoramaProps> {

  public render() {
    const { descripcion, nombre, urlImagen } = this.props;
    const des = descripcion ? descripcion : "no hay"
    // const urlUbi = urlMapUbicacion ? urlMapUbicacion : "http://no tiene"
    // const urlW = urlWeb ? urlWeb : "http://no tiene"

    // const urlParam = `/app/admin/detalle/${idPanorama}/${nombre}/${descripcion}/${urlUbi.substr(7, urlUbi.length)}/${urlW.substr(7, urlW.length)}`

    const descripcionCorta = des.substring(0, 150);

    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={urlImagen} />
          <Card.Body>
            <Card.Title>{nombre}</Card.Title>
            <Card.Text>{`${descripcionCorta}...`}</Card.Text>
            <div className="d-flex justify-content-between">
              {/* {<Link to={urlParam}>
                <Button variant="outline-primary" >
                  <FontAwesomeIcon icon={faInfoCircle} size="1x" /> Editar
                   </Button>
              </Link>} */}
            </div>
          </Card.Body>
        </Card>
      </div>
    );

  }

}
