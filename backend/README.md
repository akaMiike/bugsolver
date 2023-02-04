# Backend Documentation

## Technologies Used
* Java 11
* JUnit
* Spring Boot 2.7.6
* Flyway 9.10
* PostgreSQL database
* Java JWT for Authentication

## Functionalities

### Authentication
**Register a User**

To register a new user, it is necessary to send a POST request to `/user/register`, passing the **username**, **email** and **password** in the request body as JSON.

* The server returns the **id** of the user created, your **email** and **username**, with status 201 CREATED.
* Username must be unique.
* All fields are required, and the password must have at least 8 characters.
* The email field must have a valid email format.

**Login**

Most of the endpoints are protected by Spring Security, so you must login before to access them.
To login with the user created, send a POST request to `/user/login`, passing the **username** and **password** in the request body as JSON.

* If the credentials is correct, the server will return an **Bearer token**, a **Refresh token**, and the **Expiration Time** for both, with status 200 OK.
* If the password is incorrect, it will return status 400 BAD REQUEST
* If the username doesn't exists, it will return 404 NOT FOUND.

**Refresh Token**

After auth token expires, you need to login again or refresh your token. To refresh your token, send a POST request to `/auth/refrsh`, passing the expired Bearer Token and the Refresh Token, as shown below:

```
{
"bearerToken":"TOKEN_EXPIRED",
"refreshToken":"REFRESH_TOKEN"
}
```

* If the refresh token is expired, it will return 403 Forbidden.
* Otherwise, it will return a new **Bearer Token**, the same **Refresh Token**, and the **Expiration Time** for both, with status 200;

### User

**Get User by Id**

To get the user data by id, send a GET request to `/user/{id}`. You need to be authenticated and send the bearer token in the header.

* The server will return the **id**, **username** and **email** of the user, with status 200 OK.
* If the id was not from a valid user, it will return status 404 NOT FOUND.

**Get count of all users registered** 

To get the count of all users registered, send a GET request to `/user/`. You don't need to pass an authentication token in Header.

* It will return the count of all users registered, with status 200 OK.

### Bugs

**Count of all bugs Solved**

A bug is considered solved when it has an reply marked as best answer. To get the count, send a GET request to `/bug/solved`. You don't need to pass an authentication token in Header.

* It will return the count of all bugs solved, with status 200 OK.

**Get all bugs paginated**

To get all bugs paginated, send a GET request to `/bug?size=?&page=?&sort=?,?&categories=?,?&title=?`. You don't need to pass the authentication token in header.
* size: the size of the page
* page: Number of the page
* sort: Column to sort and order to sort in the format `column,order`. 
  * Columns available to sort: createdAt, title, description.
  * Order of the sort available: DESC, ASC.
* categories: One or more names of categories, comma separated. (Optional)
* title: A snippet of a bug title (Optional)
<br>

* It will return an [Page](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html) with the Bug content, its categories and the user owner, with status 200 OK.

**Get all bugs from user paginated**

To get all bugs from user paginated, send a GET request to `/bug/user?size=?&page=?&sort=?,?&categories=?,?&title=?`. You need to pass the authentication token in header.

* The explanation of the query parameters is the same as above

**Get bug by id**

To get a bug by id, send a GET request to `/bug/{id}`. You don't need to pass the authentication token in header.

*If the bug exists, the server will return the **id**, **title**, **description**, date when bug was created (**createdAt**), a list of **categories** and the **user info** who created the bug, as shown below:
```
{
"id":0,
"title":"title"
"description":"description"
"createdAt": "2023-01-01T00:00:000.527488-03:00",
"user":{
  "id":0,
  "username":"username",
  "email":"email
},
"categories":[
   {
    "id":0,
    "name":"name"
   }
]
}
```
* Otherwise, it will return 404 NOT FOUND.

**Create a new bug**

To create a new bug, send a POST request to `/bug`, passing a **title**, **description** and a list of **categories** with only the **id** field. You need to pass the authentication token in header.

* All fields are required, if all fields are correct, the server will return the created bug data, with status 201 CREATED.
* If any field is missing, the server will return 400 BAD REQUEST.

**Update bug by id**

To update a existent bug, send a PUT request to `/bug/{id}`,  passing the same fields as the previous request. You need to pass the authentication token in header.

* All fields are required, if all fields are correct, the server will return the created bug data, with status 201 CREATED.
* If any field is missing, the server will return 400 BAD REQUEST.

**Delete bug by id**

To delete a bug by id, send a DELETE request to `/bug/{id}`. You need to pass the authentication token in header.

* If the id exists, the bug will be deleted and the server will return status 200 OK.
* Otherwise, it will return 404 NOT FOUND.

### Reply

**Get all bug replies by bug id paginated**

To get all replies from a bug, send a GET request `/bug/{bugId}/reply?size=?&page=?&sort=?`. You don't need to pass the authentication token in header.

* The explanation of the query parameters is the same as the requests above.
* It will return an [Page](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html) with the reply **id**, **description**, created date of reply (**createdAt**), a boolean indicating if this reply is the bug best answer (**bestAnswer**) and the **User info** who replied, with status 200 OK.

**Create a new reply**

To create a new reply to a bug, send a POST request to `/bug/{bugId}/reply`, passing a description field in the request body. You need to pass the authentication token in header.

* If the bug id exists, the server will return the reply **id**, **description**, created date of reply (**createdAt**), a boolean indicating if this reply is the bug best answer (**bestAnswer**) and the **User** info who created.

**Update an reply as best answer**

To update a reply as best answer, send a PUT request to `/bug/{bugId}/reply/{replyId}`. You need to pass the authentication token in header.

* If the bug and reply id exists, and the bug author is the same as the user sending the request, it will set the reply best answer field to true and return status 200 OK.

### Category

**Get all categories**

To get all categories, send a GET request to `/category`. You don't need to pass the authentication token in header.

* It will return a list with the **id** and **name** of all the categories, with status 200 OK.

**Get category by id**

To get a category by id, send a GET request to `category/{id}`. You don't need to pass the authentication token in header.

* If the id exists, it will return the **id** and **name** of the category, with status 200 OK.
* Otherwise, it will return status 404 NOT FOUND. 

**Get category by name**

To get a category by id, send a GET request to `category/{name}`. You don't need to pass the authentication token in header.

* If a category with this name exists, it will return the **id** and **name** of the category, with status 200 OK.
* Otherwise, it will return status 404 NOT FOUND. 

**Create a new category**

To create a new category, send a POST request to `/category`, passing the name of category in the request body. You need to pass the authentication token in header.

* If the description is not empty, it will return the **id** and the **name** of the created category, with status 201 CREATED.
* Otherwise, it will return status 400 BAD REQUEST.

**Delete a category by id**

To delete a category by id, send a DELETE request to `/category`. You need to pass the authentication token in header.

* If the id exists, it will delete and return status 200 OK.
* Otherwise, it will return status 404 NOT FOUND.

**Update category by id**

To update a category by id, send a PUT request to `/category/{id}`, passing the updated name in request body. You need to pass the authentication token in header.

* If the id exists, it will update and return the updated category daata , with status 200 OK.
* Otherwise, it will return status 404 NOT FOUND.
