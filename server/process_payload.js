if ('undefined' === typeof simpleIssueTracker.processPayload) {
    simpleIssueTracker.processPayload = {};
}

// Process payload from GitHub webhook
_.extend(simpleIssueTracker.processPayload, {
    'issues': {
        opened: function (payload) {
            var _issue = simpleIssueTracker.processPayload.extract.issue(payload);
            if (_issue._id && !SIT_Issues.find({_id: _issue._id}).count()) {
                return SIT_Issues.insert(_issue);
            }
        },
        closed: function (payload) {
            var _issue = simpleIssueTracker.processPayload.extract.issue(payload);
            var _modifier = simpleIssueTracker.processPayload.extract.updateIssueStateModifier(payload);
            return !_.isEmpty(_modifier) && SIT_Issues.update({_id: _issue._id}, {$set: _modifier});
        },
        reopened: function (payload) {
            var _issue = simpleIssueTracker.processPayload.extract.issue(payload);
            var _modifier = simpleIssueTracker.processPayload.extract.updateIssueStateModifier(payload);
            return !_.isEmpty(_modifier) && SIT_Issues.update({_id: _issue._id}, {$set: _modifier});
        },
        assigned: function (payload) {
            var _issue = simpleIssueTracker.processPayload.extract.issue(payload);
            var _modifier = simpleIssueTracker.processPayload.extract.updateIssueAssignedModifier(payload);
            return !_.isEmpty(_modifier) && SIT_Issues.update({_id: _issue._id}, {$set: _modifier});
        },
        unassigned: function (payload) {
            var _issue = simpleIssueTracker.processPayload.extract.issue(payload);
            var _modifier = simpleIssueTracker.processPayload.extract.updateIssueAssignedModifier(payload);
            return !_.isEmpty(_modifier) && SIT_Issues.update({_id: _issue._id}, {$set: _modifier});
        },
        labeled: function (payload) {
            var _issue = simpleIssueTracker.processPayload.extract.issue(payload);
            var _modifier = simpleIssueTracker.processPayload.extract.updateIssueLabelsModifier(payload);
            return !_.isEmpty(_modifier) && SIT_Issues.update({_id: _issue._id}, {$set: _modifier});
        },
        unlabeled: function (payload) {
            var _issue = simpleIssueTracker.processPayload.extract.issue(payload);
            var _modifier = simpleIssueTracker.processPayload.extract.updateIssueLabelsModifier(payload);
            return !_.isEmpty(_modifier) && SIT_Issues.update({_id: _issue._id}, {$set: _modifier});
        }
    },
    'issue_comment': {
        created: function (payload) {
            var _issue = simpleIssueTracker.processPayload.extract.issue(payload);
            var _issueModifier = simpleIssueTracker.processPayload.extract.updateIssueCommentsModifier(payload);
            var _comment = simpleIssueTracker.processPayload.extract.comment(payload);
            if (_comment._id && !SIT_Comments.find({_id: _comment._id}).count()) {
                _comment.issueNumber = _issue.number;
                SIT_Comments.insert(_comment);
            }
            return SIT_Issues.update({_id: _issue._id}, {$set: _issueModifier});
        }
    },
    'extract': {
        issue: function (payload) {
            var _issue = _.extend({}, _.omit(payload.issue, "url", "labels_url", "comments_url", "events_url"));
            if (_issue.id) {
                _issue._id = _issue.id.toString();
                _issue.user = simpleIssueTracker.getUserProps(_issue.user);
                _issue.assignee = simpleIssueTracker.getUserProps(_issue.assignee);
            }
            return _issue;
        },
        comment: function (payload) {
            var _comment = _.extend({}, _.omit(payload.comment, "url", "issue_url"));
            if (_comment.id) {
                _comment._id = _comment.id.toString();
                _comment.user = simpleIssueTracker.getUserProps(_comment.user);
            }
            return _comment;
        },
        updateIssueStateModifier: function (payload) {
            return _.extend({}, _.pick(payload.issue, "state", "updated_at", "closed_at"));
        },
        updateIssueAssignedModifier: function (payload) {
            var _mod = _.extend({}, _.pick(payload.issue, "assignee", "updated_at"));
            if (_mod.assignee) {
                _mod.assignee = simpleIssueTracker.getUserProps(_mod.assignee);
            }
            return _mod;
        },
        updateIssueLabelsModifier: function (payload) {
            return _.extend({}, _.pick(payload.issue, "labels", "updated_at"));
        },
         updateIssueCommentsModifier: function (payload) {
            return _.extend({}, _.pick(payload.issue, "comments", "updated_at"));
         }
    }
});