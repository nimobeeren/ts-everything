const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();

app.use(serve(path.resolve(__dirname, 'dist')));

app.listen(3000);
