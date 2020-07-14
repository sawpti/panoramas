import { firestore } from 'firebase';
import { AnyAction, Dispatch } from 'redux';
import { IServices } from '../service';
import * as utils from '../utils';
import { IState } from './index'
import noImage from '../images/unnamed.jpg';




// Definicion de tipos para nuestras acciones
const START = 'posts/fetch-start'
const SUCCESS = 'posts/fetch-success'
const SUCCESS1 = 'posts/fetch-success1'
const SUCCESSREALIZADOSPROVEEDOR = 'posts/fetch-successrealizadosproveedor'
const SUCCESSDESEADOSPROVEEDOR = 'posts/fetch-successdeseadosproveedor'
const ERROR = 'posts/fetch-error'
const ADD = 'posts/add' // va a ser de tipo post y accion add
const SET_PANORAMA_IMAGE = 'panoramas/set-panorama-image'
export const setPanoramaImage = (payload: string) => ({
    payload,
    type: SET_PANORAMA_IMAGE,
})
// creamos interfaz de Post (para compartir los post - C93)

export interface ILogin {
    email: string
    password: string
}

export interface IPanorama {
    createdAt: firestore.Timestamp
    calificacion: number
    descripcion: string
    destacado?: string
    exigenciaFisica: number
    nomProveedor?: string
    uidProveedor?: string
    nombre: string
    urlImagen: string
    urlImagen1: string
    urlImagen2: string
    urlWeb?: string
    urlMapUbicacion: string
    urlInstagram?: string
    urlFacebook: string
    urlTripAdvisor?: string
    valor: number
    idPanorama?: string
    lat: number,
    lng: number,
    direccion: string
}

// creamos una interfaz para indicar que tipo de datos es payload

export interface IDataPanorama {
    [key: string]: IPanorama

}
export interface IDataFirebase {
    arrayP: IDataPanorama
    valorInicial: any
    valorFinal: any

}


// Definimos nuestros actions creators
const fetchStart = () => ({
    type: START,
})
const fetchSuccess = (payload: IDataPanorama) => ({
    payload,
    type: SUCCESS,
})
const fetchSuccess1 = (payload: IDataFirebase) => ({
    payload,
    type: SUCCESS1,
})

const fetchSuccessRealizadosByProveedor = (payload: IDataPanorama) => ({
    payload,
    type: SUCCESSREALIZADOSPROVEEDOR,
})
const fetchSuccessdeseadosByProveedor = (payload: IDataPanorama) => ({
    payload,
    type: SUCCESSDESEADOSPROVEEDOR,
})






const fetchError = (error: Error) => ({
    error,
    type: ERROR,
})
const add = (payload: IDataPanorama) => ({
    payload,
    type: ADD,
})
// definimos el estado inicial: contiene data, fetched y fetching
// los dos ultimos porque traemos nuestros datos cuando estamos en la ruta de  newsfeed

const initialState = {
    data: {},
    data1: {},
    dataRealizadosByProveedor: {},
    fetched: false,
    fetching: false,
}

