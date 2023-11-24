# Mongoose Express Typescript CRUD Applicaton
**Project Overview:** Developed a Node.js Express application with TypeScript as programming language In this Application, integrating Mongoose with MongoDB for user data and order management and using Zod for data validation ensuring data integrity through validation.

## Application Live Url

User and Order Management CRUD Applicaton Live Url:

```bash
https://mongoose-express-crud-amber.vercel.app
```

## User Management::

### 1. Create a new user

- Endpoint: **POST /api/users**
- Request Body: Schema is designed following the following data and data validation is done using ZOD.
- Response: Newly created User object. Ensures the password field is not included in the response data and is included in the database by Hash the password.

```json
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}
```

### 2. Retrieve a list of all users

- Endpoint: **GET /api/users**
- Response: List of user objects. Each object should only contain `username`, `fullName`, `age`, `email`, `address` . Apply suitable field filtering to exclusively retrieve the necessary information.
- Response: List of user objects. In each object only u`username`, `fullName`, `age`, `email`, `address` response. and applied project field filtering to retrieve data.

```json
{
    "success": true,
    "message": "Users fetched successfully!",
    "data": [
        {
            "username": "string",
            "fullName": {
                "firstName": "string",
                "lastName": "string"
            },
            "age": "number",
            "email": "string",
            "address": {
                "street": "string",
                "city": "string",
                "country": "string"
            }
        },
        // more objects...
    ]
}
```

### 3. Retrieve a specific user by ID

- Endpoint: **GET /api/users/:userId**

- Response: The user object and ensure that the password field is not included in the response data. A clear message is sent if no information about the user is found, an ero response is sent to determine if the user exists and ensures that the application does not crash.

```json
{
    "success": true,
    "message": "User fetched successfully!",
    "data": {
        "userId": "number",
        "username": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "age": "number",
        "email": "string",
        "isActive": "boolean",
        "hobbies": [
            "string",
            "string"
        ],
        "address": {
            "street": "string",
            "city": "string",
            "country": "string"
        }
    }
}
```

### 4. Update user information

- Endpoint: **PUT /api/users/:userId**

- Request Body: Updated user data (similar structure as in user creation).

- Response: The user object and ensure that the password field is not included in the response data. A clear message is sent if no information about the user is found, an ero response is sent to determine if the user exists and ensures that the application does not crash. ‍and the `static` method is implemented whether the user exists or not

```json
{
    "success": true,
    "message": "User updated successfully!",
    "data": {
        "userId": "number",
        "username": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "age": "number",
        "email": "string",
        "isActive": "boolean",
        "hobbies": [
            "string",
            "string"
        ],
        "address": {
            "street": "string",
            "city": "string",
            "country": "string"
        }
    }
}
```

### 5. Delete a user

- Endpoint: **DELETE /api/users/:userId**

- Response: A success message or, if you cannot find information about the user, a clear message is given. I used static methods to determine if the user exists or not.

```json
{
	"success": true,
	"message": "User deleted successfully!",
	"data" : null
}
```

## Order Management:

1. Add New Product in Order

- If the 'order' attribute already exists for a user, a new product will be added to it. Otherwise, if there is no order then an 'order' array will be created in the user object and then the order data will be added.

- Endpoint: **PUT /api/users/:userId/orders**

- Request Body: If information about the user is not found, a clean message is responded to.`Static` methods are used to display this error message.

```json
{
    "productName": "string",
    "price": "number",
    "quantity": "number"
}


### 2. Retrieve all orders for a specific user

- Endpoint: **GET /api/users/:userId/orders**

- Response: List the order object for the specified user or, if information about the user cannot be found, a clear message is given. I used static method to check if user exist or not and below response data will look like this.


```json
{
    "success": true,
    "message": "Order fetched successfully!",
    "data": {
        "orders": [
            {
                "productName": "Product 1",
                "price": 23.56,
                "quantity": 2
            },
            {
                "productName": "Product 2",
                "price": 23.56,
                "quantity": 5
            }
        ]
    }
}
```

### 3. **Calculate Total Price of Orders for a Specific User**

- Endpoint: **GET /api/users/:userId/orders/total-price**
- Response: The total value of all orders for the specified user or, if information about the user cannot be found, a clear message is given. Static methods are used to determine if the user exists

```json
{
    "success": true,
    "message": "Total price calculated successfully!",
    "data": {
        "totalPrice": 454.32
    }
}