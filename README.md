# Bugsolver
Bugsolver is fictional Website, inspired in StackOverFlow, focused in refactoring and bug solving, where you can share your doubts, or help others. It is my first fullstack project, made with Angular and Spring Boot.

## Documentation

You can find frontend documentation on the frontend directory, or click **[here](https://github.com/akaMiike/bugsolver/tree/main/frontend)**.

And the backend documentation on the backend directory, or click **[here](https://github.com/akaMiike/bugsolver/tree/main/backend)**.


## How to Run
You can run the application locally using Docker Compose. For that, you need to clone the project.
Then, enter in the project directory and run:

`docker-compose build`

And after that, run:

`docker-compose up -d`

The application will be available in `http://localhost:4200`

## Exploring the Website

The website is currently hosted on AWS with the Spring Boot server on EC2, the PostgreSQL database on RDS, and the Angular application on S3.
You can access it **[here](http://bugsolver.s3-website-sa-east-1.amazonaws.com/)**. (Currently unavailable).
