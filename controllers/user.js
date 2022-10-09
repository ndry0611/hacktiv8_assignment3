const { user } = require('../models');
const { comparePassword } = require('../helper/bcrypt');
const { generateToken } = require('../helper/jwt');

class UserController {
    static async getAllUser(req, res) {
        try {
            const data = await user.findAll()

            res.status(200).json(data);

        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const data = await user.findOne({ where: { id: +id } })

            res.status(200).json(data);

        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async createUser(req, res) {
        const { username, email, password } = req.body;
        try {
            const inputData = {
                username,
                email,
                password
            };
            let result = await user.create(inputData);
            let response = {
                id: result.id,
                username: result.username,
                email: result.email,
            }

            res.status(201).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            let dataUser = await user.findOne({
                where: {
                    username: username
                }
            });
            if (!dataUser) {
                throw { message: `User ${username} tidak ditemukan` }
            }
            const passwordValid = comparePassword(password, dataUser.password)
            if (!passwordValid) {
                throw { message: `Password Salah` }
            }

            let payload = {
                id: dataUser.id,
                email: dataUser.email
            }
            const token = generateToken(payload);

            return res.status(200).json({token});
        } catch (error) {
            return res.status(500).json(error.message);
        }

    }
}

module.exports = UserController;