export default function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case SET_PANORAMA_IMAGE: {
            return {
                ...state,
                panoramaImage: action.payload
            }
        }
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
        case SUCCESS1:
            return {
                ...state,
                data1: action.payload,
                fetched: true,
                fetching: false,
            }
        case SUCCESSREALIZADOSPROVEEDOR:
            return {
                ...state,
                dataRealizadosByProveedor: action.payload,
                fetched: true,
                fetching: false,
            }
        case SUCCESSDESEADOSPROVEEDOR:
            return {
                ...state,
                dataDeseadosByProveedor: action.payload,
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

// Todos los panoramas
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
                    let url
                    let url2
                    let url1
                    try {
                        const ref = storage.ref(`panoramas/${x}.jpeg`)

                        url = await ref.getDownloadURL()
                        const ref1 = storage.ref(`panoramas/${x}1.jpeg`)
                        url1 = await ref1.getDownloadURL()
                        const ref2 = storage.ref(`panoramas/${x}2.jpeg`)
                        url2 = await ref2.getDownloadURL()
                        return [x, url, `${x}1`, url1, `${x}2`, url2]

                    } catch (e) {
                        // tslint:disable-next-line: no-console
                        console.log("error", e)
                        //     Si se produce un error (error 404) es porque la imagen no se encontró en el Storage y por la tanto 
                        //    ponemos la imagen temporal 'noImage' hasta que se edite el panorama y de le agregue las imágenes


                        return [x, url ? url : noImage, `${x}1`, url1 ? url1 : noImage, `${x}2`, url2 ? url2 : noImage]
                    }






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
                    ...posts[x], // estos son los campos que se llaman igual en la bd como en la interface


                    exigenciaFisica: posts[x].exigenciaFisica,
                    idPanorama: x,
                    uidProveedor: posts[x].uid,
                    urlFacebook: posts[x].urlFacebook,
                    urlImagen: keyedImages[x][0],
                    urlImagen1: keyedImages[x][1],
                    urlImagen2: keyedImages[x][2],
                    urlInstagram: posts[x].urlInstagram,
                    // urlMapUbicacion: posts[x].urlMapUbicacion,
                    urlTripAdvisor: posts[x].urlTripAdvisor,
                    urlWeb: posts[x].urlWeb,
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

// Panoramas por comuna
export const fetchFindPanoramasByComuna = async (paginaSize: number, panoramaInicial: any, comuna: string) =>
    async (dispatch: Dispatch, getState: () => any, { db, storage, auth }: IServices) => {

        dispatch(fetchStart())

        try {
            let panoramas = db.collection("panoramas")
                .where('comuna', '==', comuna)
                .orderBy("calificacion", "desc")
                .limit(paginaSize)

            if (panoramaInicial !== null) {
                panoramas = db.collection("panoramas")
                    .where('comuna', '==', comuna)
                    .orderBy("calificacion", "desc")
                    .startAfter(panoramaInicial)
                    .limit(paginaSize)

                if (comuna.trim() !== "") {

                    panoramas = db.collection("panoramas")
                        .orderBy("calificacion", "desc")
                        .where("keyword", "array-contains", comuna.toLocaleUpperCase())
                        .startAfter(panoramaInicial)
                        .limit(paginaSize)
                }
            }

            const snapshot = await panoramas.get()

            /* Opción 1 */

            const arrayPanoramas = {}
            snapshot.forEach((x) => (arrayPanoramas[x.id] = x.data()));


            /* Opción 2 */
            // const arrayPanoramas = snapshot.docs.map(doc => {
            //     const data = doc.data()
            //     const idPanorama = doc.id
            //     return { idPanorama, ...data }
            // })


            const imgIds = await Promise.all(
                Object.keys(arrayPanoramas).map(async (x) => {
                    let url;
                    let url2;
                    let url1;
                    try {
                        const ref = storage.ref(`panoramas/${x}.jpeg`);

                        url = await ref.getDownloadURL();
                        const ref1 = storage.ref(`panoramas/${x}1.jpeg`);
                        url1 = await ref1.getDownloadURL();
                        const ref2 = storage.ref(`panoramas/${x}2.jpeg`);
                        url2 = await ref2.getDownloadURL();
                        return [x, url, `${x}1`, url1, `${x}2`, url2];
                    } catch (e) {
                        // tslint:disable-next-line: no-console
                        console.log("error", e);
                        return [
                            x,
                            url ? url : noImage,
                            `${x}1`,
                            url1 ? url1 : noImage,
                            `${x}2`,
                            url2 ? url2 : noImage,
                        ];
                    }
                })
            );

            const keyedImages = {};
            // Opción 1: una clave para una arreglo que contiene las tres imagens
            imgIds.forEach((x) => (keyedImages[x[0]] = [x[1], x[3], x[5]]));
            // Opción 1: de una clave para cada imagen
            Object.keys(arrayPanoramas).forEach(
                (x) =>
                    (arrayPanoramas[x] = {
                        ...arrayPanoramas[x], // estos son los campos que se llaman igual en la bd como en la interface
                        exigenciaFisica: arrayPanoramas[x].exigenciaFisica,
                        idPanorama: x,
                        uidProveedor: arrayPanoramas[x].uid,
                        urlFacebook: arrayPanoramas[x].urlFacebook,
                        urlImagen: keyedImages[x][0],
                        urlImagen1: keyedImages[x][1],
                        urlImagen2: keyedImages[x][2],
                        urlInstagram: arrayPanoramas[x].urlInstagram,
                        urlTripAdvisor: arrayPanoramas[x].urlTripAdvisor,
                        urlWeb: arrayPanoramas[x].urlWeb,
                    })

            )

            // tslint:disable-next-line: no-console
            //   console.log("Array panoramas sdasd: ", arrayPanoramas);
            const inicialValor = snapshot.docs[0]
            // tslint:disable-next-line: no-console
            console.log("Valor inicial duck : ", inicialValor);
            const finalValor = snapshot.docs[snapshot.docs.length - 1]
            // tslint:disable-next-line: no-console
            console.log("Panoramas ducks: ", arrayPanoramas)

            const res = {
                arrayP: arrayPanoramas,
                valorFinal: finalValor,
                valorInicial: inicialValor,
            }


            dispatch(fetchSuccess1(res))
        } catch (e) {
            // tslint:disable-next-line: no-console
            console.log(e)
            dispatch(fetchError(e))

        }
    }
// Panoramas por comuna
export const fetchFindPanoramaComuna = (comuna: string, limitConsulta: number) =>
    async (dispatch: Dispatch, getState: () => any, { db, storage, auth }: IServices) => {

        dispatch(fetchStart())
        const p = {} // Panoramas 
        try {

            // https://github.com/firebase/snippets-node/blob/d769695bd1159103e7c877849ccaccab3db37039/firestore/main/index.js#L925-L950
            const first = db.collection('panoramas')
                .where('comuna', '==', comuna)
                .orderBy('calificacion', 'desc')
                .limit(limitConsulta)


            const paginate = first.get()
                .then(async (sn) => {
                    // ...

                    // Get the last document
                    const last = sn.docs[sn.docs.length - 1];

                    // Construct a new query starting at this document.
                    // Note: this will not have the desired effect if multiple
                    // cities have the exact same population value.
                    // cities have the exact same population value.
                    // let next = db.collection('cities')
                    //     .orderBy('population')
                    //     .startAfter(last.data().population)
                    //     .limit(3);

                    const next = db.collection('panoramas')
                        .where('comuna', '==', comuna)
                        .orderBy('calificacion', 'desc')
                        .startAfter(last.data().calificacion)
                        .limit(5)

                    // Use the query for pagination
                    // [START_EXCLUDE]

                    await next.get().then((snapshot) => {

                        snapshot.forEach(x => p[x.id] = x.data())


                    });
                    // tslint:disable-next-line: no-console
                    console.log('DataNext:', p);

                    // [END_EXCLUDE]
                });
            // [END cursor_paginate]
            // tslint:disable-next-line: no-console
            console.log('data 2:', p)
            // tslint:disable-next-line: no-console
            console.log('Paginate:', paginate)



            const snaps = await db.collection('panoramas')
                .where('comuna', '==', comuna)
                .orderBy('calificacion', 'desc')
                .limit(limitConsulta)
                .get()

            const posts = {} // Panoramas 
            snaps.forEach(x => posts[x.id] = x.data())
            // tslint:disable-next-line: no-console
            //   console.log("posts", snaps);
            const imgIds = await Promise.all(Object.keys(posts).
                map(async x => {
                    let url
                    let url2
                    let url1
                    try {
                        const ref = storage.ref(`panoramas/${x}.jpeg`)

                        url = await ref.getDownloadURL()
                        const ref1 = storage.ref(`panoramas/${x}1.jpeg`)
                        url1 = await ref1.getDownloadURL()
                        const ref2 = storage.ref(`panoramas/${x}2.jpeg`)
                        url2 = await ref2.getDownloadURL()
                        return [x, url, `${x}1`, url1, `${x}2`, url2]

                    } catch (e) {
                        // tslint:disable-next-line: no-console
                        console.log("error", e)
                        return [x, url ? url : noImage, `${x}1`, url1 ? url1 : noImage, `${x}2`, url2 ? url2 : noImage]
                    }
                }))

            const keyedImages = {}
            // Opción 1: una clave para una arreglo que contiene las tres imagens
            imgIds.forEach(x => keyedImages[x[0]] = [x[1], x[3], x[5]])
            // Opción 1: de una clave para cada imagen
            Object.keys(posts).forEach(x =>
                posts[x] = {
                    ...posts[x], // estos son los campos que se llaman igual en la bd como en la interface
                    exigenciaFisica: posts[x].exigenciaFisica,
                    idPanorama: x,
                    uidProveedor: posts[x].uid,
                    urlFacebook: posts[x].urlFacebook,
                    urlImagen: keyedImages[x][0],
                    urlImagen1: keyedImages[x][1],
                    urlImagen2: keyedImages[x][2],
                    urlInstagram: posts[x].urlInstagram,
                    urlTripAdvisor: posts[x].urlTripAdvisor,
                    urlWeb: posts[x].urlWeb,
                }


            )

            // tslint:disable-next-line: no-console
            console.log("Data anted de envir el duck: ", {
                posts,
                valorFinal: 1,
                valorInicial: 0,
            })


            dispatch(fetchSuccess(posts))
        } catch (e) {
            // tslint:disable-next-line: no-console
            console.log(e)
            dispatch(fetchError(e))

        }
    }


// Panoramas por  usuario (usuario creador)
export const fetchFindPanoramaUsuario = (uid: string) =>
    async (dispatch: Dispatch, getState: () => any, { db, storage, auth }: IServices) => {

        dispatch(fetchStart())

        try {

            const snaps = await db.collection('panoramas')
                .where('uid', '==', uid)
                .orderBy('calificacion', 'desc')
                .get()

            const posts = {} // Panoramas 
            snaps.forEach(x => posts[x.id] = x.data())
            // tslint:disable-next-line: no-console
            //   console.log("posts", snaps);
            const imgIds = await Promise.all(Object.keys(posts).
                map(async x => {
                    let url
                    let url2
                    let url1
                    try {
                        const ref = storage.ref(`panoramas/${x}.jpeg`)

                        url = await ref.getDownloadURL()
                        const ref1 = storage.ref(`panoramas/${x}1.jpeg`)
                        url1 = await ref1.getDownloadURL()
                        const ref2 = storage.ref(`panoramas/${x}2.jpeg`)
                        url2 = await ref2.getDownloadURL()
                        return [x, url, `${x}1`, url1, `${x}2`, url2]

                    } catch (e) {
                        // tslint:disable-next-line: no-console
                        console.log("error", e)
                        return [x, url ? url : noImage, `${x}1`, url1 ? url1 : noImage, `${x}2`, url2 ? url2 : noImage]
                    }
                }))
            const keyedImages = {}
            // Opción 1: una clave para una arreglo que contiene las tres imagens
            imgIds.forEach(x => keyedImages[x[0]] = [x[1], x[3], x[5]])
            // Opción 1: de una clave para cada imagen
            Object.keys(posts).forEach(x =>
                posts[x] = {
                    ...posts[x], // estos son los campos que se llaman igual en la bd como en la interface
                    exigenciaFisica: posts[x].exigenciaFisica,
                    idPanorama: x,
                    uidProveedor: posts[x].uid,
                    urlFacebook: posts[x].urlFacebook,
                    urlImagen: keyedImages[x][0],
                    urlImagen1: keyedImages[x][1],
                    urlImagen2: keyedImages[x][2],
                    urlInstagram: posts[x].urlInstagram,
                    urlTripAdvisor: posts[x].urlTripAdvisor,
                    urlWeb: posts[x].urlWeb,
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

/** Obtiene todos los panoramas realizados de los usarios que correspondan al proveedor que inició sesión */
export const fetchPanoramasRealizadosByProveedor = () =>
    async (dispatch: Dispatch, getState: () => any, { db, storage, auth }: IServices) => {

        dispatch(fetchStart())
        if (!auth.currentUser) {
            return
        }

        try {
            const uid = auth.currentUser.uid
            const xrealizarRef = db.collection('realizados')
                .where('uidProveedor', '==', uid)
                .orderBy("idPanorama")
            const pxr = {} // Panoramas por realizar
            await xrealizarRef.get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        // tslint:disable-next-line: no-console
                        console.log('Consulta vacía');
                        return;
                    }
                    snapshot.forEach(doc => {
                        // tslint:disable-next-line: no-console
                        pxr[doc.id] = doc.data()
                        //   console.log(doc.id, '=>', doc.data());
                    });
                })
                .catch(err => {
                    // tslint:disable-next-line: no-console
                    console.log('Error', err.message);
                });
            // tslint:disable-next-line: no-console
            //  console.log('Enviando data', pxr);
            dispatch(fetchSuccessRealizadosByProveedor(pxr))


        } catch (error) {
            // tslint:disable-next-line: no-console
            console.log(error)
            dispatch(fetchError(error))

        }

    }


/** Obtiene todos los panoramas deseados (xrealizar)  de los usarios que correspondan al proveedor que inició sesión */
export const fetchPanoramasDeseadosByProveedor = () =>
    async (dispatch: Dispatch, getState: () => any, { db, storage, auth }: IServices) => {

        dispatch(fetchStart())
        if (!auth.currentUser) {
            return
        }

        try {
            const uid = auth.currentUser.uid
            const xrealizarRef = db.collection('xrealizar')
                .where('uidProveedor', '==', uid)
                .orderBy("idPanorama")
            const pxr = {} // Panoramas por realizar
            await xrealizarRef.get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        // tslint:disable-next-line: no-console
                        console.log('Consulta vacía');
                        return;
                    }
                    snapshot.forEach(doc => {
                        // tslint:disable-next-line: no-console
                        pxr[doc.id] = doc.data()
                        //   console.log(doc.id, '=>', doc.data());
                    });
                })
                .catch(err => {
                    // tslint:disable-next-line: no-console
                    console.log('Error', err.message);
                });
            // tslint:disable-next-line: no-console
            //  console.log('Enviando data', pxr);
            dispatch(fetchSuccessdeseadosByProveedor(pxr))


        } catch (error) {
            // tslint:disable-next-line: no-console
            console.log(error)
            dispatch(fetchError(error))

        }

    }


