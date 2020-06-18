import { IDataPanorama } from './ducks/Panoramas';


export interface IInfoPanorama {
    idPanorama: string,
    nombrePanorama: string
    vecesRealizado: number


}
export const download = (url: string) =>
    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest(); // 1 . creamos una instancia xmhttprequest que es el objeto para hacer peticiones
        xhr.responseType = "blob"; // 2. vamos a indicar que el tipo de respuesta va a ser un blob
        xhr.onload = () => {
            // 5. una vez cargado con exito
            resolve(xhr.response); // 6. resolvemos la promesa con la respuesta que esta nos trajo
        };
        xhr.open("GET", url); // 3. abrimos la url que le pasamos a la funcion
        xhr.send(); // 4. hacemos el llamado
    });

export const calificacion = (c: number) => {
    if (c <= 2.3) {
        return "Regular";
    } else if (c > 2.3 && c < 4.2) {
        return "Bueno";
    } else if (c > 4.2 && c <= 5) {
        return "Excelente";
    } else {
        return "No determinada";
    }
};

export const eFisica = (c: number) => {
    if (c <= 2) {
        return "Mínimo esfuerzo";
    } else if (c > 2 && c < 4) {
        return "Media";
    } else if (c >= 4 && c <= 5) {
        return "Alta";
    } else {
        return "No determinada";
    }
};
export const eMensaje = (c: any) => {
    if (c === null) {
        return "El panorama no tiene esta información";
    } else if (c === undefined) {
        return "El panorama no tiene esta información";
    } else {
        return c;
    }
};
export const nivelEplorador = (c: number) => {
    if (c <= 9) {
        return "Principiante";
    } else if (c > 9 && c <= 20) {
        return "Explorador";
    } else if (c > 20 && c <= 50) {
        return "Guia Local";
    } else {
        return "Experto";
    }
};
export const emailVerificado = (c: boolean) => {
    if (c === false) {
        return "NO";
    } else {
        return "SI";
    }
};

/**
 * 
 * @param largo :Límite superior del rango de los números aleatorio a generar
 * @param largoSalida: Es largo del arreglo de números aleatorios no repetidos
 */
export const numeroAleatorioNoRepetido = (largo: number, largoSalida: number) => {
    const returnArray: number[] = [];
    let i;
    let j;
    for (i = 0; i < largoSalida; i++) {
        do {
            j = Math.floor(Math.random() * largo);
            // tslint:disable-next-line: no-console
            //     console.log(`Existe?:${returnArray.indexOf(j)}`);
        } while (!returnArray.indexOf(j))
        returnArray.push(j);
    }
    return returnArray;
}




