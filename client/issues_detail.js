/*****************************************************************************/
/* SimpleIssueTrackerIssuesDetail: Event Handlers and Helpers .js */
/*****************************************************************************/
Template.SimpleIssueTrackerIssuesDetail.events({});

Template.SimpleIssueTrackerIssuesDetail.helpers({
    stateIcon: function () {
        return "open" === this.state && "fa fa-exclamation-circle" || "fa fa-check";
    }
});

/*****************************************************************************/
/* SimpleIssueTrackerIssuesDetail: Lifecycle Hooks */
/*****************************************************************************/
Template.SimpleIssueTrackerIssuesDetail.onCreated(function () {});

Template.SimpleIssueTrackerIssuesDetail.onRendered(function () {});

Template.SimpleIssueTrackerIssuesDetail.onDestroyed(function () {});