export const fetchPanoramasPorRealizar = () =>
    async (dispatch: Dispatch, getState: () => any, { db, storage, auth }: IServices) => {

        dispatch(fetchStart())

        try {
            const uid = auth.currentUser ? auth.currentUser.uid : undefined
            const xrealizarRef = db.collection('xrealizar')
                .where('uid', '==', uid)
            const pxr = {} // Panoramas por realizar
            await xrealizarRef.get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        // tslint:disable-next-line: no-console
                        console.log('Consulta vacía');

                        return;
                    }
                    snapshot.forEach(doc => {
                        // tslint:disable-next-line: no-console
                        pxr[doc.id] = doc.data()
                        //   console.log(doc.id, '=>', doc.data());
                    });
                })
                .catch(err => {
                    // tslint:disable-next-line: no-console
                    console.log('Error', err.message);
                });
            dispatch(fetchSuccess(pxr))


        } catch (error) {
            // tslint:disable-next-line: no-console
            console.log(error)
            dispatch(fetchError(error))

        }

    }

export const fetchPanoramasRealizados = () =>
    async (dispatch: Dispatch, getState: () => any, { db, storage, auth }: IServices) => {

        dispatch(fetchStart())

        try {
            const uid = auth.currentUser ? auth.currentUser.uid : undefined
            const xrealizarRef = db.collection('realizados')
                .where('uid', '==', uid)
            const pxr = {} // Panoramas por realizar
            await xrealizarRef.get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        // tslint:disable-next-line: no-console
                        console.log('Consulta vacía');

                        return;
                    }
                    snapshot.forEach(doc => {
                        // tslint:disable-next-line: no-console
                        pxr[doc.id] = doc.data()
                        //   console.log(doc.id, '=>', doc.data());
                    });
                })
                .catch(err => {
                    // tslint:disable-next-line: no-console
                    console.log('Error', err.message);
                });
            dispatch(fetchSuccess(pxr))


        } catch (error) {
            // tslint:disable-next-line: no-console
            console.log(error)
            dispatch(fetchError(error))

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
        // tslint:disable-next-line:no-console
        console.log("token", token)
        // tslint:disable-next-line:no-console
        console.log("ID", id)
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
        } as IDataPanorama)) // esto actualiza el post
    }

