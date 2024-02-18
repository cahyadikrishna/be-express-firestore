const { Router } = require('express');

const ProductController = require('../controllers/product');

const router = Router();

router.get('/product', ProductController.list);
router.post('/product', ProductController.create);
router.get('/product/:id', ProductController.detail);
router.put('/product/:id', ProductController.update);
router.delete('/product/:id', ProductController.delete);

module.exports = router;
