# API documentation OLX-Classified

**This repository contains API documentation for OLX-Classified**

1. **Overview**
   Basic API endpoint Deployed = `https://olx-classified.onrender.com/`\
   localhost = `http://localhost:8080`

- For running the server locally
  - npm install
  - npm run server
  - You need to create a .env file and insert the following fields:-
    `{
    mongoUrl : Url of the database you want to connect.
    secret_key: for token generation.
    port: to listen the server.
    }`

---

2. **Authentication**
   This API uses Role based Authorization.\
   In order to perform user any crud in app, Token is required.\
   Token can be obtained by creating account and logging into the system.\
   No separate login routes for users and admins.

---

3. **User Registration**\
    `URL: /signup`\
    **Method:** POST\
    **Parameters:**\
    `{
    name:String,(required)
    email:String(required)
    password:String,(required)
}`
   **Responses**\
    201 (Conflict): {"msg":"User-Email already Registered.."}\
    200 (OK):{"msg":"Registered Successfully"}\
    404 (Not Found): {"msg":"Error while registering the new user."}\

---

4. **Login**
   `URL: /login`
   **Method:** POST
   **Parameters:**
   `{
    email: string,
    password:string 
}`
   Responses
   200 (OK): {"msg":"Login Successful",token}\
    404 (Not Found): {"msg":"User not found.."}\
    404 (Not Found): {"msg" : "Wrong Credentials"}\

---