export const xrealizar = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        try {
            const token = await auth.currentUser.getIdToken()
            // tslint:disable-next-line:no-console
            console.log("token", token)
            // tslint:disable-next-line:no-console
            console.log("ID", id)
            await fetch(`/api/panoramas/${id}/xrealizar`, {
                headers: {
                    authorization: token
                }
            })

        } catch (error) {

            // tslint:disable-next-line:no-console
            console.log("Error:", error)
        }


    }
export const realizado = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        try {
            const token = await auth.currentUser.getIdToken()
            await fetch(`/api/panoramas/${id}/realizado`, {
                headers: {
                    authorization: token
                }
            })

        } catch (error) {

            // tslint:disable-next-line:no-console
            console.log("Error:", error)
        }


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
export const register = ({ nombre, descripcion, urlFacebook, urlInstagram, urlWeb, urlTripAdvisor, calificacion, valor, exigenciaFisica, destacado }: IPanorama) =>
    async (dispatch: Dispatch, getstate: () => IState, { auth, db }: IServices) => {
        // const snap = await db.collection('users').doc(auth.currentUser.uid).get()
        // const userFirestore = snap.data()

        if (auth.currentUser != null) {
            const id = auth.currentUser.uid
            const snaps = await db.collection('users')
                .where('uid', '==', id)
                .limit(1)
                .get()
            const users = {}
            snaps.forEach(x => users[x.id] = x.data())
            // Si el usuario verificó su e-mail, pregunto si este cambio se actulizó en firestore
            if (users[id].role === "admin") {
                //     alert("HOLA admin")
                const doc = db.collection('panoramas').doc()
                doc.set({
                    calificacion,
                    createdAt: new Date(),
                    descripcion,
                    destacado: destacado ? "SI" : "NO",
                    exigenciaFisica,
                    nombre,
                    uid: id,
                    urlFacebook: urlFacebook ? urlFacebook : "No tiene",
                    urlInstagram: urlInstagram ? urlInstagram : "No tiene",
                    // urlMapUbicacion: urlMapUbicacion ? urlMapUbicacion : "No tiene",
                    urlTripAdvisor: urlTripAdvisor ? urlTripAdvisor : "No tiene",
                    urlWeb: urlWeb ? urlWeb : "No tiene",
                    valor: valor ? valor : 0,

                }).then(() => {
                    // tslint:disable-next-line: no-console
                    console.log("Registro agregado");
                    alert("Panorama registrado")
                    location.href = "/app/admin";

                }).catch((error) => {
                    // tslint:disable-next-line: no-console
                    console.log("Errorrrrn", error)
                });

            } else {
                alert("No eres admin")
            }
        }
    }
