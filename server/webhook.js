// secret token for validating digest sent from GitHub
var secretToken = process.env.SIT_GITHUB_WEBHOOK_SECRET_TOKEN;

Router.route("/simple-issue-tracker", { where: "server" }).post(function () {
    var _headers = Meteor._ensure(this, "request", "headers")
        , _payload = Meteor._get(this, "request", "body")
        , ghSig = _headers["x-hub-signature"]
        , ghEvent = _headers["x-github-event"]
        , hash = "sha1="+CryptoJS.HmacSHA1(JSON.stringify(_payload), secretToken).toString()
        , response = this.response;

    // validate payload
    if (ghSig !== hash) {
        response.writeHead(401, "Authorization failed due to bad digest");
        response.end();
    }

    // process payload
    simpleIssueTracker.processPayload[ghEvent][_payload.action](_payload);

    response.writeHead(200);
    response.end();
});