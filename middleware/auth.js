const { user } = require('../models');
const { verifyToken } = require('../helper/jwt');

async function authentication(req, res, next) {
    try {
        const token = req.get('token')
        const userDecoded = verifyToken(token);
        const dataUser = await user.findOne({
            where: {
                id: userDecoded.id,
                email: userDecoded.email
            }
        })
        if(!dataUser) {
            return res.status(401).json({message: `User not found`});
        }
        res.locals.user = dataUser;
        return next();
    } catch (error) {
        return res.status(401).json({message: 'Anda Belum Login'});
    }
}

module.exports = authentication;