export const loadPanoramaInitialData = (idPanorama: string) =>
    async (dispatch: Dispatch, getState: () => IState, { storage, auth }: IServices) => {
        // // tslint:disable-next-line: no-console
        //  console.log('object -------------------')
        // console.log(`Auth CurrentUser ${auth.currentUser}`)
        //  console.log('CurrentUser', auth.currentUser)
        if (!auth.currentUser) {
            // console.log('CurrentUser', auth.currentUser)
            return
        }

        const storageRef = storage.ref()
        const imageRef = storageRef
            .child('panoramas')
            .child(`${idPanorama}.jpeg`)

        const url = await imageRef.getDownloadURL()
        // tslint:disable-next-line:no-console
        // console.log(`url loaderUser ${url}`)

        dispatch(setPanoramaImage(url))
    }
export const handlePanoramaImageSubmit = (payload: { profileImg: File }, idPanorama: string) =>
    async (dispatch: Dispatch, getState: () => IState, { auth, storage }: IServices) => {
        // tslint:disable-next-line:no-console
        //   console.log("payload",payload) // es me muestra el objeto
        if (!auth.currentUser) {
            return
        }
        const storageRef = storage.ref()
        // tslint:disable-next-line:no-console
        console.log("payload.file", payload.profileImg) // esto
        const response = await storageRef
            .child(`panoramas`)
            .child(`${idPanorama}.jpeg`)
            .put(payload.profileImg)
        // console.log("payload.file", payload.profileImg)
        const url = await response.ref.getDownloadURL()
        // tslint:disable-next-line:no-console
        console.log(`url Imagen:  ${url}`)
        dispatch(setPanoramaImage(url))
    }

