import * as React from 'react'
import { Card } from 'react-bootstrap/';
import Container from '../../components/Container';
import RegisterFrom from '../../components/RegisterForm'
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ILogin, register as registerThunk } from '../../ducks/Users'
import { IState } from 'src/ducks';

interface IRegisterProps {
    register: (a: ILogin) => void
}

class Register extends React.Component<IRegisterProps>{
    public render() {
        const { register } = this.props
        return (
            <Container center={true} >
                <Card style={{ background: 'rgba(214, 213, 213, 0.5)' }}>
                    <Card.Body className="pt-0">
                        <Card.Title>Registrarse</Card.Title>
                        <Card.Text>
                            Ingresa los datos solicitados para registrarte. Los marcados con (*) son obligatorios.
                        </Card.Text>
                        <RegisterFrom onSubmit={register} />
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

{/* Borrado de la clase, se reemplaza por formulario
    </Center>
    <Input placeholder='Correo' label='Correo' />
    <Input placeholder='Contraseña' label='Contraseña' />
    <Button block = {true} >Enviar</Button>            
    Center>
        <Link to = '/'>Iniciar sesión</Link>                        
    </Center>  */}

const mapStateToProps = (state: IState) => state

const mapDispachToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    register: (payload: any) => dispatch(registerThunk(payload))
})

export default connect(mapStateToProps, mapDispachToProps)(Register)