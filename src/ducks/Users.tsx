import { AnyAction, Dispatch } from 'redux';
import { IServices } from '../service'

import { IState } from './index'

// Definicion de tipos para nuestras acciones
const START = 'posts/fetch-start'
const SUCCESS = 'posts/fetch-success'
const ERROR = 'posts/fetch-error'
const SET_PROFILE_IMAGE = 'users/set-profile-image'
export const setProfileImage = (payload: string) => ({
    payload,
    type: SET_PROFILE_IMAGE,
})

export interface ILogin {
    email: string
    password: string
}

export interface IUser {
    email: string
    emailVerified: boolean
    direccion?: string
    password: string
    rePassword: string
    nombre: string
    fono: string
    ciudad: string
    comuna: string


}
export interface IDataUsers {
    [key: string]: IUser
}

const fetchStart = () => ({
    type: START,
})
const fetchSuccess = (payload: IDataUsers) => ({
    payload,
    type: SUCCESS,
})
const fetchError = (error: Error) => ({
    error,
    type: ERROR,
})
const initialState = {
    data: {},
    fetched: false,
    fetching: false,
}

export default function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case SET_PROFILE_IMAGE: {
            return {
                ...state,
                profileImage: action.payload
            }
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

        default: {
            return state
        }
    }
}

export const fetchUsers = () =>
    async (dispatch: Dispatch, getState: () => any, { db, storage, auth }: IServices) => {

        dispatch(fetchStart())

        try {
            const uid = auth.currentUser ? auth.currentUser.uid : "undefined"
            //  const snaps = await db.collection('users').doc(uid).get()
            // const user=snaps.data()
            // const users = {}
            // users[uid]={
            //     ...user
            // }

            const snaps = await db.collection('users')
                .where('uid', '==', uid)
                .limit(1)
                .get()
            const users = {}
            snaps.forEach(x => users[x.id] = x.data())

            // const userRef = db.collection('users').doc(uid)
            // const getDoc = userRef.get()
            //     .then(doc => {
            //         if (!doc.exists) {
            //              // tslint:disable-next-line: no-console
            //             console.log('No such document!');
            //         } else {
            //              // tslint:disable-next-line: no-console
            //             console.log('Document data:', doc.data());
            //         }
            //     })
            //     .catch(err => {
            //          // tslint:disable-next-line: no-console
            //         console.log('Error getting document', err);
            //     });


            // // tslint:disable-next-line: no-console
            // console.log('Resultado', getDoc)


            // tslint:disable-next-line: no-console
            //  console.log('user', users)
            dispatch(fetchSuccess(users))
        } catch (e) {
            // tslint:disable-next-line: no-console
            console.log(e)
            dispatch(fetchError(e))

        }
    }

export const login = ({ email, password }: ILogin) =>
    async (dispatch: Dispatch, getState: () => IState, { auth }: IServices) =>
        await auth.signInWithEmailAndPassword(email, password)
            .then(() => {

                alert("Iniciaste sesión correctamente")

            })
            .catch((error) => {

                alert(`Se ha producido un error, código:${error.code}, mensaje: ${error.message}`)


            }

            )



// {
//  const result = await auth.signInWithEmailAndPassword(email, password)
// // tslint:disable-next-line: no-console
//  // console.log("Incio sesion",result)

