// tslint:disable-next-line:no-implicit-dependencies
import * as chai from "chai";


// Sinon is a library used for mocking or verifying function calls in JavaScript.
// import * as sinon from "sinon";

// const assert = chai.assert;
const expect = chai.expect;
// Require and initialize firebase-functions-test in "online mode" with your project's
// credentials and service account key.
const projectConfig = {
    projectId: "fir-test-31a92",
    databaseURL: "https://fir-test-31a92.firebaseio.com",
};
// tslint:disable-next-line:no-implicit-dependencies
const test = require('firebase-functions-test')(projectConfig, './src/test/service-account-key.json');


describe('Cloud Functions', () => {
    let myFunctions: any;

    before(() => {
        myFunctions = require('../index');

    });

    after(() => {
        // Do cleanup tasks.
        test.cleanup();
        // Reset the database.
    });

    describe('addPost-without-user', () => {
        const newPost = {
            title: 'title',
            text: 'text',
            user: 'user_uid'
        };
        // Wrap the addPost function
        it('should throw auth error', async () => {
            expect(() => test.wrap(myFunctions.addPost as any)(newPost)).to.throw();
        })
    });

    describe('addPost-with-user', () => {
        const newPost = {
            title: 'title',
            text: 'text',
            user: 'user_uid'
        };
        // Wrap the addPost function
        it('should add post', async () => {
            const result = await test.wrap(myFunctions.addPost)(newPost, {
                auth: {
                    uid: 'jckS2Q0'
                },
            });
            expect(result).to.deep.equal({
                status: 'ok'
            });
        })
    });

    describe('addPost-without-title', () => {
        const newPost = {
            text: 'text',
            user: 'user_uid'
        };
        // Wrap the addPost function
        it('should throw error', async () => {
            expect(() => test.wrap(myFunctions.addPost as any)(newPost)).to.throw();
        })
    });

    describe('updatePost-without-user', () => {
        const newPost = {
            title: 'title',
            text: 'text',
            user: 'user_uid'
        };
        // Wrap the addPost function
        it('should throw auth error', async () => {
            expect(() => test.wrap(myFunctions.addPost as any)(newPost)).to.throw();
        })
    });

    describe('updatePost-with-user', () => {
        const newPost = {
            title: 'title',
            text: 'text',
        };
        // Wrap the addPost function
        it('should update post', async () => {
            const result = await test.wrap(myFunctions.updatePost)({ id: 'ATvKxxlpMANiS2a5Y1Si', ...newPost}, {
                auth: {
                    uid: 'user_id'
                },
            });
            expect(result).to.deep.equal({
                status: 'ok'
            });
        })
    });

});
