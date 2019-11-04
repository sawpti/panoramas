import * as React from 'react';
import { Container } from 'react-bootstrap/';

import BarraSuperiorUsuario from '../../components/BarraSuperiorUsuario';


export default class Inicio extends React.Component {
 

  public render() {
     return (
      <div >
        <BarraSuperiorUsuario todosClicked={this.todosClicked} realizadosClicked={this.realizadoClicked} porRealziarClicked={this.porRealizadoClicked}  />
        <Container>
           Panoramas por realizar
        </Container>
      
       </div>

    )
  }
  private todosClicked = ()=> {
     alert(" Todos los Panoramas")

  }
  private realizadoClicked = () => {
   alert (" Panoramas por realizar")

  }
  private porRealizadoClicked = () => {
    alert (" Panoramas por realizar")
 
   }
}