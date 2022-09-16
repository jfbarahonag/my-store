const express = require('express');

const router = express.Router()

let users = [
    {
        first_name : 'Oso',
        last_name : 'Perez',
        email : 'perezoso@noemail.com',
        password : '%^&ErGjGF123^',
    },
    {
        first_name : 'Lalo',
        last_name : 'Landa',
        email : 'landalolo@noemail.com',
        password : '6458QwERTtt$%^&',
    },
]

router.get('/', (req, res) => {
    const {limit, offset} = req.query
    let resp = users
    if (limit && offset) {
      resp = {limit, offset, users}
    }
    res.json(resp)
});
  
router.get('/:id', (req, res) => {
    const { user_id: id } = req.params
    const user = (id > 0 && id <=users.length) ? {id: id, ...users.at(id-1)}:{}
    res.json(user)
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
