Meteor.methods({
    "/sit/seed/issues": function () {
        if (!SIT_Issues.find().count()) {
            // make an initial pull from GitHub
            simpleIssueTracker.getOpenIssues(1);    
        }
    },
    "/sit/issues/new": function (issue) {
        check(issue, {title: String, body: String, context: { collection: String, entity: Object }});
        
        // build message
        var msg = {
            user: "myGHUser",
            repo: "myGHRepo",
            title: issue.title,
            body: issue.body
        };
        // submit issue
        simpleIssueTracker.async.issueCreate(msg, function (err, result) {
            if (result) {
                // add issue to Meteor collection if successful
                var _issue = _.extend({}, _.omit(result, "url", "labels_url", "comments_url", "events_url", "meta", "closed_by"));                
                if (_issue.id) {
                    _issue._id = _issue.id.toString();
                    _issue.user = simpleIssueTracker.getUserProps(_issue.user);
                    _issue.assignee = simpleIssueTracker.getUserProps(_issue.assignee);
                    _issue.context = issue.context;
                    return SIT_Issues.insert(_issue);
                }   
            } else {
                throw new Meteor.Error(500, "There was a problem creating the issue on GitHub.");
            }
        });
    }
});