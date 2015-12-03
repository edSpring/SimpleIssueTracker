### Simple Issue Tracker Package
---
#### Initial Setup
1. Clone SimpleIssueTracker into your app's `/packages` directory.

2. Set up a [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) in GitHub.

3. Add personal access token to local environment variable `SIT_GITHUB_PERSONAL_ACCESS_TOKEN`.

4. Create a test repo if you don't have (or would rather not use) an existing one, and create a couple test issues.

5. Set up and test a GitHub [Webhook](https://developer.github.com/webhooks/creating/)

6. Secure your webhook with a secret token and add this to local environment variable `SIT_GITHUB_WEBHOOK_SECRET_TOKEN` 

7. Test your setup by running your app and calling the Meteor method `/sit/seed/issues` from the client. _If successful, you should see two new collections in your local mongodb (`sitIssues` and `sitComments`).


#### Challenge 1
Refactor the `getOpenIssues` to `getIssues` which would accept a set of optional parameters for filtering the request.
Resource:
- http://mikedeboer.github.io/node-github/#issues.prototype.repoIssues

#### Challenge 2
Create a `config` method that can be called when your app starts up that sets the `user`,`repo`, and any other defaults used by the package. _Similar to the `Accounts.config()` or `Accounts.ui.config()` methods._
Resource:
- http://docs.meteor.com/#/full/accounts_config
- http://docs.meteor.com/#/full/accounts_ui_config