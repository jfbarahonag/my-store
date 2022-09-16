const express = require("express");
const router = express.Router()

let categories = [
    {
      name:"Category 1",
      products:[]
    },
    {
      name:"Category 2",
      products:[]
    },
]

router.get('/', (req, res) => {
    res.json(categories)
  });
  
router.get('/:category_id', (req, res) => {
    const { category_id } = req.params
    const category = (category_id > 0 && category_id <=categories.length) ? {id: category_id, ...categories.at(category_id-1)}:{}
    res.json(category)
})

router.get('/:category_id/products/:product_id', (req, res) => {
    const {category_id, product_id} = req.params
    res.json({category_id, product_id})
})

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message:"Created",
    data: body
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update total',
    data: body,
    id
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update partial',
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete',
    id
  });
});

module.exports = router
