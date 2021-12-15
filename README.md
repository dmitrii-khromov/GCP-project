"# GCP-project" 
The goal of this project is to demonstrate how GCP can be used to run a web service.

The web service emulates an on-line service selling cinema tickets.
It allows customers to list cinema tickets on sale, authenticate, buy or return previously 
bought tickets. 

The web service is deployed to GCP as an App Engine service. It uses mongoDB Atlas to keep 
collections of registered users and cinema tickets. New users can register in the service 
to buy cinema tickets. The list of available cinema tickets, on the other hand, is static. 
Administration capabilities of the service (ability to manage the list of cinema tickets) 
is out of scope of the project.

While deploying the service, terraform is used to create some resources on GCP.

How to deploy:
1. Prerequisites. The deployment routine assumes that you have a GCP project and a service 
account created and a key file for that account downloaded.
2. Clone the project from the git repo.
3. Change placeholders (text in <...>) in a terraform file var.tf and in deploy.bat with 
appropriate values (GCP project id and relative path to a service account key file).
4. Create and add file env_variables.yaml to the server folder of the project. This file 
should store sensitive data passed to deployed server via environment variables. The file 
content should look like:
    env_variables:
        JWT_SECRET: '<.secret to use for token generation.>'
        MONGO_DB_PATH: '<.mongoDB Atlas connection string.>'
5. Run deploy.bat in gcloud console.

The project uses the following technologies:
1. JavaScript
2. Node.js
3. express.js
4. mongoDB Atlas
5. terraform
6. GCP