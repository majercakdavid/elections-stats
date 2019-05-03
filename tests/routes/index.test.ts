import * as chai from 'chai';
import 'mocha';
import * as request from 'supertest';
import app from '../../src/index';

const expect = chai.expect;
const agent = request.agent(app);

before(function(done) {
    this.timeout(60000);

    app.on("appStarted", async () => {
        done();
    });
});

describe('GET /', () => {
    it('responds with json', async () => {
        const res = await agent.get('/');
        expect(res.status).equal(200);
    }).timeout(20000);
});
