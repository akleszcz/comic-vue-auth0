## `variables.tf`
- `domain` - tenant domain. This is a string in the form of
`YOUR-TENANT-NAME.[REGION_CODE.]auth0.com` where:
   - `YOUR-TENANT-NAME` - a name that you have chosen when you created your tenant;
   - `REGION_CODE` - optional region code that depends on the region you have chosen when creating your tenant. It has to be set to `eu` if you've chosen Europe and `au` for Australia. For US no region code is needed.

  You can find more details about auth0 domains [here](https://auth0.com/docs/getting-started/the-basics#domains).
- `client_id`, `client_secret` - id and secret of an application with access to the Auth0 Management API. You need only one application of this type per tenant. If you don't have it yet, you can create it as described [here](https://auth0.com/docs/api/management/v2/create-m2m-app).

  If you already have one, you can find it by going to [auth0 dashboard](https://manage.auth0.com/dashboard) -> Applications and finding an app of type 'MACHINE TO MACHINE' with Auth0 Management API authorized (you can find which APIs are authorized by going to application's settings -> APIs).

Sources:
- [Setting up Auth0 with Terraform](https://hceris.com/setting-up-auth0-with-terraform/)
- [Terragorm. Auth0 Provider](https://www.terraform.io/docs/providers/auth0/index.html)
- [Auth0 Docs. Learn the Basics
](https://auth0.com/docs/getting-started/the-basics)