// }
export const register = ({ email, password, rePassword, nombre, ciudad, fono, comuna, direccion }: IUser) =>
    async (dispatch: Dispatch, getstate: () => IState, { auth, db }: IServices) => {
        if (password !== rePassword) {
            // Si los password ingresados por el usuario son distintos adbierto al mismo
            alert(` Las contraseñas deben ser iguales => Pwd: ${password} rePwd : ${rePassword}`)

        } else {

            await auth.createUserWithEmailAndPassword(email, password).then(respuesta => {

                const { user } = respuesta // de la respuesta entregada obtengo el usuario

                const id = user ? user.uid : undefined
                const direc = direccion ? direccion : "No ingresada"
                // tslint:disable-next-line: no-console
                console.log("direccion", direc)
                const doc = db.collection('users').doc(id)
                // Almaceno el registro en la colección "users"
                doc.set({
                    ciudad,
                    comuna,
                    createdAt: new Date(),
                    direccion: direc,
                    email: user ? user.email : undefined,
                    emailVerified: user ? user.emailVerified : undefined,
                    fono,
                    nombre,
                    role: 'turista',
                    uid: id

                })

                const u = auth.currentUser ? auth.currentUser : null
                if (u !== null) {
                    u.sendEmailVerification().then(() => {
                        // Email sent.
                        // tslint:disable-next-line: no-console
                        console.log("Se envió corectamente el e-mail de verificacion", u)
                    }).catch((error) => {
                        // An error happened.
                        // tslint:disable-next-line: no-console
                        console.log("Se ha producido un error al enviar el correo de verificación", error)
                    });


                }

            }, error => {
                // Manejo los errores.
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(` Se ha producido un error: ${errorCode}, mensaje : ${errorMessage}`)

            });



        }


    }
export const loadUserInitialData = () =>
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
        const { uid } = auth.currentUser
        const imageRef = storageRef
            .child('users')
            .child(`${uid}.jpeg`)

        const url = await imageRef.getDownloadURL()
        // tslint:disable-next-line:no-console
        // console.log(`url loaderUser ${url}`)

        dispatch(setProfileImage(url))
    }
export const handleProfileImageSubmit = (payload: { profileImg: File }) =>
    async (dispatch: Dispatch, getState: () => IState, { auth, storage }: IServices) => {
        // tslint:disable-next-line:no-console
        //   console.log("payload",payload) // es me muestra el objeto
        if (!auth.currentUser) {
            return
        }
        const { uid } = auth.currentUser
        const storageRef = storage.ref()
        // tslint:disable-next-line:no-console
        console.log("payload.file", payload.profileImg) // esto
        const response = await storageRef
            .child(`users`)
            .child(`${uid}.jpeg`)
            .put(payload.profileImg)
        // console.log("payload.file", payload.profileImg)
        const url = await response.ref.getDownloadURL()
        //  console.log(`url:  ${url}`)
        dispatch(setProfileImage(url))
    }

export const update = ({ email, nombre, ciudad, fono, comuna, direccion }: IUser) =>
    async (dispatch: Dispatch, getstate: () => IState, { auth, db }: IServices) => {
        const user = auth.currentUser
        const id = user ? user.uid : undefined
        const direc = direccion ? direccion : "No ingresada"
        // tslint:disable-next-line: no-console

        if (user) { // si user no es null 

            if (email !== user.email) { // Si el email del formulario es distinto al email registrado actualmente en firebase auth

                user.updateEmail(email).then(() => {
                    // Update successful.
                    // tslint:disable-next-line: no-console
                    console.log("Correo electrónico actualizado");
                }).catch((error) => {
                    // An error happened.
                });

                // Como el e-mail fue cambiado, envio al usurio la url de validaqción al nuevo correo
                user.sendEmailVerification().then(() => {
                    // Email sent.
                    // tslint:disable-next-line: no-console
                    console.log("Se envió corectamente el e-mail de verificacion", user)
                }).catch((error) => {
                    // An error happened.
                    // tslint:disable-next-line: no-console
                    console.log("Se ha producido un error al enviar el correo de verificación", error)
                });

            }

            // Actualizo la base de datos firestone
            const doc = db.collection('users').doc(id)
            // Almaceno el registro en la colección "users"
            doc.update({
                ciudad,
                comuna,
                direccion: direc,
                email,
                emailVerified: user ? user.emailVerified : undefined,
                fono,
                lastUpdate: new Date(),
                nombre,
                role: 'turista',
                uid: id
            })
        }
    }
