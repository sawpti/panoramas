import React, { Component } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface IProps {
  usersByPanoramas: any;
  opcion: number;

}

export default class ModalEstadisticas extends Component<IProps> {
  public render() {
    const { usersByPanoramas, opcion } = this.props;
    let users = {};
    Object.keys(usersByPanoramas).map((x) => {
      users = usersByPanoramas[x];
    });
    // tslint:disable-next-line:no-console
    console.log("Opcion:" + opcion); // esto

    // tslint:disable-next-line:no-console
    // console.log("Lista de usuarios por panorama usersByPanoramas[0]", Object.keys(usersByPanoramas["usersByPanoramas"])) // esto

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (opcion === 1) {
      return (
        <>
          <Button block={true} variant="outline-info" onClick={handleShow}>
            <FontAwesomeIcon icon={faChartLine} /> Información detallada
          </Button>
          <Modal
            show={show}
            size="lg"
            onHide={handleClose}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton={true}>
              <Modal.Title id="example-custom-modal-styling-title">
                Últimos {Object.keys(users).length} visitantes
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table
                responsive={true}
                striped={true}
                bordered={true}
                hover={true}
              >
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Procedencia</th>
                    <th>Fecha visita</th>
                    <th>Calificación otorgada</th>
                    <th>Enviar mensaje</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(users).map((x) => {
                    const user = users[x];
                    // const fecha =0
                    // user.fechaVisita.map((u)=>{
                    //   u.seconds

                    // })
                    //  tslint:disable-next-line: no-console
                    console.log("user.fecha", user.fechaVisita.toDate());

                    //  tslint:disable-next-line: no-console
                    console.log(
                      "user.fecha",
                      new Date(user.fechaVisita.toDate()).toLocaleDateString()
                    );

                    //   new Date(user.fechaVisita.seconds).toLocaleDateString()

                    return (
                      <tr key={x}>
                        <td>{user.nombre}</td>
                        <td>{user.procedencia}</td>
                        <td>
                          {new Date(
                            user.fechaVisita.toDate()
                          ).toLocaleDateString()}
                        </td>
                        <td>{user.califiacionOtorgada}</td>
                        <td className="d-flex justify-content-center">
                          {" "}
                          <Button variant="outline-info">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <p>
                Esta tabla muestra la información de los últimos 50 visitantes
                que han realizado el panorama. Si el panorama ha sido realizado
                menos de 50 veces, muestra todos los usuarios que lo han
                realizado. Puedes enviar un e-mail con la función "Enviar
                mensaje"
              </p>
            </Modal.Body>
          </Modal>
        </>
      );
    } else {
      return (
        <>
          <Button block={true} variant="outline-info" onClick={handleShow}>
            <FontAwesomeIcon icon={faChartLine} /> Información detallada
          </Button>
          <Modal
            show={show}
            size="lg"
            onHide={handleClose}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton={true}>
              <Modal.Title id="example-custom-modal-styling-title">
                Últimos {Object.keys(users).length} visitantes
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table
                responsive={true}
                striped={true}
                bordered={true}
                hover={true}
              >
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Procedencia</th>
                    <th>Fecha visita</th>
                    <th>Calificación otorgada</th>
                    <th>Enviar mensaje</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(users).map((x) => {
                    const user = users[x];
                    // const fecha =0
                    // user.fechaVisita.map((u)=>{
                    //   u.seconds

                    // })
                    //  tslint:disable-next-line: no-console
                    console.log("user.fecha", user.fechaVisita.toDate());

                    //  tslint:disable-next-line: no-console
                    console.log(
                      "user.fecha",
                      new Date(user.fechaVisita.toDate()).toLocaleDateString()
                    );

                    //   new Date(user.fechaVisita.seconds).toLocaleDateString()

                    return (
                      <tr key={x}>
                        <td>{user.nombre}</td>
                        <td>{user.procedencia}</td>
                        <td>
                          {new Date(
                            user.fechaVisita.toDate()
                          ).toLocaleDateString()}
                        </td>
                        <td>{user.califiacionOtorgada}</td>
                        <td className="d-flex justify-content-center">
                          {" "}
                          <Button variant="outline-info">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <p>
                Esta tabla muestra la información de los últimos 50 usuarios que
                han marcado el panorama como deseado. Si el panorama ha sido
                marcado como deseado menos de 50 veces, muestra todos los
                usuarios que lo han marcado como tal. Puedes enviar un e-mail
                alos usuarios con la función "Enviar mensaje"
              </p>
            </Modal.Body>
          </Modal>
        </>
      );
    }
  }
}
