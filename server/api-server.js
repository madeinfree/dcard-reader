import koa from 'koa';
import Router from 'koa-router';
import cors from 'koa-cors';
import fetch from 'isomorphic-fetch';
const app = koa();

const port = process.env.PORT || 3001;

const router = new Router();

app.use(cors());

router
  .get('/', function *() {
    this.body = 'Public Api Server';
  })
  .get('/api/news', function *() {
    const res = yield fetch('https://www.dcard.tw/_api/posts?popular=true&limit=100', {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = yield res.json();
    this.body = result;
  })
  .get('/api/forums/', function *() {
    // this.headers = new Headers();
    // const cookie = this.headers.getAll("cookie").join(';');
    // const xsrfToken = this.headers.get("x-xsrf-token");
    const res = yield fetch('https://www.dcard.tw/_api/forums/', {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = yield res.json();
    this.body = result;
  })
  .get('/api/forums/:category', function *() {
    // this.headers = new Headers();
    // const cookie = this.headers.getAll("cookie").join(';');
    // const xsrfToken = this.headers.get("x-xsrf-token");
    const res = yield fetch(`https://www.dcard.tw/_api/forums/${this.params.category}/posts?popular=true&limit=100`, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = yield res.json();
    this.body = result;
  })
  .get('/api/post/:id', function *() {
    const res = yield fetch(`https://www.dcard.tw/_api/posts/${this.params.id}?`, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = yield res.json();
    this.body = result;
  });

app.use(router.routes());

app.listen(port);
