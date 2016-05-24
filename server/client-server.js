//basic
import path from 'path';

import koa from 'koa';

//static file
import mount from 'koa-mount';
import serve from 'koa-static';

const app = koa();
var port = process.env.PORT || 3002;

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
      <title>Dcard 熱門好讀版</title>
      <link rel="stylesheet" href="/build/css/bootstrap.min.css">
      <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-77245773-2', 'auto');
        ga('send', 'pageview');

      </script>
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
