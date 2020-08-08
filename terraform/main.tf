provider "auth0" {
  domain        = var.domain
  client_id     = var.client_id
  client_secret = var.client_secret
}

resource "auth0_client" "comic_client" {
  name        = "Comic Client"
  description = "Comic Application - Terraform generated"
  app_type    = "spa"
  callbacks   = ["http://localhost:8081"]
  allowed_logout_urls = ["http://localhost:8081"]

  oidc_conformant = true

  jwt_configuration {
    alg = "RS256"
  }
}