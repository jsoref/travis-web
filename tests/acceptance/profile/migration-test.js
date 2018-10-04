import { module, test } from 'qunit';
import { visit, currentURL, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import signInUser from 'travis/tests/helpers/sign-in-user';
import { enableFeature } from 'ember-feature-flags/test-support';

module('Acceptance | profile/migration', function(hooks) {
  setupApplicationTest(hooks);

  test('viewing locked GitHub repositories with feature flag disabled', async function(assert) {
    enableFeature('github-apps');

    this.user = server.create('user', {
      allowMigration: false
    });

    this.lockedGithubAppsRepository = server.create('repository', {
      name: 'github-apps-locked-repository',
      owner: {
        login: this.user.login,
      },
      active: true,
      managed_by_installation: true,
      private: false,
      active_on_org: true
    });

    signInUser(this.user);

    await visit(`/profile/${this.user.login}`);

    await pauseTest();

    assert.equal(currentURL(), '/profile/testuser');
  });
});
