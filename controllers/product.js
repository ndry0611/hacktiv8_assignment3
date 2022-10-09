const { product, user } = require('../models');

class ProductController
{
    static async getAllProduct(req,res) {
        try {
            const data = await product.findAll( { include: user } )

            res.status(200).json(data);

        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    static async getProductById(req,res) {
        const { id } = req.params;
        try {
            const data = await product.findOne({where: {id: +id}})

            res.status(200).json(data);

        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    static async createProduct(req,res) {
        const { name, madein, price } = req.body;
        const loginUser = res.locals.user
        try {
            const inputData = {
                name,
                madein,
                price,
                userId: loginUser.id
            };
            let result = await product.create(inputData);

            res.status(201).json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = ProductController;