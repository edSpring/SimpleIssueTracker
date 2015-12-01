GitHubApi = Npm.require("github");
Fiber = Npm.require("fibers");

// GitHub personal access token for simple-issue-tracker user
var token = process.env.SIT_GITHUB_PERSONAL_ACCESS_TOKEN;

var _defaultOptions = {
    user: "myGHUser",
    repo: "myGHRepo",
    per_page: 100,
    page: 1
};

// instantiate new GitHubApi object
github = new GitHubApi({
    // required 
    version: "3.0.0",
    // optional 
    debug: false,
    protocol: "https",
    host: "api.github.com", 
    pathPrefix: "", 
    timeout: 5000,
    headers: {
        "user-agent": "simple-issue-tracker-app"
    }
});

// authenticate 
github.authenticate({
    type: "oauth",
    token: token
});

// initialize namespace
simpleIssueTracker = {
    async: {
        repoIssues: Meteor.wrapAsync(github.issues.repoIssues.bind(github.issues)),
        issueComments: Meteor.wrapAsync(github.issues.getComments.bind(github.issues)),
        issueCreate: Meteor.wrapAsync(github.issues.create.bind(github.issues))
    }
};

// add some utility methods
_.extend(simpleIssueTracker, {
    getUserProps: function (user) {
        return user && _.extend({}, _.pick(user, "login", "id", "avatar_url", "url")) || null;
    },
    getOpenIssues: function (page) {
        var _page = parseInt(page) || 1;
        var _added = 0;
        
        var options = _.extend({}, _defaultOptions, {
            state: "open"
        });
        
        simpleIssueTracker.async.repoIssues(options, function (err, result) {            
            result.forEach( function (i, index) {
                var _issueId = i.id.toString();
                if (!SIT_Issues.findOne({_id: _issueId})) {
                    SIT_Issues.insert(
                        _.extend(
                            {},
                            {_id: _issueId, user: simpleIssueTracker.getUserProps(i.user), assignee: simpleIssueTracker.getUserProps(i.assignee)},
                            _.omit(i, "url", "labels_url", "comments_url", "events_url", "user", "assignee")
                        )
                    );
                    _added = _added + 1;
                    simpleIssueTracker.getIssueComments(i.number, 1);
                }
            });
            
            if (github.hasNextPage(result)) {
                _page = _page + 1;
                simpleIssueTracker.getOpenIssues(_page);
            } else {
                console.log("*********************");
                console.log("Done grabbing open issues from GitHub");
                console.log("Added: " + _added + " new issues.");
                console.log("*********************");
            }
        });
    },
    getIssueComments: function (issueNumber, page) {
        if (!parseInt(issueNumber)) {
            return void(0);
        }
        var _page = parseInt(page) || 1;
        var _added = 0;

        var options = _.extend({}, _defaultOptions, {number: issueNumber, page: _page});

        simpleIssueTracker.async.issueComments(options, function (err, result) {
            result.forEach( function (i, index) {
                var _commentId = i.id.toString();
                if (!SIT_Comments.findOne({_id: _commentId})) {
                    SIT_Comments.insert(_.extend({}, {_id: _commentId, issueNumber: issueNumber, user: simpleIssueTracker.getUserProps(i.user)}, _.omit(i, "url", "issue_url", "user")));
                    _added = _added + 1;
                }
            });
            
            if (github.hasNextPage(result)) {
                _page = _page + 1;
                simpleIssueTracker.getIssueComments(issueNumber, _page);
            } else {
                console.log("*********************");
                console.log("Done grabbing comments for issue " + issueNumber + " from GitHub");
                console.log("Added: " + _added + " new comments.");
                console.log("*********************");
            }

        });
    }
});