export const porRealizarAdd = (p: IPanorama, fecha: Date) =>
    async (dispatch: Dispatch, getState: () => any, { auth, db }: IServices) => {
        return new Promise(async (resolve, eject) => {
            if (!auth.currentUser) {
                return
            }
            try {
                // Obtenemos los datos del usurio en Firestore
                const snap = await db.collection('users').doc(auth.currentUser.uid).get()
                const userFirestore = snap.data()
                if (userFirestore != null) {
                    await db.collection('xrealizar').doc(`${p.idPanorama}_${auth.currentUser.uid}`).set({
                        ...p,
                        ciudadOrigen: userFirestore.ciudad,
                        createdAt: new Date(),
                        email: userFirestore.email,
                        fecha,
                        nombreUsuario: userFirestore.nombre,
                        uid: auth.currentUser.uid
                    })
                    const sn = await db.collection('realizados').doc(`${p.idPanorama}_${auth.currentUser.uid}`).get()
                    const reali = sn.data()
                    if (reali !== undefined) {
                        await db.collection('realizados').doc(`${p.idPanorama}_${auth.currentUser.uid}`).delete()
                    }
                    resolve("OK");
                }
            } catch (error) {
                // tslint:disable-next-line:no-console
                console.log("Error", error.message) // esto
                // alert(error.message)
                resolve(error.message);
            }


        })



    }

