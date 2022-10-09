# Set Up
please run `npm install` first.<br>
<br>
Create, Migrate, and Seeed the test database :
```js
npm run db:create:test
npm run db:migrate:test
npm run db:seed:test
```

# Server
Running Port : 4000<br>
Routes available :<br>
```js
// Global
POST ('/register') -> untuk membuat user
POST ('/login') -> untuk mengambil token

// Need authentication & authorization
GET ('/products') -> getAllProducts
GET ('/products/id') -> getProductsById //with authorization. (Currently available and tested is user id : 1)
POST ('/products') -> createOneProduct
```

# Credentials
