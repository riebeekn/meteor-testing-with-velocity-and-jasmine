Package.describe({
  name: 'testing',
  version: '0.0.0',
  summary: 'Tools that help us testing the app',
  documentation: 'README.md',
  // Only available in development mode! (for security)
  debugOnly: true
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');
  api.use([
    'underscore',
    'mongo',
    'stevezhu:lodash@3.10.1',
  ], 'server');
  api.addFiles([
    'task-fixtures.js',
    'user-fixtures.js'
  ], 'server');
  api.addFiles([
    'test-user.js'
  ], 'client');

  api.export([
    'TestUser'
  ]);
});