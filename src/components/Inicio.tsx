import * as React from 'react';
import { Carousel, Button, Jumbotron } from 'react-bootstrap/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GoogleLogin } from 'react-google-login';
import { faHiking, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import slide1 from '../images/01.jpg';
import slide2 from '../images/02.jpg';
import slide3 from '../images/06.jpg';
import BarraSuperior from './BarraSuperiorInicio';
const responseGoogle = (response: any) => {
  // tslint:disable-next-line:no-console
  console.log(response);
}

const styles = {
  body: {
    alignItems: 'center',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: '200px',
    justifyContent: 'center',
    marginTop: '100px',
  } as React.CSSProperties,
  registro: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // marginLeft: '10px',
    // marginRight: '10px',
    marginTop: '5px',
  } as React.CSSProperties
};

interface ILoginRegistro {
  ui: string
}
interface IState {
  loading: boolean,
  ui: string
}
function LoginRegistro({ ui }: ILoginRegistro): any {
  if (ui === "Registro") {
    return (

      <div className="container">
        <div className="d-none d-sm-none d-md-block">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slide1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slide2}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slide3}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>


        </div>

        <div style={styles.registro}>

          <Jumbotron>
            <h2  style={{
             color:'#5a9216'
           }} > <FontAwesomeIcon icon={faHiking} size="3x" style={{
              color:'blue'
            }} />  Regístrate en nuestra App y conoce los panoramas más importantes de Curarrehue.¡Anímate, es gratis!</h2>
           <></>
           <h4 style={{
             color:'#bc5100'
           }}> Te entregamos información precisa de cada actividad: Atractivos turísticos, senderos, excursiones, miradores y sitios de interés.</h4>
           <h3 style={{
             color:'blue'
           }}>Solo publicamos información validada por nuestros propio personal especializado. </h3> 
  
        </Jumbotron>

        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>

          <GoogleLogin
            className="d-flex justify-content-center align-items-s"
            clientId="604781351481-oo0i4iedb4avi6ghmddk4jnjoolokoad.apps.googleusercontent.com"
            buttonText="Registrarse con Google"
            theme="dark"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}

          />
        </div>


        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom:'10px',
          marginTop: '5px'
        }}>
          <Button variant="success" className="d-block justify-content-between align-items-start" size='sm'>
            <FontAwesomeIcon icon={faEnvelope} size="2x" />  Registrarse con correo</Button>

        </div>
 <p>O inicia sesión si ya estás registrado</p>
        <div >
          <Button variant="info"  size="sm" block={true}>
            <FontAwesomeIcon icon={faUser} size="2x" /> Ingresar</Button>

        </div>







      </div>)
  } else {
    return 'Inicio se sesión'
  }
}

export default class Inicio extends React.Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = { loading: false, ui: "Registro" };
  };



  public render() {
    const { ui } = this.state
    return (
      <div >
        <BarraSuperior setInicioClicked={this.setInicioClicked} setRegistroClicked={this.setRegistroClicked} />
        <LoginRegistro ui={ui} />
      </div>

    )
  }
  private setRegistroClicked = () => {
    this.setState({
      ui: "Registro"
    })

  }
  private setInicioClicked = () => {
    this.setState({
      ui: "Sesión"
    })

  }
}