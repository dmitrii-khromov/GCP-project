:: Setting GCP project
call gcloud config set project <GCP project id>

:: Activating GCP API necessary for App Engine 
call gcloud services enable cloudbuild.googleapis.com
call gcloud services enable appengine.googleapis.com

:: Using terraform to create necessary resources
call terraform init
call terraform apply

:: Switching to server directory
cd ..\server

:: Adding Express as a dependency
call npm install express

:: Deploying server on GCP
call gcloud app deploy