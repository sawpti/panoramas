import * as React from 'react'
import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap/';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import Button from './Button';
import Input from './Input';
// import Textarea from './TextArea';
// import Select from './Select';
import Center from './Center';


class RegisterFormPanorama extends React.Component<InjectedFormProps<{ email: string }>>{
    public render() {
        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit}>
                {/* <Input placeholder='Correo' label='Correo' />
              <Input placeholder='Contraseña' label='Contraseña' />             */}
                <Field label='Nombre (*)' placeholder='Escribe un nombre para el panorama' name='nombre' type='text' required={true} maxLength="50" component={Input} />
                {/* <Field label='Descripción(*)' placeholder='Escribe una descripción resumida, máximo 300 caracteres'  name='descripcion'  maxLength="300"  required={true} component={textarea} /> */}
                <Field label="Descripción" name="descripcion" component="textarea" className="form-control" placeholder='Escribe un una descripción'
                    rows="10"
                    maxLength="250" required={true}
                />
                {/* {  <Field label='Descripción (*)' placeholder='Escribe un una descripcioón' name='descripcion'  maxLength="5"  type='text' required={true} component={Input} />} */}
                {/* {   <Field label='Url ubicación(*)' placeholder=' url' name='urlMapUbicacion' type='url' maxLength="50" required={true} component={Input} />} */}
                <Field label='Url web' placeholder=' url' name='urlWeb' type='url' maxLength="150" component={Input} />
                <Field label='Url Instagram' placeholder=' url' name='urlInstagram' type='url' maxLength="150" component={Input} />
                <Field label='Url Facebook' placeholder=' url' name='urlFacebook' type='url' maxLength="150" component={Input} />
                <Field label='Url TripAdvisor' placeholder=' url' name='urlTripAdvisor' type='url' maxLength="150" component={Input} />
                <Field label='Precio(*)' name='valor' type='number' min="1" max="500000" required={true} component={Input} />
                <Field label='Calificación ( 1 al 5)' name='calificacion' type='number' min="1" max="5" component={Input} />
                <Field label='Exigencia física(1 al 5)' name='exigenciaFisica' type='number' min="1" max="5" component={Input} />
                <Field label='Destacado' name='destacado' type='checkbox' value="false" component={Input} />
                <Button block={true}>Enviar</Button>
                <Center>

                    <Link to='/app/admin'>Ver panoramas registrados </Link>
                </Center>
            </form>
        )
    }
}
export default reduxForm({
    form: 'registro',
})(RegisterFormPanorama)
