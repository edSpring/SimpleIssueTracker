Meteor.publish("simpleIssues", function () {
    if (!this.userId) { return this.ready(); }
    return SIT_Issues.find();
});

Meteor.publishComposite("simpleIssuesDetail", function (issueId) {
    if (!this.userId || !issueId) { return this.ready(); }

    return {
        find: function () {
            return SIT_Issues.find({ _id: issueId });
        },
        children: [
            {
                find: function (issue) {
                    return SIT_Comments.find({ issueNumber: issue.number });
                }
            }
        ]
    };
});