function getContrastYIQ(hexcolor){
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? '333333' : 'FFFFFF';
}

/*****************************************************************************/
/* SimpleIssueTracker_IssuesLabel: Event Handlers and Helpers .js */
/*****************************************************************************/
Template.SimpleIssueTracker_IssuesLabel.events({});

Template.SimpleIssueTracker_IssuesLabel.helpers({
    labelStyles: function () {
        return {class: "label label-default", style: "background-color: #"+this.color +"; color: #" + getContrastYIQ(this.color) + ";" };
    }
});

/*****************************************************************************/
/* SimpleIssueTracker_IssuesLabel: Lifecycle Hooks */
/*****************************************************************************/
Template.SimpleIssueTracker_IssuesLabel.onCreated(function () {});

Template.SimpleIssueTracker_IssuesLabel.onRendered(function () {});

Template.SimpleIssueTracker_IssuesLabel.onDestroyed(function () {});