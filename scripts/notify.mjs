const SITE = 'https://www.userhat.com';
const FEED_URL = `${SITE}/rss.xml`;
const INDEXNOW_KEY = '855164676e2caa889e35bfc674c18004';

async function pingWebSub() {
  const body = new URLSearchParams({
    'hub.mode': 'publish',
    'hub.url': FEED_URL,
  });

  const res = await fetch('https://pubsubhubbub.appspot.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  console.log(`WebSub: ${res.status} ${res.statusText}`);
}

async function pingIndexNow() {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: 'www.userhat.com',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
      urlList: [`${SITE}/sitemap-index.xml`],
    }),
  });

  console.log(`IndexNow: ${res.status} ${res.statusText}`);
}

console.log('Sending post-build notifications...');

await Promise.allSettled([pingWebSub(), pingIndexNow()]).then((results) => {
  for (const r of results) {
    if (r.status === 'rejected') {
      console.warn('Notification failed:', r.reason?.message ?? r.reason);
    }
  }
});

console.log('Done.');
