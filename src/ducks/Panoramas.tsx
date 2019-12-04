import { firestore } from 'firebase';
import { AnyAction, Dispatch } from 'redux';
import { IServices } from '../service';
import * as utils from '../utils';

// Definicion de tipos para nuestras acciones
const START = 'posts/fetch-start'
const SUCCESS = 'posts/fetch-success'
const ERROR = 'posts/fetch-error'
const ADD = 'posts/add' // va a ser de tipo post y accion add

// creamos interfaz de Post (para compartir los post - C93)
export interface IPost {
    createdAt: firestore.Timestamp
    calificacion: number
    descripcion: string
    destacado?: boolean
    exigenciaFisica: number
    nomProveedor?: string
    nombre: string
    urlImagen: string
    urlImagen1: string
    urlImagen2: string
    urlWeb?: string
    urlMapUbicacion: string
    urlInstagram?: string
    urlFacebbok: string
    urlTripAdvisor?: string
    valor: number
    idPanorama?: string
}

// creamos una interfaz para indicar que tipo de datos es payload
export interface IDataPosts {
    [key: string]: IPost
}

// Definimos nuestros actions creators
const fetchStart = () => ({
    type: START,
})
const fetchSuccess = (payload: IDataPosts) => ({
    payload,
    type: SUCCESS,
})
const fetchError = (error: Error) => ({
    error,
    type: ERROR,
})
const add = (payload: IDataPosts) => ({
    payload,
    type: ADD,
})
// definimos el estado inicial: contiene data, fetched y fetching
// los dos ultimos porque traemos nuestros datos cuando estamos en la ruta de  newsfeed

const initialState = {
    data: {},
    fetched: false,
    fetching: false,
}

export default function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case START:
            return {
                ...state,
                fetching: true,
            }

        case SUCCESS:
            return {
                ...state,
                data: action.payload,
                fetched: true,
                fetching: false,
            }

        case ERROR:
            return {
                ...state,
                error: action.error,
                fetching: false,
            }
        case ADD:
            return {
                ...state,
                data: {
                    ...state.data, // tenemos una copia del estado
                    ...action.payload, // hacemos un destructuring del payload
                }
            }
        default:
            return state
    }
    // return state
}


export const fetchPosts = () =>
    async (dispatch: Dispatch, getState: () => any, { db, storage, auth }: IServices) => {

        dispatch(fetchStart())

        try {
            const snaps = await db.collection('panoramas').get()

            //          const snap = await db.collection('panoramas').doc().get()
            //   // tslint:disable-next-line: no-console
            //          console.log("snap.id", snap.id);

            const posts = {} // Panoramas 
            snaps.forEach(x => posts[x.id] = x.data())
            // tslint:disable-next-line: no-console
            //   console.log("posts", snaps);
            const imgIds = await Promise.all(Object.keys(posts).
                map(async x => {
                    const ref = storage.ref(`panoramas/${x}.jpeg`)
                    const url = await ref.getDownloadURL()
                    const ref1 = storage.ref(`panoramas/${x}1.jpeg`)
                    const url1 = await ref1.getDownloadURL()
                    const ref2 = storage.ref(`panoramas/${x}2.jpeg`)
                    const url2 = await ref2.getDownloadURL()
                    return [x, url, `${x}1`, url1, `${x}2`, url2]
                }))

            // tslint:disable-next-line: no-console


            const keyedImages = {}
            // Opción 1: una clave para una arreglo que contiene las tres imagens
            imgIds.forEach(x => keyedImages[x[0]] = [x[1], x[3], x[5]])

            // OPcion 2: una clave para cada imagen
            //  imgIds.forEach(x => {
            //     keyedImages[x[0]] = x[1]
            //     keyedImages[x[2]] = x[3]
            //     keyedImages[x[4]] = x[5]

            // })

            // tslint:disable-next-line: no-console

            // Opción 2: Una clave para cada imagen
            // Object.keys(posts).forEach(x => posts[x] = {
            //     ...posts[x],
            //     urlImagen: keyedImages[x],
            //     urlImagen1: keyedImages[`${x}1`],
            //     urlImagen2: keyedImages[`${x}2`],
            // })

            // Opción 1: de una clave para cada imagen
            Object.keys(posts).forEach(x => 
                    posts[x] = {
                       ...posts[x],

                        exigenciaFisica: posts[x].exigencia_fisica,
                        idPanorama: x,
                        urlFacebbok: posts[x].facebook,
                        urlImagen: keyedImages[x][0],
                        urlImagen1: keyedImages[x][1],
                        urlImagen2: keyedImages[x][2],
                        urlInstagram: posts[x].instagram,
                        urlMapUbicacion: posts[x].url_map_ubicacion,
                        urlTripAdvisor: posts[x].trip_advisor,
                        urlWeb: posts[x].web,
                    }
              

            )

            // tslint:disable-next-line: no-console
            //   console.log(posts)
            dispatch(fetchSuccess(posts))
        } catch (e) {
            // tslint:disable-next-line: no-console
            console.log(e)
            dispatch(fetchError(e))

        }
    }

