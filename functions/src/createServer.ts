import * as express from 'express'
import * as admin from 'firebase-admin'


interface IRequest extends express.Request {
    user: {
        uid: string,
        email: string,
        role: string,
    }
}

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
})

const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })
const auth = admin.auth()

export default () => {

    const app = express()

    app.use(async (req, res, next) => {
        const token = req.headers.authorization
        if (token === undefined) { return }
        try {
            const { uid, email } = await auth.verifyIdToken(token)
            const snap = await db.collection('users').doc(uid).get()
            const user = snap.data()
            Object.assign(req, {
                user: {
                    ...user,
                    uid,
                    email,
                }
            })
            next()
        } catch (e) {
            res.status(403).send('Error en la autorización')
        }
    })


    app.get('/posts', (req, res) => {
        res.send('Hola mundo desde la Api Rest')
    })


    app.get('/posts/:postId/share', async (req: IRequest, res: any) => {
        const { uid } = req.user
        const { postId } = req.params
        // Buscamos el post en cuestion
        // console.log("Post Id :"+postId)
        const snap = await db.collection('posts').doc(postId).get()
        const post = snap.data()
        const result = await db.collection('posts').add({
            ...post,
            userId: uid,
            createdAt: new Date(),
        })
        // 2 opciones para resubir la imagen: 1. desde el servidor con firebase function
        // 2. desde el cliente. Si lo hacemos de firebase podemos agotar cuota de computo. Por eso 
        // le enviamos el id al usuario para que resuba la imagen.
        res.send({ id: result.id })
    })
    app.get('/panoramas/:panoramaId/realizado', async (req: IRequest, res: any) => {
        const { uid } = req.user
        const { panoramaId } = req.params
        // Buscamos el post en cuestion
        const snap = await db.collection('users').doc(uid).get()
        const post = snap.data()
        const result = await db.collection('realizados').doc(`${panoramaId}_${uid}`).set({
            //...post,
            createdAt: new Date(),
            email: post.email,
            ciudadOrigen: post.ciudad,
            nombreUsuario: post.nombre,
            pid:panoramaId,
            uid

        })
        const sn = await db.collection('xrealizar').doc(`${panoramaId}_${uid}`).get()
        const xrealizar = sn.data()
        // tslint:disable-next-line: no-console
        console.log("Info interesados", xrealizar);

    // si xrealizar es undefined siginifica que el panorama no está en la coleccion de xrealizar
    // de lo contario de elimina 
        if (xrealizar != undefined) {
            await db.collection('xrealizar').doc(`${panoramaId}_${uid}`).delete()

        }

        res.send({ id: result })
    })

    app.get('/panoramas/:panoramaId/xrealizar', async (req: IRequest, res: any) => {
        const { uid } = req.user
        const { panoramaId } = req.params
        // Buscamos el post en cuestion
        const snap = await db.collection('users').doc(uid).get()
        const post = snap.data()
        const result = await db.collection('xrealizar').doc(`${panoramaId}_${uid}`).set({
            //...post,
            createdAt: new Date(),
            email: post.email,
            ciudadOrigen: post.ciudad,
            nombreUsuario: post.nombre,
            pid:panoramaId,
            uid
        })
        const sn = await db.collection('realizados').doc(`${panoramaId}_${uid}`).get()
        const xrealizar = sn.data()
           if (xrealizar != undefined) {
            await db.collection('realizados').doc(`${panoramaId}_${uid}`).delete()
        }


        res.send({ id: result })
    })

    return app

}
