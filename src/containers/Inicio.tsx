import * as React from 'react';
import { Carousel, Card, Button } from 'react-bootstrap/';
// import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { GoogleLogin } from 'react-google-login';
import { faHiking, faUserFriends, faMountain } from '@fortawesome/free-solid-svg-icons'
import SweetAlert from 'react-bootstrap-sweetalert';



// import slide1 from '../images/01.jpg'
// import slide2 from '../images/02.jpg'
// import slide3 from '../images/06.jpg'
import s1 from '../images/portada/01.jpeg'
import s2 from '../images/portada/02.jpeg'
import s3 from '../images/portada/03.jpeg'
import s4 from '../images/portada/04.jpeg'
import s5 from '../images/portada/05.jpeg'
import s6 from '../images/portada/06.jpeg'
import s7 from '../images/portada/07.jpeg'
import s8 from '../images/portada/08.jpeg'


import BarraSuperior from '../components/BarraSuperiorInicio';
import Login from './Auth/Login';
import { numeroAleatorioNoRepetido } from '../utils';
import services from 'src/service';
// import services from 'src/service';
// import Button from '../components/Button';
// const responseGoogle = (response: any) => {
//   // tslint:disable-next-line:no-console
//  //  console.log(response);
// }
const arrayImagensPortada = [s1, s2, s3, s4, s5, s6, s7, s8]
const arrayAlerario = numeroAleatorioNoRepetido(arrayImagensPortada.length, 3)

// const styles = {
//   body: {
//     alignItems: 'center',
//     alignSelf: 'center',
//     display: 'flex',
//     flexDirection: 'row',
//     height: '200px',
//     justifyContent: 'center',
//     marginTop: '100px',
//   } as React.CSSProperties,
//   registro: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     // marginLeft: '10px',
//     // marginRight: '10px',
//     marginTop: '5px',
//   } as React.CSSProperties
// };

interface IState {
  alert: React.ReactNode
  loading: boolean,
  ui: string

}


