const express = require('express');
const faker = require('faker');
const app = express();
const port = 3000;
const host = 'localhost'

const get_products = (limit=100) => {
  let products = []
  for (let idx = 0; idx < limit; idx++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl(),
    })
  }
  return products
}

let products = get_products()

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

app.get('/', (req, res) => {
  res.send('Hi from Express');
});

app.get('/products', (req, res) => {
  const {size} = req.query
  const limit = size || 10 // get from query params or 10 by default
  products = get_products(limit)
  res.json(products)
});

app.get('/products/filter', (req, res) => {
  res.send('i am a filter')
})

app.get('/products/:product_id', (req, res) => {
  const { product_id } = req.params
  const product = (product_id > 0 && product_id <=products.length) ? {id: product_id, ...products.at(product_id-1)}:{}
  res.json(product)
})

app.get('/categories', (req, res) => {
  res.json(categories)
});

app.get('/categories/:category_id', (req, res) => {
  const { category_id } = req.params
  const category = (category_id > 0 && category_id <=categories.length) ? {id: category_id, ...categories.at(category_id-1)}:{}
  res.json(category)
})

app.get('/categories/:category_id/products/:product_id', (req, res) => {
  const {category_id, product_id} = req.params
  res.json({category_id, product_id})
})

app.get('/users', (req, res) => {
  const {limit, offset} = req.query
  if (limit && offset) {
    users = {limit, offset, users}
  }
  res.json(users)
});

app.get('/users/:user_id', (req, res) => {
  const { user_id } = req.params
  const user = (user_id > 0 && user_id <=users.length) ? {id: user_id, ...users.at(user_id-1)}:{}
  res.json(user)
})

app.listen(port, host, () => {
  console.log(`Listening on port ${port}`);
});
