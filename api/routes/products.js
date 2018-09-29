const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'handling GET request to /products',
  });
});

router.post('/', (req, res, next) => {
  const product ={
    name: req.body.name,
    price: req.body.price
  }
  res.status(201).json({
    message: 'handling POST request to /products',
    createdProduct: product
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === 'special') {
    res.status(200).json({
      message: 'you found a SPECIAL id',
      id: id,
    });
  } else {
    res.status(200).json({
      message: 'you passed an ID',
    });
  }
});

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'UPDATED product',
  });
});
router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'DELETED product',
  });
});
module.exports = router;
