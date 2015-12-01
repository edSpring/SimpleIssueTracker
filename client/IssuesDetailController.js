SimpleIssueTrackerIssuesDetailController = SimpleIssueBaseController.extend({
    waitOn: function () {
        return Meteor.subscribe("simpleIssuesDetail", this.params._id);
    },
    data: function () {
        var _issue = SIT_Issues.findOne({_id: this.params._id}) || {};
        var _comments = SIT_Comments.find({issueNumber: _issue.number}).fetch() || [];
        
        if (!_issue.body) {
            _issue.body = "No description available.";
        }
        _issue.commentCount = _issue.comments;

        return _.extend({}, _issue, {comments: _comments});
    }
});