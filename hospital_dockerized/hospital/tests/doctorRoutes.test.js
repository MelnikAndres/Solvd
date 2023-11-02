const request = require('supertest')
const app = require('../app')
const { populate, clear } = require('./tables/manage_tables')
let cookie = null

function testAll(){
    beforeAll(done => {
        populate().then(() => done())
    })
    
    describe('POST /auth/login', () => {
        it('admin should be able to login', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    name: "Master",
                    password: "password"
                })
            expect(res.statusCode).toEqual(200)
            cookie = res.headers['set-cookie'][0].split(';')[0].split('=')[1]
            expect(res.headers['set-cookie'][0]).toMatch(/jwt=/)
        })
    })
    
    describe('POST /doctors', () => {
        it('should create a new doctor', async () => {
            const res = await request(app)
                .post('/doctors')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    name: "Andres",
                    password: "1234",
                    role: "doctor",
                    specialization: "cardiology"
                })
            expect(res.statusCode).toEqual(200)
        })
    })
    
    afterAll(done => {
        clear().then(() => done())
    })
}
testAll()