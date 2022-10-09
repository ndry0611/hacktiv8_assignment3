const router = require('express').Router();

const UserController = require('../controllers/user');
const ProductController = require('../controllers/product');
const authentication = require('../middleware/auth');
const authorization = require('../middleware/authorize');

router.post('/login', UserController.login);
router.post('/register', UserController.createUser);

router.use(authentication);

router.get('/products', ProductController.getAllProduct);
router.get('/products/:id',authorization, ProductController.getProductById);
router.post('/products', ProductController.createProduct);

module.exports = router;