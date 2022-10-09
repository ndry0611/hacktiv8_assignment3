const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

const loginData = {
    username: 'admin',
    password: '123456'
};
const auth = {};

const itemData = {
    name: "microphone",
    madein: "indonesia",
    price: 10000,
}

beforeAll(async () => {
    const response = await request(app).post("/login")
        .send(loginData)
    auth.token = response.body.token;
});


describe('GET /products', () => {
    it("should require token authentication", function (done) {
        const response = request(app).get('/products')
            .expect(401)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

    it("should response with JSON array", function (done) {
        request(app).get('/products')
            .set('token', auth.token)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.status).toEqual(200);
                expect(typeof res.body).toEqual('object');
                done();
            });
    });
});

describe('GET /products/id', () => {
    it("should require token authentication", function (done) {
        request(app).get('/products')
            .expect(401)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

    it("should response 404 due to nothing found", function (done) {
        let id = 9999;
        request(app).get(`/products/${id}`)
            .set('token', auth.token)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.status).toEqual(404);
                done();
            });
    });

    it("should response 403 due to authorization fail", function (done) {
        let id = 2;
        request(app).get(`/products/${id}`)
            .set('token', auth.token)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.status).toEqual(403);
                done();
            })
    })

    it("should response with a JSON data", function (done) {
        let id = 1;
        request(app).get(`/products/${id}`)
            .set('token', auth.token)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.status).toEqual(200);
                expect(typeof res.body).toEqual('object');
                done();
            });
    });
});

describe('POST /products', () => {
    it("should require token authentication", function (done) {
        request(app).post('/products')
            .expect(401)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

    it('should create an instance', function (done) {
        request(app).post('/products')
            .set('token', auth.token)
            .send(itemData)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.status).toEqual(201);
                expect(res.body).toHaveProperty('name');
                expect(res.body).toHaveProperty('madein');
                expect(res.body).toHaveProperty('price');
                done();
            });
    });
})