export const download = (url: string) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest() // 1 . creamos una instancia xmhttprequest que es el objeto para hacer peticiones
    xhr.responseType = "blob" // 2. vamos a indicar que el tipo de respuesta va a ser un blob
    xhr.onload = () => { // 5. una vez cargado con exito
        resolve(xhr.response) // 6. resolvemos la promesa con la respuesta que esta nos trajo
    }
    xhr.open('GET', url) // 3. abrimos la url que le pasamos a la funcion 
    xhr.send() // 4. hacemos el llamado
})


export const calificacion = (c: number)=>{

    if (c<=2.3) {
        return "Regular"
    }else if (c>2.3 && c<4.6){
        return "Bueno"
    }else if (c>4.6 && c<=7){
        return "Excelente"
    }
     else{
        return "No determinada"
    }

}

export const eFisica = (c: number)=>{

    if (c<=2.3) {
        return "Baja"
    }else if (c>2.3 && c<4.6){
        return "Media"
    }else if (c>4.6 && c<=7){
        return "Alta"
    } else {
        return "No determinada"
    }

}
export const eMensaje = (c:any)=>{

    if (c===null) {
        return "El panorama no tiene esta información"
    }else if (c===undefined){
        return "El panorama no tiene esta información"
    } else {
        return c
    }
    

}
export const nivelEplorador = (c: number)=>{

    if (c<=9) {
        return "Principiante"
    }else if (c>9 && c<=20){
        return "Explorador"
    }else if (c>20 && c<=50){
        return "Guia Local"
    } else {
        return "Experto"
    }

}