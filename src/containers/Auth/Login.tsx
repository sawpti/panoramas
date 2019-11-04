import * as React from 'react';
import { connect } from 'react-redux'
import { Card, Button } from 'react-bootstrap/';
// import Center from '../../components/Center';
import Container from '../../components/Container';
// import Title from '../../components/Title';
import LoginForm from '../../components/LoginForm'
import { ThunkDispatch } from 'redux-thunk';
import { login as loginThunk, ILogin } from '../../ducks/Users'
import { IState } from '../../ducks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHiking} from '@fortawesome/free-solid-svg-icons'

interface ILoginProps {

  login: (a: ILogin) => void,
  setRegistroClicked?: () => void
 

}

class Login extends React.Component<ILoginProps> {
  public render() {
    const { login, setRegistroClicked } = this.props
    return (
      <Container center={true}>
        <Card style={{ background:'rgba(214, 213, 213, 0.5)' }}>
           <Card.Body  className="pt-0">
            <Card.Title>Inicio de sesión</Card.Title>
            <Card.Text>
              Ingresa tus datos de usuario para iniciar sesión
           </Card.Text>
            <LoginForm onSubmit={login} />
          
            <Button 
            variant="outline-success" 
            onClick={setRegistroClicked}
            block={true}
            ><FontAwesomeIcon icon={faHiking} />  Registrarse</Button>
   
          </Card.Body>
        </Card>
      </Container>
    )
  }
}
const mapStateToProps = (state: IState) => state

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  login: (payload: any) => dispatch(loginThunk(payload))

})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