export const panoramaMasRealizado = (arrayPanoramas: IDataPanorama) => {

    // const lisPanormasRealizados: IInfoPanorama[] = new Array()
    const lisPanormasRealizados = new Array()
    let c: number = 1;
    let idPAanterior = ""
    const arrayMasR = new Array()
    Object.keys(arrayPanoramas).map(
        (x) => {


            // Devuelve un arreglo con los panormas y el numero de veces que cada uno fue realizado

            if (idPAanterior === x.split("_")[0]) {
                c++
            } else {
                c = 1
            }
            lisPanormasRealizados[x.split("_")[0]] = {
                ...arrayPanoramas[x],
                vecesRealizado: c
            }
            idPAanterior = x.split("_")[0]
            // tslint:disable-next-line: no-console
            // console.log("idPAanterior : " + idPAanterior)
        }

    )
    Object.keys(lisPanormasRealizados).forEach(
        (x) => {
            arrayMasR.push(
                {
                    ...lisPanormasRealizados[x],
                    vecesRealizado: lisPanormasRealizados[x].vecesRealizado
                }

            )
        }
    )


    /** Se busca el panorama que se haya realizado más veces */
    let veces: number = 0
    let panorama = {}
    Object.keys(lisPanormasRealizados).forEach((x) => {
        if (Number(lisPanormasRealizados[x].vecesRealizado) > Number(veces)) {
            panorama = lisPanormasRealizados[x]
            veces = lisPanormasRealizados[x].vecesRealizado
        }

    })


    return panorama


    // //  a.municipio.localeCompare(b.municipio)

    // const tempArray = [{
    //     idPanorama: "78E01F7kM8XwRYIuVkcS",
    //     nombrePanorama: "Pasarela Puente Basas",
    //     vecesRealizado: 5
    // },
    // {
    //     idPanorama: "t8E01F7kM8XwRYIuVkcS",
    //     nombrePanorama: "Pasarela dfgdsfgdsg Puente Basas",
    //     vecesRealizado: 3,
    // },
    // {
    //     idPanorama: "A23wxGXfEGIKW80ErKPz",
    //     nombrePanorama: "Excursión Autoguiada Miradores Peñehue",
    //     vecesRealizado: 1,
    // },
    // {
    //     idPanorama: "tWX6DtrzuOqvRd81pGsO",
    //     nombrePanorama: "Acampar en la montaña con desayuno y excursiones",
    //     vecesRealizado: 2,
    // }


    // ]

    // // tslint:disable-next-line: no-console
    // console.log("Panoramas con cantidad de realizados ANTES de ordenar[tempArray]:", tempArray)
    // // tslint:disable-next-line: no-console
    // console.log("Panoramas con cantidad de realizados ANTES de ordenar[arrayMasR]:", arrayMasR)

    // // Object.keys(lisPanormasRealizados).sort((a, b) => {


    // //     if (lisPanormasRealizados[a].vecesRealizado > lisPanormasRealizados[b].vecesRealizado) {

    // //         return 1;
    // //     }

    // //     if (lisPanormasRealizados[a].vecesRealizado < lisPanormasRealizados[b].vecesRealizado) {

    // //         return -1;
    // //     }


    // //     return 0;

    // //     //   b.vecesRealizado - a.vecesRealizado
    // //     // alert(b.vecesRealizado)
    // // }

    // // );

    // // lisPanormasRealizados.sort((a, b) => {


    // //     if (a.vecesRealizado > b.vecesRealizado) {

    // //         return 1;
    // //     }

    // //     if (a.vecesRealizado > b.vecesRealizado) {

    // //         return -1;
    // //     }


    // //     return 0;

    // //     //   b.vecesRealizado - a.vecesRealizado
    // //     // alert(b.vecesRealizado)
    // // }

    // // );

    // arrayMasR.sort((a, b) => {


    //     if (a.vecesRealizado > b.vecesRealizado) {
    //         // alert(lisPanormasRealizados[a].vecesRealizado)
    //         return 1;
    //     }

    //     if (a.vecesRealizado > b.vecesRealizado) {

    //         return -1;
    //     }


    //     return 0;

    //     //   b.vecesRealizado - a.vecesRealizado
    //     // alert(b.vecesRealizado)
    // }


    // );
    // tempArray.sort((a, b) => {


    //     if (a.vecesRealizado > b.vecesRealizado) {
    //         //       alert(b.vecesRealizado)
    //         return 1;
    //     }

    //     if (a.vecesRealizado < b.vecesRealizado) {
    //         //     alert(b.vecesRealizado)
    //         return -1;
    //     }
    //     //  alert(b.vecesRealizado)
    //     return 0;

    //     //   b.vecesRealizado - a.vecesRealizado
    //     // alert(b.vecesRealizado)
    // }


    // );

    // // tslint:disable-next-line: no-console
    // console.log("Panoramas con cantidad de realizados despues de ordenar[tempArray]:", tempArray)
    // // tslint:disable-next-line: no-console
    // console.log("Panoramas con cantidad de realizados despues de ordenar[arrayMasR]:", arrayMasR)
    // // tslint:disable-next-line: no-console
    // console.log("Panoramas con cantidad de realizados despues de ordenar[lisPanormasRealizados]:", lisPanormasRealizados)


}

// Define la cantidad de numeros aleatorios.
export const panoramaMasDeseado = (arrayPanoramas: IDataPanorama) => {

    // const lisPanormasRealizados: IInfoPanorama[] = new Array()
    const lisPanormasDeseados = new Array()
    let c: number = 1;
    let idPAanterior = ""
    const arrayMasR = new Array()
    Object.keys(arrayPanoramas).map(
        (x) => {
            // Devuelve un arreglo con los panormas y el numero de veces que cada uno fue agregado a xrealizar
            if (idPAanterior === x.split("_")[0]) {
                c++
            } else {
                c = 1
            }
            lisPanormasDeseados[x.split("_")[0]] = {
                ...arrayPanoramas[x],
                vecesRealizado: c
            }
            idPAanterior = x.split("_")[0]
        }

    )
    Object.keys(lisPanormasDeseados).forEach(
        (x) => {
            arrayMasR.push(
                {
                    ...lisPanormasDeseados[x],
                    vecesRealizado: lisPanormasDeseados[x].vecesRealizado
                }

            )
        }
    )
    /** Se busca el panorama que se haya realizado más veces */
    let veces: number = 0
    let panorama = {}
    Object.keys(lisPanormasDeseados).forEach((x) => {
        if (Number(lisPanormasDeseados[x].vecesRealizado) > Number(veces)) {
            panorama = lisPanormasDeseados[x]
            veces = lisPanormasDeseados[x].vecesRealizado
        }
    })
    return panorama

}
