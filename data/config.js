// 公開してよい設定だけを書く。作者キーやその他の秘密はここに書かない。
window.SITE_CONFIG = {
  siteTitle: '超マダミスガールズX',
  siteSub: '制作INDEX・改訂版',
  projectId: 'super_madamis_x',
  // 修正案の共有保存先（この作品専用のWorker。ソースは cloudflare/）
  memoApi: 'https://super-madamis-sync.noraelf-mta-review.workers.dev',
  // 改訂版のページのメモは page_id の先頭にこれを付けて保存する
  pagePrefix: 'rv1-',
  // 端末内の保存領域の名前（他作品のINDEXと混ざらないように）
  storagePrefix: 'smx-rv1:',
  legacySessionKey: '',
  v2Url: ''
};
