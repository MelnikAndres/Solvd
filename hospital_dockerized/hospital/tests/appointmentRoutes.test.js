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

    describe('POST /appointments/:specialization', () => {
        it('should create a new appointment on the specialization', async () => {
            const res = await request(app)
                .post('/appointments/cardiology')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    patient_id: 1
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('PUT /appointments/:id', () => {
        it('should update created appointment', async () => {
            const res = await request(app)
                .put('/appointments/1')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    status: "finished"
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('GET /appointments', () => {
        it('should respond with the created appointment', async () => {
            const res = await request(app)
                .get('/appointments')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    patient_id: 1,
                })
            expect(res.body.length).toEqual(1)
            expect(res.statusCode).toEqual(200)
            expect(res.body[0]).toHaveProperty('patient_id', 1)
            const resultDate = new Date(res.body[0].date)
            expect(resultDate.getTime()).toBeGreaterThan(Date.now())
            expect(res.body[0]).toHaveProperty('status', 'finished')
        })
    })

    afterAll(done => {
        clear().then(() => done())
    })
}

testAll()