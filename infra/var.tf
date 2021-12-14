variable "project_id" {
  type = string
  default = "<GCP project id>"
}

variable "region" {
  type = string
  default = "europe-west"
}

variable "credentials_path" {
  type = string
  default = "<A path to a service account key file>"
}