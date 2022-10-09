const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const userData = {
    username: "user_1",
    email: "user1@company.com",
    password: "123456"
};

describe('POST /register', () => {
    it("should send response with 201 status code", (done) => {
        request(app).post('/register')
            .send(userData)
            .end(function(err, res) {
                if(err) {
                    done(err)
                }
                expect(res.status).toBe(201);
                expect(typeof res.body).toBe("object");
                expect(res.body).toHaveProperty('id');
                expect(res.body).toHaveProperty('username');
                expect(res.body).toHaveProperty('email');
                expect(res.body.username).toBe(userData.username);
                expect(res.body.email).toBe(userData.email);
                done()
            });
    });
});

afterAll((done) => {
    sequelize.queryInterface.bulkDelete('users', {username: "user_1"})
    .then(() => {
        return done()
    })
    .catch(err => {
        return done(err)
    });
});