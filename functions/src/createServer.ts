 import * as express from 'express'
 // import * as admin from 'firebase-admin'

export default ()=>{

const app = express()
app.get('/',(req,res)=>{
    res.send("Hola mundo")
})
return app
}


// interface IRequest extends express.Request{
//     user: {
//         uid: string,
//         email: string,
//         role: string,
//     }
// }

// admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
// })

// const db = admin.firestore()
// db.settings( {timestampsInSnapshots: true} )
// const auth = admin.auth() 




// export default () => {

//   const app = express()

//   app.use(async(req, res, next) => {
//         const token = req.headers.authorization
//         if (token===undefined)
//          {return}           
//         try {         
//             const {uid, email} = await auth.verifyIdToken(token)            
//             const snap = await db.collection('users').doc(uid).get()            
//             const user = snap.data()
//             Object.assign(req, {
//                 user: {
//                     ...user,
//                     uid,
//                     email,
//                 }
//             })
//            next()
//         } catch (e) {
//               res.status(403).send('Error en la autorización')           
//         }
//     }) 


//     // app.get('/posts', (req,res) => {
//     //     res.send('Hola mundo')
//     // }) 

//      app.get('/api/posts/:postId/like', async (req:IRequest, res: any) => {
//         const { uid } = req.user
//         const { postId } = req.params  
//         const snaps = await db.collection('likes')
//             .where('userId', '==', uid)
//             .where('postId', '==', postId)
//             .limit(1)
//             .get()             
//         const result: { id?: string } = {} 
//         // Vamos a poder iterar nuestros snaps y guardar el resultado en un objeto llamado result
//          // Mutamos el objeto.Puede o no traer algo. En caso de traer algo va a ser data y los mezclamos con id
//         snaps.forEach(x => Object.assign(result, { ...x.data(), id: x.id }))
//          // Ahora podemos consultar el id del obejto result. Si existe ya hay like (borramos) sino creamos
//         //Preguntamos si existe id:
//         if (result.id){
//             await db.collection('likes').doc(result.id).delete()
//         }        
//         // En caso de no existir el resultado de id
//         if (!result.id){
//             await db.collection('likes').doc().set({
//                 userId: uid,
//                 postId,
//                 createdAt: new Date(),   
//             })
//         }    
//         // Luego con sendStatus(204) significa que no le mandamos nada de contenido sino OK ya se 
//         // efectuo correctamente la accion
//         res.sendStatus(204)
//     })
//     app.get('/api/posts/:postId/share', async (req: IRequest, res: any) => {
//                 const { uid } = req.user
//                 const { postId } = req.params
//                 // Buscamos el post en cuestion
//                 const snap = await db.collection('posts').doc(postId).get()
//                 const post = snap.data()
//                 const result = await db.collection('posts').add({
//                     ...post,
//                     userId: uid,
//                     createdAt: new Date(),
//                 })
//                 // 2 opciones para resubir la imagen: 1. desde el servidor con firebase function
//                 // 2. desde el cliente. Si lo hacemos de firebase podemos agotar cuota de computo. Por eso 
//                 // le enviamos el id al usuario para que resuba la imagen.
//                 res.send({id: result.id})
//             })
        
    

//   return app

// }