// definimos los dos thunks de like y share
export const like = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        const token = await auth.currentUser.getIdToken()
        // tslint:disable-next-line:no-console
        console.log("token", token)
        // tslint:disable-next-line:no-console
        console.log("ID", id)
        // C87 - Conectando react con backend + C88 agregar token auth  
        // C89 - Agregamos un template string con el id del post seguido de la accion que queremos ejecutar
        // accion = like    
        // const result =
        await fetch(`/api/posts/${id}/like`, {
            headers: {
                authorization: token
            }
        })
        // console.log(id);
        //   const text = await result.text()
        // // tslint:disable-next-line: no-console
        // console.log(text) 
    }

export const share = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth, db, storage }: IServices) => {
        // tslint:disable-next-line: no-console
        console.log("Id Panorama" + id)
        if (!auth.currentUser) {
            return
        }
        const token = await auth.currentUser.getIdToken()
        // tslint:disable-next-line: no-console
        // console.log("Token Autorización: "+ token)
        const result = await fetch(`/api/posts/${id}/share`, {
            headers: {
                authorization: token
            }
        })
        // generamos la referencia de la imagen
        const url = await storage.ref(`posts/${id}.jpeg`).getDownloadURL()
        const blob = await utils.download(url) // descarga el archivo y luego vamos a poder subirlo con el id que nos devuelve la peticion de abajo
        const { id: postId }: { id: string } = await result.json()
        const ref = storage.ref(`posts/${postId}.jpeg`) // le indicamos que puede guardar el archivo que va a recibir un blob
        if (blob instanceof Blob) {
            // SOLUCION PARCIAL, EL IF NO DEBERIA IR
            await ref.put(blob)
        }
        const imageURL = await ref.getDownloadURL()
        const snap = await db.collection('posts').doc(postId).get()
        // const newPost = snap.data() // tenemos el nuevo post y podemos agregarlo a nuestro reducer.

        dispatch(add({
            [snap.id]: {
                ...snap.data(), // para pasar imageURL transformamos un objeto que hace destructuring 
                urlImagen: imageURL,
            }
        } as IDataPosts)) // esto actualiza el post
    }

export const xrealizar = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        const token = await auth.currentUser.getIdToken()
        await fetch(`/api/panoramas/${id}/xrealizar`, {
            headers: {
                authorization: token
            }
        })
       
    }
export const realizado = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        const token = await auth.currentUser.getIdToken()
        await fetch(`/api/panoramas/${id}/realizado`, {
            headers: {
                authorization: token
            }
        })

    }

export const sharetemp = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        const token = await auth.currentUser.getIdToken()
        // tslint:disable-next-line:no-console
        console.log("token", token)
        // tslint:disable-next-line:no-console
        console.log("ID", id)
        // C87 - Conectando react con backend + C88 agregar token auth  
        // C89 - Agregamos un template string con el id del post seguido de la accion que queremos ejecutar
        // accion = like    
        // const result =
        const result = await fetch(`/api/posts`, {
            headers: {
                authorization: token
            }
        })

        const text = await result.text()
        // tslint:disable-next-line: no-console
        console.log(text)
    }
