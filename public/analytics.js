/* Basic consent mode: Google is not contacted until the visitor opts in. */
(() => {
  'use strict';
  const source = document.currentScript;
  const id = source?.dataset.measurementId;
  if (!id || location.origin !== source.dataset.siteOrigin) return;
  const key = `analytics-consent:${id}`;
  const ja = document.documentElement.lang === 'ja';
  const copy = ja ? {
    title: 'アクセス解析について',
    body: 'サイトの改善のため、Google Analyticsで閲覧状況やリンクのクリックを計測します。許可した場合のみ、Cookieを使ってGoogleにデータを送信します。',
    details: '詳しい説明', allow: '許可する', deny: '許可しない', close: '閉じる'
  } : {
    title: 'Analytics preferences',
    body: 'We use Google Analytics to measure visits and link clicks to improve this site. Cookies and data sharing with Google begin only if you allow analytics.',
    details: 'Privacy details', allow: 'Allow analytics', deny: 'Decline analytics', close: 'Close'
  };
  let choice = null;
  try { choice = localStorage.getItem(key); } catch { /* Consent can still be chosen for this visit. */ }
  let started = false;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  const ads = {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'};
  gtag('consent', 'default', {...ads, analytics_storage: 'denied'});
  window[`ga-disable-${id}`] = choice !== 'granted';
  function start() {
    window[`ga-disable-${id}`] = false;
    gtag('consent', 'update', {...ads, analytics_storage: 'granted'});
    if (started) return;
    started = true;
    gtag('js', new Date());
    gtag('config', id, {allow_google_signals: false, allow_ad_personalization_signals: false});
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.append(tag);
  }
  if (choice === 'granted') start();
  function mount() {
    const panel = document.createElement('section');
    panel.className = 'analytics-notice';
    panel.setAttribute('aria-label', copy.title);
    panel.hidden = true;
    const text = document.createElement('p');
    text.textContent = copy.body + ' ';
    const details = document.createElement('a');
    details.href = source.dataset.privacyUrl;
    details.textContent = copy.details;
    details.addEventListener('click', () => {
      if (details.getAttribute('href') === '#privacy') {
        const disclosure = document.getElementById('privacy');
        if (disclosure?.tagName === 'DETAILS') disclosure.open = true;
      }
    });
    text.append(details);
    panel.append(text);
    const actions = document.createElement('div');
    actions.className = 'analytics-actions';
    let opener = null;
    function hide() {
      panel.hidden = true;
      if (panel.contains(document.activeElement)) opener?.focus();
    }
    function choose(value) {
      choice = value;
      try { localStorage.setItem(key, value); } catch { /* No persistent storage available. */ }
      if (value === 'granted') start();
      else {
        window[`ga-disable-${id}`] = true;
        gtag('consent', 'update', {...ads, analytics_storage: 'denied'});
        // Remove this property's cookies on the current host and relevant paths.
        const names = ['_ga', `_ga_${id.slice(2)}`];
        const paths = ['/', new URL(source.dataset.siteOrigin + (source.dataset.cookiePath || '/')).pathname];
        for (const name of names) for (const path of paths) {
          document.cookie = `${name}=; Max-Age=0; path=${path}`;
          document.cookie = `${name}=; Max-Age=0; path=${path}; domain=${location.hostname}`;
        }
      }
      hide();
    }
    for (const [label, value] of [[copy.allow, 'granted'], [copy.deny, 'denied']]) {
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = label;
      button.addEventListener('click', () => choose(value));
      actions.append(button);
    }
    const close = document.createElement('button');
    close.type = 'button'; close.textContent = copy.close; close.hidden = choice === null;
    close.addEventListener('click', hide);
    actions.append(close); panel.append(actions); document.body.append(panel);
    document.querySelectorAll('[data-analytics-settings]').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', () => {
        opener = button; close.hidden = false; panel.hidden = false;
        actions.querySelector('button').focus();
      });
    });
    if (choice !== 'granted' && choice !== 'denied') panel.hidden = false;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once: true});
  else mount();
})();
