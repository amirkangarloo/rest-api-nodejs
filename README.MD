# Restful API Node.js
This project i build a restful API with node.

A simple shop API include users, products and orders routes.
## Installation
Write commands below into command line in your machine.

**first step**
```javascript
git clone https://github.com/amirkangarloo/rest-api-nodejs.git
```
**second step**
```javascript
npm install
```
**third step**
```javascript
npm start
```
## Usage
### users
- **Sing up new user**

Send POST request to /users/signup and Write below JSON into body request.

```json
{
    "email": "testmail@gmail.com",
    "password": "test1234"
}
```
- **Login user**

Send POST request to /users/login and Write below JSON into body request.

```json
{
    "email": "testmail@gmail.com",
    "password": "test1234"
}
```
- **Delete user acount**

Send DELETE request to /users/:userId

**NOTE:** you can see the userId and token in the response /users/login route.

**NOTE:** you need also send valid token for Authorization request header.
like this:
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsIl9pZCI6IjYyMjA2ODFlNzg5ZGJiYmU3NzVkYjllZSIsImlhdCI6MTY0NjI5MjIwNSwiZXhwIjoxNjQ2Mjk5NDA1fQ.FWUUK0OvXs91Zo_tJy3xfrsaAaML2o64YI52BGcXLo0
```

------------


### products
- **Get all products**

Send GET request to /products

- **Create a new product**

Send POST request to /products and write below JSON into body request.


```json
{
    "name": "iPhone 13 pro max",
    "price": 1300
}
```

**NOTE:** you need also send valid token for Authorization request header.

- **Get one product by product ID**

Send GET request to /products/:productID

- **Update items a product by product ID**

Send PATCH request to /products/:productID and write below JSON into body request.

```json
[
    {
        "key": "price",
        "value": 1280
    }
]
```

**NOTE:** you need also send valid token for Authorization request header.

- **Delete product by product ID**

Send DELETE request to /products/:productID

**NOTE:** you need also send valid token for Authorization request header.

------------


### orders
- **Get all orders**

Send GET request to /orders

**NOTE:** you need also send valid token for Authorization request header.

- **Create a new order**

Send POST request to /orders and write below JSON into body request.

```json
{
    "productId": "621a0005b7568da942072ee5",
    "quantity": 8
}
```
**NOTE:** quantity default = 1


**NOTE:** you need also send valid token for Authorization request header.

- **Get one order by order ID**

Send GET request to /orders/:orderID

**NOTE:** you need also send valid token for Authorization request header.

- **Delete one order by order ID**

Send DELETE request to /orders/:orderID

**NOTE:** you need also send valid token for Authorization request header.

## License
[MIT](https://choosealicense.com/licenses/mit/)
