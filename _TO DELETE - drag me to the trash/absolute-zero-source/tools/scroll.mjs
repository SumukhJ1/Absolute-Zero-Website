import { chromium } from "playwright";
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const DIST="/home/claude/az-site/dist", PORT=8199;
const MIME={".html":"text/html",".css":"text/css",".js":"text/javascript",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".woff2":"font/woff2",".woff":"font/woff"};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split("?")[0]);let f=path.join(DIST,p);if(p.endsWith("/"))f=path.join(f,"index.html");if(!fs.existsSync(f)){r.writeHead(404);return r.end()}r.writeHead(200,{"Content-Type":MIME[path.extname(f)]||"text/plain"});fs.createReadStream(f).pipe(r)}).listen(PORT);
const [url, ...ys] = process.argv.slice(2);
const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium-1194/chrome-linux/chrome"});
const c=await b.newContext({viewport:{width:1440,height:900}});
const pg=await c.newPage();
await pg.goto(`http://localhost:${PORT}${url}`,{waitUntil:"networkidle"});
await pg.waitForTimeout(500);
for (const y of ys){ await pg.evaluate(v=>window.scrollTo(0,v),Number(y)); await pg.waitForTimeout(900);
  await pg.screenshot({path:`/home/claude/az-site/shots/scroll_${y}.png`}); }
await b.close(); srv.close();
