//basic
import path from 'path';

import koa from 'koa';

//static file
import mount from 'koa-mount';
import serve from 'koa-static';

const app = koa();
const port = 3002;

const buildFile = serve(path.resolve(__dirname, '../build'));

app.use(mount('/build', buildFile));

app.use(function *(next) {
  let start = new Date();
  yield next;
  let ms = new Date - start;
  this.set('Cookie', ms + 'ms');
})

app.use(function *() {
  this.body = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Basic react starter</title>
      <link rel="stylesheet" href="/build/css/bootstrap.min.css">
    </head>
    <body>
    <div id="app"></div>
    <script src='/build/bundle.js'></script>
    </body>
  </html>
  `;
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
});
