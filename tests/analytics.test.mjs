import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const code = readFileSync(new URL('../public/analytics.js', import.meta.url), 'utf8');
function visit({saved = null, storageFails = false, origin = 'https://entangled-press.github.io'} = {}) {
  const elements = [];
  function element(tagName) {
    const node = {tagName: tagName.toUpperCase(), children: [], handlers: {}, hidden: false,
      append(...items) { this.children.push(...items); },
      setAttribute(key, value) { this[key] = value; },
      addEventListener(key, handler) { this.handlers[key] = handler; },
      querySelector(tag) { return this.children.find(x => x.tagName === tag.toUpperCase()); },
      contains(node) { return this.children.includes(node); }, focus() { document.activeElement = this; }};
    elements.push(node); return node;
  }
  const settings = element('button'); settings.hidden = true;
  const document = {currentScript: {dataset: {measurementId: 'G-VSD251Q9ZP', siteOrigin: 'https://entangled-press.github.io', privacyUrl: '/review/usage/#privacy'}},
    documentElement: {lang: 'ja'}, readyState: 'complete', cookie: '', createElement: element,
    head: element('head'), body: element('body'), querySelectorAll: () => [settings]};
  const localStorage = {getItem() { if (storageFails) throw Error('blocked'); return saved; }, setItem(key, value) { if (storageFails) throw Error('blocked'); saved = value; }};
  const window = {};
  vm.runInNewContext(code, {document, window, localStorage, location: {origin, hostname: 'entangled-press.github.io'}, URL});
  return {document, window, settings, saved: () => saved,
    panel: () => elements.find(x => x.className === 'analytics-notice'),
    click: label => elements.find(x => x.textContent === label).handlers.click()};
}
test('no Google tag before consent or after declining; accepted visits load it once', () => {
  const page = visit();
  assert.equal(page.document.head.children.length, 0);
  page.click('許可しない');
  assert.equal(page.document.head.children.length, 0);
  assert.equal(page.saved(), 'denied');
  page.settings.handlers.click();
  page.click('許可する');
  assert.equal(page.document.head.children.length, 1);
  page.settings.handlers.click(); page.click('許可する');
  assert.equal(page.document.head.children.length, 1);
  page.settings.handlers.click(); page.click('許可しない');
  assert.equal(page.window['ga-disable-G-VSD251Q9ZP'], true);
  assert.equal(page.saved(), 'denied');
  assert.equal(visit({saved: 'denied'}).document.head.children.length, 0);
  assert.equal(visit({saved: 'granted'}).document.head.children.length, 1);
});
test('blocked storage remains opt-in and localhost never collects', () => {
  const page = visit({storageFails: true});
  assert.equal(page.document.head.children.length, 0);
  page.click('許可する');
  assert.equal(page.document.head.children.length, 1);
  const local = visit({origin: 'http://localhost:4321', saved: 'granted'});
  assert.equal(local.document.head.children.length, 0);
  assert.equal(local.settings.hidden, true);
});
