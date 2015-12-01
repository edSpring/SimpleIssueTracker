Package.describe({
  name: 'fletcher:simple-issue-tracker',
  version: '0.1.0',
  summary: 'Connect to Github repo and provide simplified issue tracking.'
});

Package.onUse(function (api) {
  var both = ['server', 'client'];
  var server = 'server';
  var client = 'client';

  api.use(['mongo', 'iron:router', 'underscore','momentjs:moment'], both);
  api.use(['http', 'jparker:crypto-hmac', 'jparker:crypto-sha1', 'reywood:publish-composite'], server);
  api.use(['templating', 'markdown', 'reactive-var'], client);

  api.addFiles([
    'both/collections.js',
    'both/routes.js'
  ], both);

  api.addFiles([
    'server/main.js',
    'server/process_payload.js',
    'server/publish.js',
    'server/methods.js',
    'server/webhook.js'
  ], server);

  api.addFiles([
    'client/styles.css',
    'client/template_helpers.js',
    'client/common_templates.html',
    'client/BaseController.js',
    'client/IssuesIndexController.js',
    'client/IssuesDetailController.js',
    'client/_issues_label.html',
    'client/_issues_label.js',
    'client/_report_bug.html',
    'client/_report_bug.js',
    'client/issues_index.html',
    'client/issues_index.js',
    'client/issues_detail.html',
    'client/issues_detail.js'
  ], client);
  
  // Collections
  api.export(['SIT_Issues', 'SIT_Comments'], both);
  
  // Server objects - probably don't need to export these
  // api.export('GitHubApi', server);
  // api.export('github', server);
  api.export('simpleIssueTracker', server);
  
  // View Controllers
  api.export([
    'SimpleIssueTrackerBaseController',
    'SimpleIssueTrackerIssuesIndexController',
    'SimpleIssueTrackerIssuesDetailController'
  ], client);
});

Package.onTest(function (api) {
  api.use('fletcher:simple-issue-tracker');
  api.use('tinytest');
  
  api.addFiles('simple_issue_tracker_tests.js');
});

Npm.depends({
    'github': '0.2.4'
});