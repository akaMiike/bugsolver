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

**Get all bugs per page**

To get all bugs per page, send a GET request to `/bug?size=?&page=?&sort=?,?&categories=?,?&title=?`. You don't need to pass the authentication token in header.
* size: the size of the page
* page: Number of the page
* sort: Column to sort and order to sort in the format `column,order`. 
  * Columns available to sort: createdAt, title, description.
  * Order of the sort available: DESC, ASC.
* categories: One or more names of categories, comma separated. (Optional)
* title: A snippet of a bug title (Optional)
<br>

* It will return an [Page](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html) with the Bug content, its categories and the user owner, with status 200 OK.

**Get all bugs from user per page**

To get all bugs from user per page, send a GET request to `/bug/user?size=?&page=?&sort=?,?&categories=?,?&title=?`. You need to pass the authentication token in header.

* The explanation of the query parameters is the same as above
