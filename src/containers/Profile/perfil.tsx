import * as React from 'react';
import Panorama from 'src/components/Panorama';


export default class Inicio extends React.Component {


   public render() {
      return (
         // {   <div>
         //       <BarraSuperiorUsuario todosClicked={this.todosClicked} realizadosClicked={this.realizadoClicked} porRealziarClicked={this.porRealizadoClicked} />
         //       <div className="container justify-content-center">
         //          <div className="row">
         //             <div className="col-md-12">

         //                <div className="col-lg-6 col-md-4 col-sm-6 col-xs-12">
         //                   <Panorama urlMapUbicacion="" urlImagen="http://lorempixel.com/200/200/nature" nombre="Parque Saltos Pocolpén" descripcion="Parque natural privado con senderos de trekking que te llevan a cascadas, caminos rurales, acantilados, reservas de bosque y miradores" />
         //                </div>
         //                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
         //                   <Panorama urlMapUbicacion="" urlImagen="http://lorempixel.com/200/200/nature" nombre="Parque Saltos Pocolpén" descripcion="Parque natural privado con senderos de trekking que te llevan a cascadas, caminos rurales, acantilados, reservas de bosque y miradores" />
         //                </div>
         //                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
         //                   <Panorama urlMapUbicacion="" urlImagen="http://lorempixel.com/200/200/nature" nombre="Parque Saltos Pocolpén" descripcion="Parque natural privado con senderos de trekking que te llevan a cascadas, caminos rurales, acantilados, reservas de bosque y miradores" />
         //                </div>

         //             </div>
         //          </div>
         //       </div>
         //    </div>}

         <div>



            <div className="d-flex flex-column justify-content-center container ">
               <h3>Araucanía Lacustre/Curarrehue</h3>
               <h4>En esta zona tienes los siguientes panoramas por realizar:</h4>

            </div>
            <div className="d-flex flex-wrap container justify-content-center">
               <Panorama
                  setSharedClicked={this.setSharedClicked}
                  urlMapUbicacion=""
                  urlImagen="http://lorempixel.com/200/200/nature"
                  nombre="Parque Saltos Pocolpén"
                  descripcion="Parque natural privado con senderos de trekking que te llevan a cascadas, caminos rurales, acantilados, reservas de bosque y miradores"
                  urlImagen1=""
                  urlImagen2=""
                  calificacion={7}
               />
               <Panorama
                  setSharedClicked={this.setSharedClicked} urlMapUbicacion=""
                  urlImagen1=""
                  urlImagen2=""
                  calificacion={7}
                  urlImagen="http://lorempixel.com/200/200/nature"
                  nombre="Parque Saltos Pocolpén"
                  descripcion="Parque natural privado con senderos de trekking que te llevan a cascadas, caminos rurales, acantilados, reservas de bosque y miradores" />
              
               <Panorama
                  urlImagen1=""
                  calificacion={7}
                  urlImagen2=""
                  setSharedClicked={this.setSharedClicked} urlMapUbicacion="" urlImagen="http://lorempixel.com/200/200/nature" nombre="Parque Saltos Pocolpén" descripcion="Parque natural privado con senderos de trekking que te llevan a cascadas, caminos rurales, acantilados, reservas de bosque y miradores" />
               <Panorama
                  urlImagen1=""
                  calificacion={7}
                  urlImagen2=""
                  setSharedClicked={this.setSharedClicked} urlMapUbicacion="" urlImagen="http://lorempixel.com/200/200/nature" nombre="Parque Saltos Pocolpén" descripcion="Parque natural privado con senderos de trekking que te llevan a cascadas, caminos rurales, acantilados, reservas de bosque y miradores" />
               <Panorama
                  urlImagen1=""
                  calificacion={7}
                  urlImagen2=""
                  setSharedClicked={this.setSharedClicked} urlMapUbicacion="" urlImagen="http://lorempixel.com/200/200/nature" nombre="Parque Saltos Pocolpén" descripcion="Parque natural privado con senderos de trekking que te llevan a cascadas, caminos rurales, acantilados, reservas de bosque y miradores" />

            </div>
         </div>



      )
   }

   private setSharedClicked = () => {
      alert(" Compartir")

   }
}