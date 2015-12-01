var _selectedItem = new ReactiveVar({});

/*****************************************************************************/
/* SimpleIssueTracker_ReportBug: Event Handlers and Helpers .js */
/*****************************************************************************/
Template.SimpleIssueTracker_ReportBug.events({
    'click .report-bug': function (e, tmpl) {
        e.preventDefault();
        _selectedItem.set(this);
        $("#reportBugModal").modal("show");
    }
});

Template.SimpleIssueTracker_ReportBug.helpers({});

/*****************************************************************************/
/* SimpleIssueTracker_ReportBug: Lifecycle Hooks */
/*****************************************************************************/
Template.SimpleIssueTracker_ReportBug.onCreated(function () {});

Template.SimpleIssueTracker_ReportBug.onRendered(function () {
    $("#reportBugModal").on("shown.bs.modal", function (e) {
        $("input[name=title]").focus();
    }).on("hidden.bs.modal", function (e) {
        $("#newIssue")[0].reset();
    });
});

Template.SimpleIssueTracker_ReportBug.onDestroyed(function () {
    _selectedItem = null;
});


/*****************************************************************************/
/* SimpleIssueTracker_ReportBugModal: Event Handlers and Helpers .js */
/*****************************************************************************/
Template.SimpleIssueTracker_ReportBugModal.events({
    'submit #newIssue': function (e, tmpl) {
        e.preventDefault();
        var _title = $("input[name=title]").val().replace(/^\s*|\s*$/g, "")
            , _description = $("textarea[name=description]").val().replace(/^\s*|\s*$/g, "")
            , _item = _selectedItem.get() || null;
        
        if (_item) {
            _item = _.pick(_item, "collection", "entity");
        }

        if (_title && _description) {
            Meteor.call("/sit/issues/new", { title: _title, body: _description, context: _item }, function (err, result) {
                if (!err) {
                    console.log(result);
                    $("#reportBugModal").modal("hide");
                }
            });
        }
    }
});

Template.SimpleIssueTracker_ReportBugModal.helpers({
    title: function () {
        var _item = _selectedItem.get() || {};
        return _item.title;
    }
});

/*****************************************************************************/
/* SimpleIssueTracker_ReportBugModal: Lifecycle Hooks */
/*****************************************************************************/
Template.SimpleIssueTracker_ReportBugModal.onCreated(function () {});

Template.SimpleIssueTracker_ReportBugModal.onRendered(function () {});

Template.SimpleIssueTracker_ReportBugModal.onDestroyed(function () {});