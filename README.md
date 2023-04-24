# Colkie task by Gabriel Fialho

# Introduction

Welcome to my Colkie Backend Code Challenge solution! For this challenge, I was tasked with modeling an API for a chat room-like behavior. The API needed to have endpoints for creating a room, adding users to a room, sending messages to a room, and retrieving the latest messages from a room.

To complete the challenge, I created a service that exposes a REST API using some technologies, like: - Typescript - AWS - Serverless Framework - Jest - OpenAPI Documentation - Prisma

I also added automated tests to verify the correct behavior of the API and used a database to store the data.

In this README, I will describe the decisions I made throughout the development process, as well as explain the structure of my solution. I will also provide instructions for running the application and running the tests.

## I made a production ready code with RDS and CI/CD but I left commented since it has a cost per hour. To test this task you need to run the server locally using sls-offline

## AWS Serverless Lambda and RDS with Serverless Framework

For this challenge, I decided to use AWS Serverless Lambda and RDS with Serverless Framework to build my solution. Here's an overview of how I used these technologies:

## AWS Serverless Lambda

AWS Lambda is a serverless computing service provided by Amazon Web Services. It allows you to run your code without managing servers or infrastructure.

In my solution, I used AWS Lambda to handle the API requests. Whenever a user makes a request to one of the API endpoints, Lambda executes the corresponding function. I used the serverless-esbuild to compile the typescript code into javascript so that AWS Lambda can read it.

Using AWS Serverless Lambda allowed me to easily scale my application as needed, and pay only for the compute time that my code actually uses.

## AWS RDS

Amazon RDS (Relational Database Service) is a managed database service provided by Amazon Web Services. It allows you to set up, operate, and scale a relational database in the cloud.

In my solution, I used AWS RDS to store the data for the chat rooms, users, and messages. I created a PostgreSQL database instance using the RDS service, and connected my Lambda functions to it using Prisma.

Using AWS RDS allowed me to easily manage my database, and take advantage of the security and scalability features provided by AWS, and using Prisma allowed me to completely manage the database state.

## Serverless Framework

The Serverless Framework is an open-source framework for building serverless applications. It allows you to easily deploy and manage your serverless functions and infrastructure.

In my solution, I used the Serverless Framework to define and deploy my AWS Lambda functions, as well as the necessary AWS resources (such as the RDS database instance). I defined my application using YAML, which allowed me to easily version control my infrastructure.

Using Serverless Framework allowed me to streamline the deployment process, and easily manage my AWS resources from a single command line interface.

Overall, using AWS Serverless Lambda and RDS with Serverless Framework allowed me to build a scalable and cost-effective solution for this challenge.

## OpenAPI Documentation

OpenAPI is an open standard for describing APIs. It allows you to define the structure of your API, including endpoints, methods, parameters, and responses, using a YAML or JSON file.

In my solution, I used OpenAPI to document the structure of my API. I created a openapi.yml file that described the endpoints for creating a room, adding a user to a room, sending a message to a room, and retrieving the latest messages from a room. I also used the serverless-openapi-documentation plugin for Serverless Framework to automatically generate documentation for my API based on the documentation that is on `sls/documentation` folder.

Using OpenAPI documentation allowed me to provide a clear and consistent description of my API, making it easier for other developers to understand and use.

The url is in:https://app.swaggerhub.com/apis/GABRIELZZH_1/ColkieTask/1

## Jest Tests

Jest is a JavaScript testing framework that allows you to write tests for your code. It provides a simple and easy-to-use interface for writing and running tests.

In my solution, I used Jest to write tests for all of my Lambda functions. I created a tests directory that contained a test file for each Lambda function. Each test file included tests for the various scenarios that the function could encounter, such as creating a room, adding a user to a room, sending a message to a room, and retrieving the latest messages from a room.

Using Jest tests allowed me to ensure that my Lambda functions were working correctly, and catch any errors or issues before they could cause problems in production.

Overall, using OpenAPI documentation and Jest tests allowed me to build a well-documented and thoroughly tested solution for this challenge.

# How to Test?

- You can test using the OpenAPI documentation that is on: https://app.swaggerhub.com/apis/GABRIELZZH_1/ColkieTask/1

## Steps:

1.  You need to run `npm i`
2.  Run postgres database locally using docker-compose
3.  set DATABASE_URL in .env file and Run prisma migrations: `npx prisma migrate deploy`
4.  Start server locally with `sls offline`
5.  Start testing the endpoints (First you have to create an user and add the token you received in the Authorization header)
