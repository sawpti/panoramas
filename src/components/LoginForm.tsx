import * as React from 'react';
import Button from './Button';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

import Input from './Input';



class LoginForm extends React.Component<InjectedFormProps<{email:string}>>{
  public render() {
    const { handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field  label='Correo' placeholder='Correo' name='email' type='email' component={Input}  />
        <Field label='Contraseña' placeholder='Contraseña' name='password' type='password' component={Input}  />
        <Button block = {true}  >Entrar</Button>
      </form>
    );
  }
}


export default reduxForm({
  form: 'login'
})(LoginForm)

