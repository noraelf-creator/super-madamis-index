// 改訂フォルダ（作業の正本）から content/ へMarkdownを写す。content/ がサイトの元データ。
// 使い方: node tools/sync-content.mjs
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'C:/00_【創作】一時フォルダ/_マダミス改訂_20261004/超マダミスガールズX';
const V08 = 'C:/00_【創作】一時フォルダ/超マダミスガールズX_HTML';
const HAR = 'C:/00_【創作】一時フォルダ/超マダミスガールズX_HARNESS/超マダミスガールズX_REMAKE/99_PROJECT_STATUS';
const DST = path.resolve('content/改訂版');
const REF = path.resolve('content/参照');
const copies = [
  ['PROJECT_MASTER.md', 'PROJECT_MASTER.md'],
  ['REPORT.md', 'REPORT.md'],
  ['CHANGELOG.md', 'CHANGELOG.md'],
  ['00_INVENTORY.md', '00_INVENTORY.md'],
  ['01_正本', '01_正本'],
  ['02_チェック', '02_チェック'],
  ['03_改稿/GM進行ガイド.md', '03_改稿/GM進行ガイド.md'],
  ['03_改稿/HO', '03_改稿/HO'],
  ['03_改稿/読み合わせ', '03_改稿/読み合わせ'],
  ['03_改稿/カード', '03_改稿/カード'],
  ['03_改稿/回答用紙', '03_改稿/回答用紙'],
  ['05_完成版/GM資料/配布物一覧と配布タイミング.md', '05_完成版/配布物一覧と配布タイミング.md'],
  ['04_仮想プレイ', '04_仮想プレイ'],
];
// 参照：改訂元（v0.8）の引継ぎと、作者の未決定事項
const refs = [
  [path.join(V08, 'AI_HANDOFF.md'), 'v0.8_AI_HANDOFF.md'],
  [path.join(V08, 'CHANGELOG.md'), 'v0.8までのCHANGELOG.md'],
  [path.join(HAR, 'NEEDS_USER_DECISION.md'), 'v0.8_作者の未決定事項.md'],
];
function copy(from, to) {
  const st = fs.statSync(from);
  if (st.isDirectory()) {
    for (const f of fs.readdirSync(from)) copy(path.join(from, f), path.join(to, f));
  } else if (/\.(md|txt)$/.test(from)) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.writeFileSync(to.replace(/\.txt$/, '.md'), fs.readFileSync(from, 'utf8').replace(/\r\n/g, '\n'));
  }
}
fs.rmSync(DST, { recursive: true, force: true });
fs.rmSync(REF, { recursive: true, force: true });
for (const [a, b] of copies) copy(path.join(SRC, a), path.join(DST, b));
for (const [a, b] of refs) copy(a, path.join(REF, b));
let n = 0; (function count(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? count(p) : n++; } })(path.resolve('content'));
console.log('content files:', n);
