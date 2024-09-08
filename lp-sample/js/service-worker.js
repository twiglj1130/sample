const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    // '/', // ホームページのルート
    // '/plus-feel_lp.html', // プラスフィールLPのHTMLファイル  例'https://fue-cr.com/page-lp/',
    '/non-critical.css', // LPのCSSファイル
    '/js/plus-feel.js', // メインのJavaScriptファイル
    // その他キャッシュしたいリソースをここに追加
];

// インストールイベント
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// フェッチイベント
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// アクティベートイベントで古いキャッシュを削除
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});