const { product } = require('../models');

async function authorization(req, res, next) {
    const productId = req.params.id;
    const loggedUser = res.locals.user;

    try {
        const dataProduct = await product.findOne({
            where: {
                id: productId
            }
        })
        if (!dataProduct) {
            return res.status(404).json({message: `Product dengan ID : ${productId} tidak ada`});
        }
        if (dataProduct.userId === loggedUser.id) {
            return next();
        } else {
            return res.status(403).json({message: `Data Forbidden: User tidak memiliki akses ke product`});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = authorization;