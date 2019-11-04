import * as React from 'react'
import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap/';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import Button from './Button';
import Input from './Input';
// import Select from './Select';
import Center from './Center';


class RegisterForm extends React.Component<InjectedFormProps<{ email: string }>>{
    public render() {
        const { handleSubmit } = this.props
        const data = [{
            "id": 1,
            "nombre": "Victoria"
        },
        {
            "id": 2,
            "nombre": "Isabella"
        },
        {
            "id": 3,
            "nombre": "Elizabeth"
        },
        {
            "id": 4,
            "nombre": "Hugo"
        }
        ]
        return (
            <form onSubmit={handleSubmit}>
                {/* <Input placeholder='Correo' label='Correo' />
              <Input placeholder='Contraseña' label='Contraseña' />             */}
                <Field label='Nombre (*)' placeholder='Nombre completo' name='nombre' type='string' required={true} component={Input} />
                <Field label='Teléfono(*)' placeholder='Teléfono' name='fono' type='number' required={true} component={Input} />
                <Field label='Ciudad(*)' placeholder='Ciudad o Localidad' name='ciudad' type='string' required={true} component={Input} />
                <Field label='Dirección' placeholder='Dirección (opcional)' name='direccion' type='string'  component={Input} />
                <Field label='Comuna(*)' data={data} placeholder='Comuna' name='comuna' type='select'required={true}  component={Input} />
                <Field label='Correo(*)' placeholder='Correo' name='email' type='email' component={Input} required={true} />
                <Field label='Contraseña(*)' placeholder='Contraseña' name='password' type='password' component={Input} required={true}/>
                <Field label='Repetir Contraseña(*)' placeholder='Repetir contraseña' name='rePassword' type='password' required={true} component={Input} />
                <Button block={true}>Enviar</Button>
                <Center>
                    <p className="align-content-center"> Si ya estás registrado:</p>
                    <Link to='/'>Iniciar sesión </Link>
                </Center>
            </form>
        )
    }
}
export default reduxForm({
    form: 'registro',
})(RegisterForm)
