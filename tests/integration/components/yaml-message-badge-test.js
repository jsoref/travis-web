import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | yaml-message-badge', function (hooks) {
  setupRenderingTest(hooks);

  test('it ignores info messages in the count', async function (assert) {
    this.set('messages', [{level: 'info'}, {level: 'error'}]);

    await render(hbs`<YamlMessageBadge @messages={{messages}} />`);

    assert.dom('.badge--yaml').exists();
    assert.dom('.count').hasText('1');
  });

  test('it has an error class if any errors exist', async function (assert) {
    this.set('messages', [{level: 'error'}, {level: 'warn'}]);

    await render(hbs`<YamlMessageBadge @messages={{messages}} />`);

    assert.dom('.badge--yaml').hasClass('level-error');
  });

  test('it has a warn class if no errors exist', async function (assert) {
    this.set('messages', [{level: 'info'}, {level: 'warn'}]);

    await render(hbs`<YamlMessageBadge @messages={{messages}} />`);

    assert.dom('.badge--yaml').hasClass('level-warn');
  });

  test('it renders no badge with no messages', async function (assert) {
    this.set('messages', []);

    await render(hbs`<YamlMessageBadge @messages={{messages}} />`);

    assert.dom('.badge--yaml').doesNotExist();
  });
});
