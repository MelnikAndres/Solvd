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
    
    describe('POST /patients', () => {
        it('should create a new patient', async () => {
            const res = await request(app)
                .post('/patients')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    name: "Andres",
                    password: "1234",
                    role: "patient"
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('POST /doctors', () => {
        it('should create a new doctor', async () => {
            const res = await request(app)
                .post('/doctors')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    name: "AndresDoc",
                    password: "1234",
                    role: "doctor",
                    specialization: "cardiology"
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('POST /derivations', () => {
        it('should create a new derivation for appointment', async () => {
            const res = await request(app)
                .post('/derivations')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    patient_id: 1,
                    symptoms: "heartache"
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('PUT /derivations/:id', () => {
        it('should update the derivation', async () => {
            const res = await request(app)
                .put('/derivations/1')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    admin_id: 1
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('GET /derivations', () => {
        it('get derivations made by admin 1', async () => {
            const res = await request(app)
                .get('/derivations?admin_id=1')
                .set('Cookie', [`jwt=${cookie}`])
                .send()
            expect(res.statusCode).toEqual(200)
            expect(res.body.length).toEqual(1)
            expect(res.body[0].admin_id).toEqual(1)
        })
    })

    afterAll(done => {
        clear().then(() => done())
    })
}

testAll()