export const realizadoAdd = (p: IPanorama, fecha: Date, calificacion: number) =>
    async (dispatch: Dispatch, getState: () => any, { auth, db }: IServices) => {
        return new Promise(async (resolve, eject) => {
            if (!auth.currentUser) {
                return
            }
            try {
                // Obtenemos los datos del usurio en Firestore
                const snap = await db.collection('users').doc(auth.currentUser.uid).get()
                const userFirestore = snap.data()

                if (userFirestore != null) {
                    await db.collection('realizados').doc(`${p.idPanorama}_${auth.currentUser.uid}`).set({
                        ...p,
                        calificacionOtorgada: calificacion,
                        ciudadOrigen: userFirestore.ciudad,
                        createdAt: new Date(),
                        email: userFirestore.email,
                        fecha,
                        nombreUsuario: userFirestore.nombre,
                        uid: auth.currentUser.uid
                    })
                    const sn = await db.collection('xrealizar').doc(`${p.idPanorama}_${auth.currentUser.uid}`).get()
                    const reali = sn.data()
                    if (reali !== undefined) {
                        await db.collection('xrealizar').doc(`${p.idPanorama}_${auth.currentUser.uid}`).delete()
                    }
                    resolve("OK");
                }
            } catch (error) {
                // tslint:disable-next-line:no-console
                console.log("Error", error.message) // esto
                // alert(error.message)
                resolve(error.message);
            }


        })
    }

export const fetchPanoramasRealizadosByIdPanorama = (idPanorama: string) =>
    async (dispatch: Dispatch, getState: () => any, { db }: IServices) => {

        dispatch(fetchStart())

        try {

            const consulta = db.collection('realizados')
                .where('idPanorama', '==', idPanorama)
                .orderBy('fecha', 'asc')
                .limit(50)
            const pxr = {} // Panoramas por realizar
            await consulta.get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        // tslint:disable-next-line: no-console
                        console.log('Consulta vacía');

                        return;
                    }
                    snapshot.forEach(doc => {
                        // tslint:disable-next-line: no-console
                        pxr[doc.id] = doc.data()
                        //   console.log(doc.id, '=>', doc.data());
                    });
                })
                .catch(err => {
                    // tslint:disable-next-line: no-console
                    console.log('Error', err.message);
                });
            dispatch(fetchSuccess(pxr))


        } catch (error) {
            // tslint:disable-next-line: no-console
            console.log(error)
            dispatch(fetchError(error))

        }

    }

