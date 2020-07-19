# Auth0 & Terraform
> Terraform is an orchestration tool in the IaC paradigm for managing, deploying, and scaling cloud infrastructure (IaC - infrastructure as code - the practice of managing infrastructure through configuration files). Terraform generates an execution plan describing what it will do to reach the desired state, and then executes it to build the described infrastructure. As the configuration changes, Terraform is able to determine what changed and create incremental execution plans which can be applied.
>
> With [Auth0 Provider](https://www.terraform.io/docs/providers/auth0/index.html), your Auth0 configurations can be managed entirely using Terraform. Rather than working through the UI, your Auth0 applications, APIs, and more can be created, updated, and managed through code and Terraform's CLI.
>
> For Terraform to be able to create Clients and APIs in Auth0, you'll need to manually create an Auth0 Machine-to-Machine Application that allows Terraform to communicate with Auth0.

Sources:
- [Introduction to Terraform](https://www.terraform.io/intro/index.html)
- [Use HashiCorp Terraform to Manage Your Auth0 Configuration](https://auth0.com/blog/use-terraform-to-manage-your-auth0-configuration/#Create-an-Auth0-client-using-HashiCorp-Terraform)

## `variables.tf`
- `domain` - tenant domain. This is a string in the form of
`YOUR-TENANT-NAME.[REGION_CODE.]auth0.com` where:
   - `YOUR-TENANT-NAME` - a name that you have chosen when you created your tenant;
   - `REGION_CODE` - optional region code that depends on the region you have chosen when creating your tenant. It has to be set to `eu` if you've chosen Europe and `au` for Australia. For US no region code is needed.

  You can find more details about auth0 domains [here](https://auth0.com/docs/getting-started/the-basics#domains).
- `client_id`, `client_secret` - id and secret of an application with access to the Auth0 Management API. You need only one application of this type per tenant. If you don't have it yet, you can create it as described [here](https://auth0.com/docs/api/management/v2/create-m2m-app).

  If you already have one, you can find it by going to [auth0 dashboard](https://manage.auth0.com/dashboard) -> Applications and finding an app of type 'MACHINE TO MACHINE' with Auth0 Management API authorized (you can find which APIs are authorized by going to application's settings -> APIs).

---
### Note: `variables.tf` vs `terraform.tfvars` files
The `variables.tf` file contains variables declarations and describes their types. It could also define their default values.
The `terraform.tfvars` file is used to populate variables with actual values. It is ignored by git in this repository, as it contains some sensitive information, but you can check its format in the `terraform.tfvars.template` file.

You can find more about defining variables [here](https://www.terraform.io/docs/configuration-0-11/variables.html).

---
## `main.tf`
- `provider "auth0"` 
- `resource "auth0_client"`:
   - `callbacks` - (Optional) List(String). URLs that Auth0 may call back to after a user authenticates for the client. Make sure to specify the protocol (https://) otherwise the callback may fail in some cases. With the exception of custom URI schemes for native clients, all callbacks should use protocol https://
   - `allowed_logout_urls` - (Optional) List(String). URLs that Auth0 may redirect to after logout.
   - `oidc_conformant` - (Optional) Boolean. Indicates whether or not this client will conform to strict OIDC specifications.
   - `jwt_configuration`:
      - `alg` - (Optional) String. Algorithm used to sign JWTs.

Sources:
- [Setting up Auth0 with Terraform](https://hceris.com/setting-up-auth0-with-terraform/)
- [Terraform. Auth0 Provider](https://www.terraform.io/docs/providers/auth0/index.html)
- [Terraform. auth0_client](https://www.terraform.io/docs/providers/auth0/r/client.html)
- [Auth0 Docs. Learn the Basics
](https://auth0.com/docs/getting-started/the-basics)

---
## Note
If you get the error:
```
Error: 401 Unauthorized: Invalid token
```
after running `terraform apply`, make sure that proper permissions (scopes) are granted to your auth0 management API - authorized application. In order to do that, log in to your [auth0 dashboard](https://manage.auth0.com/dashboard) and then go to Applications -> your auth0 management API - authorized application -> APIs -> Auth0 Management API -> Select which permissions (scopes) should be granted to this client. For example, if you want to create a new `auth0_client` resource, you need the `read:clients` and `create:clients` scopes. To update an existing one, you need the `read:clients` and `update:clients` scopes.

---