const { Router } = require('express');

const ProductRouter = require('./product');

const router = Router();

router.get('/', (req, res) => {
  res.send('Server is ready!');
});

router.use(ProductRouter);

module.exports = router;
