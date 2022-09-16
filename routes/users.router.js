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
  
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params
    const user = (user_id > 0 && user_id <=users.length) ? {id: user_id, ...users.at(user_id-1)}:{}
    res.json(user)
})

module.exports = router
