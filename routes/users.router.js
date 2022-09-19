const express = require('express');
const UsersService = require('../services/users.service');

const router = express.Router()

const usersService = new UsersService();

router.get('/', (req, res) => {
  const {limit, offset} = req.query
  let users = usersService.find()
  if (limit && offset) {
    users = {limit, offset, users}
  }
  res.json(users)
});
  
router.get('/:id', (req, res) => {
  const { id } = req.params
  const user = usersService.findOne(id)
  if (JSON.stringify(user) != JSON.stringify({})) {
    res.status(200).json(user);
  }
  else{
    res.status(404).json({
      message:"Not found"
    });
  }
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
