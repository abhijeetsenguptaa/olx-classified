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

3. **User Registration**
    ### `URL: /signup`
    **Method:** POST\
    **Parameters:**\
    `{
    name:String,(required)
    email:String(required)
    password:String,(required)
}`\
    **Responses**\
    201 (Conflict): {"msg":"User-Email already Registered.."}\
    200 (OK):{"msg":"Registered Successfully"}\
    404 (Not Found): {"msg":"Error while registering the new user."}

---

4. **Login**
   ### `URL: /login`
   **Method:** POST\
   **Parameters:**\
   `{
    email: string,
    password:string 
}`\
    **Responses**\
    200 (OK): {"msg":"Login Successful",token}\
    404 (Not Found): {"msg":"User not found.."}\
    404 (Not Found): {"msg" : "Wrong Credentials"}

---

5. **Item Posting**
   ### `URL: /classified`
   **Method:** POST\
   **Parameters:**\
   `{
    userID : String,
    name: String,
    description: String,
    category: {
        type: String,
        enum: ["Clothing", "Electronics", "Furniture", "Other"]
    },
    image: String,
    location: String,
    postedAt: Date,
    price: Number
   }`\
   **Responses:**\
   200 (OK) : {msg: 'Your Item has been added to the OLX-Classified List.' }\
   404 (Not Found) : { msg: 'Error in adding a new item to the list.'}

---

6. **List of Items**
   ### `URL: /classified`
   **Method:** GET\
   **Responses**\
   200 (OK) : {data : List of the Items.}\
   404 (Not Found) : {msg: 'Error in fetching the data from the database.'}

---

7. **Specific Item with ID**
   ### `URL: /classified/:id`
   **Method:** GET\
   **Responses**\
   200 (OK) : {data : Item with the specific ID.}\
   404 (Not Found) : {msg: 'Error in fetching the data from the database.'}

---

8. **Updating Item with ID**
   ### `URL: /classified/:id`
   **Method:** PATCH\
   **Responses**\
   200 (OK) : {msg: Your Item With ID : $ {} has been updated.}\
   404 (Not Found) : {msg: 'Error in updating the data to the database.'}

---

9. **Deleting Item with ID**
   ### `URL: /classified/:id`
   **Method:** DELETE\
   **Responses**\
   200 (OK) : {msg: Your Item With ID : $ {} has been deleted.}\
   404 (Not Found) : {msg: 'Error in deleting the data from the database.'}

---

10. **Filtering the data on basis of category**
    ### `URL: /classified/filter/?category`
    **Method:** GET\
    **Responses**\
    200 (OK) : {msg: Result for `${category}`}\
    404 (Not Found) : {msg: 'Error in fetching the required category from the database.'}

---

11. **Sorting the data on basis of Date**
    ### `URL: /classified/sortAsc`
    ### `URL: /classified/sortDesc`
    **Method:** GET\
    **Responses**\
    200 (OK) : {data : Data on basis of sorting.}\
    404 (Not Found) : {msg: 'Error in fetching the required data from the database.'}
