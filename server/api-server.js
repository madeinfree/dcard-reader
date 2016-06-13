import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import koa from 'koa';
import Router from 'koa-router';
import cors from 'koa-cors';
import fetch from 'isomorphic-fetch';
const app = koa();

const port = process.env.PORT || 3001;

const router = new Router();

app.use(conditional());
app.use(etag());
app.use(cors());

let hotNews = null;
let forums = null;
const category = {};
const posts = {};
const comments = {};

router
  .get('/', function *() {
    this.body = 'Public Api Server';
  })
  .get('/api/news', function *() {
    if (hotNews === null) {
      const res = yield fetch('https://www.dcard.tw/_api/posts?popular=true&limit=100', {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const result = yield res.json();
      hotNews = result;
      this.body = result;
    }
    this.body = hotNews;
  })
  .get('/api/forums/', function *() {
    if (forums == null) {
      const res = yield fetch('https://www.dcard.tw/_api/forums/', {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const result = yield res.json();
      forums = result;
      this.body = result;
    }
    this.body = forums;
  })
  .get('/api/forums/:category', function *() {
    if (Object.keys(category).indexOf(this.params.category) === -1) {
      const res = yield fetch(`https://www.dcard.tw/_api/forums/${this.params.category}/posts?popular=true&limit=100`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const result = yield res.json();
      category[this.params.category] = result;
      this.body = result;
    }
    this.body = category[this.params.category];
  })
  .get('/api/post/:id', function *() {
    if (Object.keys(posts).indexOf(this.params.id) === -1) {
      const res = yield fetch(`https://www.dcard.tw/_api/posts/${this.params.id}?`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const result = yield res.json();
      posts[this.params.id] = result;
      this.body = result;
    }
    this.body = posts[this.params.id];
  })
  .get('/api/post/:id/comments', function *() {
    if (Object.keys(comments).indexOf(this.params.id) === -1) {
      const res = yield fetch(`https://www.dcard.tw/_api/posts/${this.params.id}/comments?limit=100`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const result = yield res.json();
      comments[this.params.id] = result;
      this.body = result;
    }
    this.body = comments[this.params.id];
  });

app.use(router.routes());

app.listen(port);