export const findUsersByIdPanoramaMR = (idPanorama: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth, db }: IServices) => {
        return new Promise(async (resolve, eject) => {
            if (!auth.currentUser) {
                return
            }
            try {
                const consulta = db.collection('realizados')
                    .where('idPanorama', '==', idPanorama)
                    .orderBy('fecha', 'asc')
                    .limit(50)
                const usersByPaorama = {}
                await consulta.get()
                    .then(snapshot => {
                        if (snapshot.empty) {
                            // tslint:disable-next-line: no-console
                            console.log('Consulta vacía');
                            // resolve("Consulta vacía")
                            return;
                        }
                        snapshot.forEach(doc => {
                            // tslint:disable-next-line: no-console
                            usersByPaorama[doc.data().uid] = {
                                califiacionOtorgada: doc.data().calificacionOtorgada ? doc.data().calificacionOtorgada : "No otorgada",
                                email: doc.data().email,
                                fechaVisita: doc.data().fecha,
                                nombre: doc.data().nombreUsuario,
                                procedencia: doc.data().ciudadOrigen,
                            }
                        });
                        resolve(usersByPaorama);
                        // tslint:disable-next-line: no-console
                        // console.log("Usduarios panorama", pxr);


                    })
                    .catch(err => {
                        // tslint:disable-next-line: no-console
                        console.log('Error', err.message);
                    });
            } catch (error) {
                // tslint:disable-next-line: no-console
                console.log(error)
                resolve(error.message)
            }
        })
    }

export const findUsersByIdPanoramaMD = (idPanorama: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth, db }: IServices) => {
        return new Promise(async (resolve, eject) => {
            if (!auth.currentUser) {
                return
            }
            try {
                const consulta = db.collection('xrealizar')
                    .where('idPanorama', '==', idPanorama)
                    .orderBy('fecha', 'asc')
                    .limit(50)
                const usersByPaorama = {}
                await consulta.get()
                    .then(snapshot => {
                        if (snapshot.empty) {
                            // tslint:disable-next-line: no-console
                            console.log('Consulta vacía');
                            // resolve("Consulta vacía")
                            return;
                        }
                        snapshot.forEach(doc => {
                            // tslint:disable-next-line: no-console
                            usersByPaorama[doc.data().uid] = {
                                email: doc.data().email,
                                fechaDeseo: doc.data().fecha,
                                nombre: doc.data().nombreUsuario,
                                procedencia: doc.data().ciudadOrigen,
                            }
                        });
                        resolve(usersByPaorama);
                        // tslint:disable-next-line: no-console
                        // console.log("Usduarios panorama", pxr);


                    })
                    .catch(err => {
                        // tslint:disable-next-line: no-console
                        console.log('Error', err.message);
                    });
            } catch (error) {
                // tslint:disable-next-line: no-console
                console.log(error)
                resolve(error.message)
            }
        })
    }



export const comentarioAdd = (idPanorama: string, fecha: Date, calificacion: number, comentario: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth, db }: IServices) => {
        return new Promise(async (resolve, eject) => {
            if (!auth.currentUser) {
                return
            }
            try {
                // Obtenemos los datos del usurio en Firestore
                const snap = await db.collection('users').doc(auth.currentUser.uid).get()
                const userFirestore = snap.data()

                if (userFirestore != null) {
                    await db.collection('panoramas')
                        .doc(`${idPanorama}`)
                        .collection("comentarios")
                        .doc(auth.currentUser.uid)
                        .set({
                            calificacionOtorgada: calificacion,
                            ciudadOrigen: userFirestore.ciudad,
                            comentario,
                            createdAt: new Date(),
                            email: userFirestore.email,
                            fecha,
                            nombreUsuario: userFirestore.nombre,
                            uid: auth.currentUser.uid
                        })

                    resolve("OK");
                }
            } catch (error) {
                // tslint:disable-next-line:no-console
                console.log("Error", error.message) // esto
                // alert(error.message)
                resolve(error.message);
            }


        })
    }