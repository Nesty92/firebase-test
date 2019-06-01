import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {environment} from './enviroment/enviroment';

admin.initializeApp();
const db = admin.firestore();


exports.addPost = functions.https.onCall((data, context) => {
    const title = data.title;

    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    if (!title) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'Invalid Argument');
    }

    const newPost = {
        title: title,
        text: data.text || '',
        user: context.auth.uid
    };

    return db.collection(environment.POST_COLLECTION_NAME)
        .add(newPost)
        .then(doc => {
            return {
                status: 'ok'
            };
        }).catch(err => {
            console.error(err);
            throw new functions.https.HttpsError('internal', 'unable to store data');
        });
});


exports.updatePost = functions.https.onCall((data, context) => {
    const id = data.id;
    const title = data.title;

    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    if (!id || !title) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'Invalid Argument');
    }

    const newPost = {
        title: title,
        text: data.text || '',
        user: context.auth.uid
    };

    const postRef = db.collection(environment.POST_COLLECTION_NAME).doc(id);

    return postRef
        .update(newPost)
        .then(() => {
            return {
                status: 'ok'
            };
        }).catch(err => {
            throw new functions.https.HttpsError('internal', 'unable to store data');
        });
});


exports.deletePost = functions.https.onCall((data, context) => {
    const id = data.id;

    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    if (!id) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'Invalid Argument');
    }

    return db.collection(environment.POST_COLLECTION_NAME).doc(id)
        .delete()
        .then(doc => {
            console.log(doc);
            return {
                status: 'ok'
            };
        }).catch(() => {
            throw new functions.https.HttpsError('internal', 'unable to store data');
        });
});


exports.updateUser = functions.https.onCall((data, context) => {
    const uid = data.uid;
    const displayName = data.displayName;

    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    if (!uid || !displayName) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'uid and displayName are required');
    }
    const user = {
        image: data.photoURL || '',
        uid: data.uid,
        displayName: data.displayName
    };

    return db.collection(environment.USER_COLLECTION_NAME)
        .add(user)
        .then(() => {
            return {
                status: 'ok'
            };
        }).catch(err => {
            throw new functions.https.HttpsError('internal', 'unable to store data');
        });
});
