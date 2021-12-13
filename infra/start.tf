//resource "google_project" "my_project" {
//  name       = "My Project"
//  project_id = "your-project-id"
//}

resource "google_app_engine_application" "app" {
  project     = var.project_id
  location_id = var.region
}