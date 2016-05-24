import koa from 'koa';
import Router from 'koa-router';
import cors from 'koa-cors';
import fetch from 'isomorphic-fetch';
var app = koa();

var port = process.env.PORT || 3001;

const router = new Router();

app.use(cors());

router
  .get('/', function *(next) {
    this.body = 'Public Api Server';
  })
  .get(`/api/news`, function *(next) {
    let res = yield fetch(`https://www.dcard.tw/_api/posts?popular=true&limit=100` ,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    let result = yield res.json();
    this.body = result;
  })
  .get('/api/forums/', function *(next) {
    // this.headers = new Headers();
    // const cookie = this.headers.getAll("cookie").join(';');
    // const xsrfToken = this.headers.get("x-xsrf-token");
    let res = yield fetch(`https://www.dcard.tw/_api/forums/` ,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    let result = yield res.json();
    this.body = result;
  })
  .get('/api/forums/:category', function *(next) {
    // this.headers = new Headers();
    // const cookie = this.headers.getAll("cookie").join(';');
    // const xsrfToken = this.headers.get("x-xsrf-token");
    let res = yield fetch(`https://www.dcard.tw/_api/forums/${this.params.category}/posts?popular=true&limit=100` ,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    let result = yield res.json();
    this.body = result;
  })
  .get('/api/post/:id', function *(next) {
    let res = yield fetch(`https://www.dcard.tw/_api/posts/${this.params.id}?` ,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    let result = yield res.json();
    this.body = result;
  })

app.use(router.routes());

app.listen(port);
