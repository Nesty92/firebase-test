import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { environment } from './enviroment/enviroment';

admin.initializeApp();
const db = admin.firestore();


// exports.addNumbers = functions.https.onCall((data, context) => {
//   const firstNumber = data.firstNumber;
//   const secondNumber = data.secondNumber;

//   // // Checking that the user is authenticated.
//   // if (!context.auth) {
//   //   // Throwing an HttpsError so that the client gets the error details.
//   //   throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
//   //     'while authenticated.');
//   // }

//   if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
//     // Throwing an HttpsError so that the client gets the error details.
//     throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
//       'two arguments "firstNumber" and "secondNumber" which must both be numbers.');
//   }

//   // return db.getCollections().then( list => {
//   //   return list;
//   // })

//   return db.collection(environment.COLLECTION_NAME)
//     .add({
//       firstNumber: firstNumber,
//       secondNumber: secondNumber,
//       operator: '+',
//       operationResult: firstNumber + secondNumber,
//     })
//     .then(doc => {
//       return doc;
//     }).catch(err => {
//       console.error(err);
//       throw new functions.https.HttpsError('internal', 'unable to store data');
//     });
// });
exports.getUser = functions.https.onCall((data, context) => {
  const uid = data.uid;

  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }

  if (!uid) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'uid is required');
  }

  return db.collection(environment.COLLECTION_NAME)
    .doc(uid)
    .get()
    .then(doc => {
      return doc;
    }).catch(err => {
      console.error(err);
      throw new functions.https.HttpsError('internal', 'unable to get data');
    });
});


exports.updateUser = functions.https.onCall((data, context) => {
  const uid = data.uid;
  const displayName = data.displayName;

  // // Checking that the user is authenticated.
  // if (!context.auth) {
  //   // Throwing an HttpsError so that the client gets the error details.
  //   throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
  //     'while authenticated.');
  // }

  if (!uid || !displayName) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'uid and displayName are required');
  }
  const user = {
    image: data.photoURL || '',
    uid: data.uid,
    displayName: data.displayName
  };

  return db.collection(environment.COLLECTION_NAME)
    .add(user)
    .then(doc => {
      return doc;
    }).catch(err => {
      console.error(err);
      throw new functions.https.HttpsError('internal', 'unable to store data');
    });
});