# My API - Product Management and User Registration

This API provides endpoints for managing products and user registration. It is built using Node.js,Express.js and Mongodb with Mongoose.

## Products

### Get All Products
- **URL:** `/api/v1/products`
- **Method:** `GET`
- **Description:** Retrieve a list of all products.
- **Response:** JSON array of products.

### Get Product by ID
- **URL:** `/api/v1/products/:id`
- **Method:** `GET`
- **Description:** Retrieve a product by its unique ID.
- **Parameters:** `:id` (Product ID)
- **Response:** JSON object representing the product.

### Create a New Product
- **URL:** `/api/v1/products`
- **Method:** `POST`
- **Description:** Create a new product.
- **Request Body:** JSON object with product details.
- **Response:** JSON object of the newly created product.

### Update a Product
- **URL:** `/api/v1/products/:id`
- **Method:** `PUT`
- **Description:** Update an existing product by ID.
- **Parameters:** `:id` (Product ID)
- **Request Body:** JSON object with updated product details.
- **Response:** JSON object of the updated product.

### Delete a Product
- **URL:** `/api/v1/products/:id`
- **Method:** `DELETE`
- **Description:** Delete a product by its unique ID.
- **Parameters:** `:id` (Product ID)
- **Response:** JSON object confirming the deletion.

## User Registration

### Register a User
- **URL:** `/api/v1/users/signup`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:** JSON object with user registration details (e.g., username, email, password).
- **Response:** JSON object indicating successful registration.

### Login
- **URL:** `/api/v1/users/login`
- **Method:** `POST`
- **Description:** Authenticate a registered user.
- **Request Body:** JSON object with user login credentials (e.g., email and password).
- **Response:** JSON object with an authentication token.

### Get User Profile
- **URL:** `/api/v1/users/:id`
- **Method:** `GET`
- **Description:** Retrieve user profile information by user ID.
- **Parameters:** `:id` (User ID)
- **Response:** JSON object containing user profile details.

## Installation and Usage

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Use your favorite API testing tool (e.g., Postman) to interact with the API.


