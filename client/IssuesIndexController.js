SimpleIssueTrackerIssuesIndexController = SimpleIssueBaseController.extend({
    waitOn: function () {
        return Meteor.subscribe("simpleIssues");
    },
    data: function () {
        return {
            issues: SIT_Issues.find({"labels.name":"Math"}, {sort: {created_at: -1}})
        };
    }
});