import { AnyAction, Dispatch } from 'redux';
import { IServices } from '../service'

import { IState } from './index'

const SET_PROFILE_IMAGE = 'users/set-profile-image'
export const setProfileImage = (payload: string) => ({
    payload,
    type: SET_PROFILE_IMAGE,
})

export interface ILogin {
    email: string
    password: string
}

export interface IRegister {
    email: string
    direccion: string
    password: string
    rePassword: string
    nombre: string
    fono: string
    ciudad: string
    comuna: string

}
export default function reducer(state = {}, action: AnyAction) {
    switch (action.type) {
        case SET_PROFILE_IMAGE: {
            return {
                ...state,
                profileImage: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export const login = ({ email, password }: ILogin) =>
    async (dispatch: Dispatch, getState: () => IState, { auth }: IServices) =>
        await auth.signInWithEmailAndPassword(email, password)
// {
//  const result = await auth.signInWithEmailAndPassword(email, password)
// // tslint:disable-next-line: no-console
//  // console.log("Incio sesion",result)

// }
export const register = ({ email, password, rePassword, nombre, ciudad, fono, comuna, direccion }: IRegister) =>
    async (dispatch: Dispatch, getstate: () => IState, { auth, db }: IServices) => {
        if (password !== rePassword) {
            // Si los password ingresados por el usuario son distintos adbierto al mismo
            alert(` Las contraseñas deben ser iguales => Pwd: ${password} rePwd : ${rePassword}`)

        } else {

            await auth.createUserWithEmailAndPassword(email, password).then(respuesta => {

                const { user } = respuesta // de la respuesta entregada obtengo el usuario
                // tslint:disable-next-line: no-console
                // console.log("user", user)
                const id = user ? user.uid : undefined
                const doc = db.collection('users').doc(id)
                // Almaceno el registro en la colección "users"
                doc.set({
                        ciudad,
                        comuna,
                        createdAt: new Date(),
                        direccion,
                        email: user ? user.email : undefined,
                        emailVerified: user ? user.emailVerified : undefined,
                        fono,
                        nombre,
                        role: 'turista',
                 
                })
            }, error => {
                // Manejo los errores.
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(` Se ha producido un error: ${errorCode}, mensaje : ${errorMessage}`)

            });

            // const userCredential = await auth.createUserWithEmailAndPassword(email, password)
            // const { user } = userCredential
            // const id = user ? user.uid : undefined
            //   const doc = db.collection('users').doc(id)
            // await doc.set({
            //     ciudad,
            //     comuna,
            //     createdAt: new Date(),
            //     direccion,
            //     email:user ? user.email:undefined,
            //     emailVerified:user ? user.emailVerified:undefined,
            //     fono,
            //     nombre,
            //     role: 'user',

            // })


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
            .child('profileImages')
            .child(`${uid}.jpeg`)

        const url = await imageRef.getDownloadURL()
        // tslint:disable-next-line:no-console
        console.log(`url loaderUser ${url}`)

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
            .child(`profileImages`)
            .child(`${uid}.jpeg`)
            .put(payload.profileImg)
        // console.log("payload.file", payload.profileImg)
        const url = await response.ref.getDownloadURL()
        //  console.log(`url:  ${url}`)
        dispatch(setProfileImage(url))
    }

