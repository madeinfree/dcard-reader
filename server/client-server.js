// basic
import path from 'path';

import koa from 'koa';

// static file
import mount from 'koa-mount';
import serve from 'koa-static';

import dotenv from 'dotenv';
dotenv.config();

const app = koa();
const port = process.env.PORT || 3002;

const buildFile = serve(path.resolve(__dirname, '../build'));

app.use(mount('/build', buildFile));

app.use(function *(next) {
  const start = new Date();
  yield next;
  const ms = new Date - start;
  this.set('Cookie', `ms${ms}`);
});

app.use(function *() {
  this.body = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset='utf-8'>
      <meta property='og:image' content=''>
      <meta name='keywords' content='Dcard 熱門牆 | 全國最大的大學生網路社群平台，透過 Dcard 熱門牆，隨時隨地快速關注最熱門的話題。'>
      <meta name='description' content='Dcard 熱門牆，資料源自 Dcard 全國最大大學生網路平台，透過最簡單、簡潔的操作與畫面打造最快速的瀏覽環境，想直接看圖不看文章嗎？快點進來嘗試前所未有的瀏覽視覺。'>
      <meta name='author' content='madeinfree'>
      <meta name='og:title' content='Dcard 熱門牆 | 全國最大的大學生網路社群平台，透過 Dcard 熱門牆，隨時隨地快速關注最熱門的話題。'>
      <meta name='og:description' content='Dcard 熱門牆，資料源自 Dcard 全國最大大學生網路平台，透過最簡單、簡潔的操作與畫面打造最快速的瀏覽環境，想直接看圖不看文章嗎？快點進來嘗試前所未有的瀏覽視覺。'>
      <meta name='og:url content='http://dcard-reader.herokuapp.com/'>
      <meta name='og:type' content='website'>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Dcard 熱門牆</title>
      <link rel="stylesheet" type="text/css" href="/build/css/bootstrap.min.css">
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
    <div id="fb-root"></div>
    <div id="app"></div>
    <script type="text/javascript" src='/build/bundle.js'></script>
    <script>
      var config = {
        apiUrl: '${process.env.NODE_ENV}' === 'production' ? '${process.env.SERVER_URL}' : 'localhost:3002'
      }
    </script>
    <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '988187671265162',
          xfbml      : true,
          version    : 'v2.6'
        });
      };
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/zh_TW/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    </script>
  </html>
  `;
});

app.listen(port, () => {
  // console.log(`Listening on ${port}`);
});
