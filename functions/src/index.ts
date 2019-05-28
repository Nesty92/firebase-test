import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import { BookRoutes } from './router/router';
import * as compression from 'compression';
import * as cors from 'cors';

admin.initializeApp(functions.config().firebase);
// const db = admin.firestore(); // Add this

const app = express();
const main = express();

const routePrv: BookRoutes = new BookRoutes();

main.use('/api/v1', app);
routePrv.routes(app);
main.use(bodyParser.json());
app.use(compression())
app.use(cors());


export const webApi = functions.https.onRequest(main);

// app.get('/hello', (request, response) => {
//   response.send('hello world.');
// });


// app.post('/fights', async (request, response) => {
//   try {
//     const { winner, loser, title } = request.body;
//     const data = {
//       winner,
//       loser,
//       title
//     } 
//     const fightRef = await db.collection('fights').add(data);
//     const fight = await fightRef.get();

//     response.json({
//       id: fightRef.id,
//       data: fight.data()
//     });

//   } catch(error){

//     response.status(500).send(error);

//   }
// });