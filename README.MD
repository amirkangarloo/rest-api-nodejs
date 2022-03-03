# Restful API Node.js
This project i build a restful API with node.
A simple shop API include user, products and orders routes.
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
Send POST request to /users/signup route. Write below JSON into body request.

```json
{
    "email": "testmail@gmail.com",
    "password": "test1234"
}
```
- **Login user**
Send POST request to /users/login route. Write below JSON into body request.

```json
{
    "email": "testmail@gmail.com",
    "password": "test1234"
}
```
- **Delete user acount**
Send DELETE request to /users/:userId route. 

**NOTE:** you can see the userId and token in the response /users/login route.
**NOTE:** you need also send valid token for Authorization request header.
like this:
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsIl9pZCI6IjYyMjA2ODFlNzg5ZGJiYmU3NzVkYjllZSIsImlhdCI6MTY0NjI5MjIwNSwiZXhwIjoxNjQ2Mjk5NDA1fQ.FWUUK0OvXs91Zo_tJy3xfrsaAaML2o64YI52BGcXLo0
```

------------


### products
- **Get all products**

- **Create a new product**

- **Get one product by product ID**

- **Update items a product by product ID**

- **Delete product by product ID**

------------


### orders
- **Create a new Order**

- **Get one order by order ID**

- **Delete one order by order ID**

## License
[MIT](https://choosealicense.com/licenses/mit/)