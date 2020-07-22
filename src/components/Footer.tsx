import React, { Component } from 'react'
import logoGlamping from '../images/logoglampingHorizontal.png';
import logoSaltos from '../images/LogoSaltosHorizontal.png';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faPhone, faBusinessTime, faAddressCard } from '@fortawesome/free-solid-svg-icons'


export default class Footer extends Component {

    public render() {
        return (
            <Col className="d-flex footer-copyright flex-wrap container-fluid bg-secondary  justify-content-center ">
                <Row className="d-flex container  justify-content-center">
                    <p style={{
                        color: '#e0e0e0'
                    }} className="pt-5" >Panoramas Outdoors, es una App gratuita desarrollada por Parque Parque Saltos Pocolpén para que todos los visitantes  y habitatantes de la Araucanía puedan conocer los panoramas de Naturaleza y Aventura de la zona.</p>
                </Row>
                <Row className="d-flex container  justify-content-center">

                    <b style={{
                        color: '#e0e0e0'
                    }} >Auspiciadores</b>

                </Row>

                <Row className="d-flex flex-wrap container-fluid  justify-content-center pb-5">

                    <a href="https://www.glampingpod.cl/" target="_blank">
                        <img src={logoGlamping} alt="Glamping Podd Via" width="200px" className="rounded" />

                    </a>
                    <a href="https://www.pocolpen.cl/" target="_blank">
                        <img src={logoSaltos} alt="Saltos Pocolpén" width="200px" className="rounded" />


                    </a>



                </Row>
                <Row className="d-flex container  justify-content-center pb-5">

                    <small style={{
                        color: '#e0e0e0'
                    }} ><FontAwesomeIcon icon={faBusinessTime} /> Sawp TI | <FontAwesomeIcon icon={faAddressBook} />  Estero Carmelito Nº20. Pucon, Chile | <FontAwesomeIcon icon={faAddressCard} />  hmartinez@sawp.cl | <FontAwesomeIcon icon={faPhone} /> +569 859 63 450</small>

                </Row>



            </Col>


        )
    }
}
