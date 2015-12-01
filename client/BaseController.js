SimpleIssueBaseController = RouteController.extend({
    layoutTemplate: "SimpleIssueTrackerLayout",
    loadingTemplate: "SimpleIssueTracker_Loading",
    data: function () {
        return {};
    },
    onRun: function () {
        $("body").addClass("simple-issue-tracker");
        this.next();
    },
    onRerun: function () {
        $("body").addClass("simple-issue-tracker");
        this.next();
    },
    onStop: function () {
        $("body").removeClass("simple-issue-tracker");
    }
});