export default class Inicio extends React.Component<any, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      alert: null,
      loading: false,
      ui: "Registro",
    };
  };
  public hideAlert = () => {
    this.setState({
      alert: null
    });

  }

  public sendEmailRecuperacion = (eve: React.FormEvent<HTMLFormElement>) => {
    const { auth } = services
    // tslint:disable-next-line: no-console
    // console.log("eve", eve.toString());

    auth.sendPasswordResetEmail(eve.toString()).then(() => {
      // Email sent.
      this.setState({
        alert: (
          <SweetAlert success={true}
            title="¡Listo!"
            onConfirm={this.hideAlert}>
            Te hemos enviado un e-mail  a {eve.toString()} con una url para que restablezcas tu contraseña.
            <br /> Si no lo encuentras en tu bandeja principal por favor revisa en spam.
          </SweetAlert>
        )
      });

    }).catch((error) => {
      // tslint:disable-next-line: no-console
      console.log("Error", error);

      this.setState({
        alert: (
          <SweetAlert
            error={true}
            title="Error"
            onConfirm={this.hideAlert}>
            Se ha producido el siguiente error.
            <br />
            Código: {error.code}
            <br />
            Mensaje:  {error.message}
          </SweetAlert>
        )
      });
    });



  }

  public recuperarPwdClicked = () => {

    this.setState({
      alert: (
        <SweetAlert
          input={true}
          showCancel={true}
          required={true}
          cancelBtnBsStyle="default"
          title="Restaurar contraseña"
          placeholder="Ingresa tu e-mail"
          onConfirm={this.sendEmailRecuperacion}
          onCancel={this.hideAlert}
        >
          Escribe tu correo electrónico resgistrado
        </SweetAlert>
      )
    })
  }

  public render() {
    const { ui } = this.state
    // tslint:disable-next-line: no-console
    console.log("Array", arrayAlerario);
    if (ui === "Registro") {
      // d-none d-sm-none  d-md-block : no mostrar en celuar
      return (
        <div >
          <div className="d-flex container-fluid justify-content-center bg-light">
            <BarraSuperior setInicioClicked={this.setInicioClicked} setRegistroClicked={this.setRegistroClicked} />

          </div>

          <div className="container-fluid  d-none d-sm-none  d-md-block">

            <Carousel style={{ height: '451px' }}>
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded"
                  src={arrayImagensPortada[arrayAlerario[0]]}
                  alt=""

                />
                {/* {  <Carousel.Caption>
                {  <div className="d-none d-sm-none  d-md-block ">
                    <h4 className="text-warning">Aventura y naturaleza</h4>
                    <p className="text-white bg-dark">Conoce nuevos panoramas outdoors</p>
                  </div>}

                </Carousel.Caption>} */}
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded"
                  src={arrayImagensPortada[arrayAlerario[1]]}
                  alt=""
                />

                {/* { <Carousel.Caption>
                  <div className="d-none d-sm-none  d-md-block pt-5 ">
                    <h4 className="text-warning">Bosques y paisajes prístinos</h4>
                    <p className="text-white bg-dark" >Decubre lugares desconocidos para la mayoría.</p>
                  </div>


                </Carousel.Caption>} */}
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded"
                  src={arrayImagensPortada[arrayAlerario[2]]}
                  alt=""
                />

                {/* {  <Carousel.Caption>
                  <div className="d-none d-sm-none  d-md-block ">
                    <h4 className="text-warning">Emociónate y déjate llevar</h4>
                    <p className="text-white bg-dark"> Camina por senderos alucinantes.</p>
                  </div>

                </Carousel.Caption>} */}
              </Carousel.Item>
            </Carousel>

          </div>

          <div className="d-flex flex-wrap container justify-content-around bg-light rounded" >


            <Card style={{ width: '22rem' }}>

              <Card.Body className="bg-light">
                <Card.Title> <FontAwesomeIcon icon={faHiking} size="4x" color="#689f38" /> Naturaleza y Aventura para toda la familia</Card.Title>
                <Card.Img variant="top" src={s1} />
                <Card.Text style={{
                  color: '#34515e'
                }} >
                  <hr className="my-3" />
                  <h6 >  Regístrate y conoce los panoramas de <b>NATURALEZA Y AVENTURA</b>  más importantes de Curarrehue y Pucón <b>¡Anímate, es GRATIS!</b> </h6>
                  <></>
                  <h6> Te entregamos información precisa de cada actividad: Atractivos turísticos, senderos, excursiones, miradores y sitios de interés.</h6>
                  <h6>Solo publicamos información validada en terreno por nuestros personal especializado.</h6>
                  <br />
                  <br />
                  <Button
                    variant="outline-success"
                    onClick={this.onClickRegistro}
                    block={true}
                  ><FontAwesomeIcon icon={faHiking} />  Registrarse</Button>

                </Card.Text>

              </Card.Body>
            </Card>


            <Card style={{ width: '22rem' }}>

              <Card.Body className="bg-light">
                <Card.Title> <FontAwesomeIcon icon={faMountain} size="4x" color="#689f38" /> Montañas, lagos, ríos, cascadas y bosque nativo</Card.Title>
                <Card.Img variant="top" src={s2} />
                <Card.Text style={{
                  color: '#34515e'
                }} >
                  <hr className="my-3" />
                  <h6> Conoce los mejores panoramas outdoors, solo o junto a tu familia. Existen opciones para todos los intereses. Arma tu excursión <b>autoguiada</b> con información actualizada  o programa una excursión <b>guiada</b> con<b> profesionales</b> del rubro.</h6>
                  <></>
                  <h6> Bosques, lagos, montañas, glaciares,  lagunas, ríos, cascadas, miradores, senderos y grandes extensiones bosques esperan ser explorados y fotografiados.</h6>
                  <h6>Una cosa piden estos paisajes: Cuidarlos y respetar las normas de cada lugar que visites. La naturaleza no debe notar que estuviste ahí.</h6>
                  <br />

                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '22rem' }}>

              <Card.Body className="bg-light">

                <Card.Title>   <FontAwesomeIcon icon={faUserFriends} size="4x" color="#689f38" /> Bienvenido a la aventura en la naturaleza</Card.Title>
                <Card.Img variant="top" src={s5} />
                <Card.Text style={{
                  color: '#607d8b'
                }} >
                  <hr className="my-3" />
                  <h6 > Vive una gran experiencia</h6>
                  <></>
                  <Login setRegistroClicked={this.onClickRegistro} recuperarPdwClicked={this.recuperarPwdClicked} />

                </Card.Text>

              </Card.Body>
            </Card>
            {this.state.alert}


          </div>
        </div>

      )

    } else {
      return (
        <div className="container-fluid">
          <BarraSuperior setInicioClicked={this.setInicioClicked} setRegistroClicked={this.setRegistroClicked} />

          <div className="d-lg-flex justify-content-center">

            <Card style={{ width: '22rem' }}>

              <Card.Body className="bg-light">
                <Card.Title>   <FontAwesomeIcon icon={faUserFriends} size="4x" color="green" /> Bienvenido a la aventura en la naturaleza</Card.Title>
                <Card.Text>
                  <hr className="my-3" />
                  <h6 style={{
                    color: '#34515e'
                  }} > Vive una gran experiencia</h6>
                  <Login setRegistroClicked={this.onClickRegistro} recuperarPdwClicked={this.recuperarPwdClicked} />

                </Card.Text>

              </Card.Body>
            </Card>

          </div>

          {this.state.alert}

        </div>
      )
    }

  }
  public onClickRegistro = () => {
    // location.href = '/register'
    location.href = "/register"

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