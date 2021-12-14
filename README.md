"# GCP-project" 
The goal of this project is to demonstrate how GCP can be used to run a web service.

The web service emulates an on-line service selling cinema tickets.
It allows customers to list cinema tickets on sale, authenticate, buy or return previously 
bought tickets. 

The web service is deployed to GCP as an App Engine service. It uses mongoDB Atlas to keep 
collections of registered users and cinema tickets. New users can register in the service 
to buy cinema tickets. The list of available cinema tickets, on the other hand, is static. 
Administartion capabilities of the service (ability to manage the list of cinema tickets) 
is out of scope of the project.

While deploying the service, terraform is used to create some resources on GCP.

The project uses the following technologies:
1. JavaScript
2. Node.js
3. express.js
4. mongoDB Atlas
5. terraform
6. GCP