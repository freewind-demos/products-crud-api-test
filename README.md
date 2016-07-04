End to end test for Products-CRUD-Api
=====================================

These are some end-to-end tests for [Products Crud Api](https://github.com/js-demos/products-crud-api/), using [mocha](https://mochajs.org) and [chakram](http://dareid.github.io/chakram/)

```
npm install -g mocha
npm install
```

Run Tests:

```
mocha test/*.js
```

We can also pass some args:

```
env port=8081 baseResourse=items mocha test/*.js
```