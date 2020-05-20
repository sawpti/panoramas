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
    if (c === 1) {
        return "Mínima";
    } else if (c > 1 && c <= 2.3) {
        return "Baja";
    } else if (c > 2.3 && c < 4.2) {
        return "Media";
    } else if (c > 4.2 && c <= 5) {
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
            console.log(`Existe?:${returnArray.indexOf(j)}`);
        } while (!returnArray.indexOf(j))
        returnArray.push(j);
    }
    return returnArray;
}

// Define la cantidad de numeros aleatorios.
