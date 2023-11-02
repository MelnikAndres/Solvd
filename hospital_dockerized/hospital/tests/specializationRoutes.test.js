const request = require('supertest')
const app = require('../app')
const { populate, clear } = require('./tables/manage_tables')
let cookie = null

function testAll(){
    beforeAll(done => {
        populate().then(() => done())
    })
    
    describe('GET /specializations', () => {
        it('should respond with all specializations', async () => {
            const res = await request(app)
                .get('/specializations')
                .send()
            expect(res.statusCode).toEqual(200)
            expect(res.body.length).toBeGreaterThan(0)
        })
    })
}

testAll()