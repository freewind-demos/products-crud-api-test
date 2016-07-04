let chakram = require('chakram');
let expect = chakram.expect;

let port = process.env.port || 3000;
let baseResourse = process.env.baseResourse || 'products';
let basePath = `http://localhost:${port}/${baseResourse}`;

describe('Test products-crud-api', function() {

  it('will get empty at first', function() {
    let res = chakram.get(basePath);
    expect(res).to.have.status(200);
    expect(res).to.have.json([]);
    return chakram.wait();
  });

  it('will insert a product and get the generated id', function() {
    let res = chakram.post(basePath, {
      "name":"Apple",
      "unit": "个", 
      "price": 3.4, 
      "barcode": "23232"
    });
    expect(res).to.have.status(201);
    expect(res).to.have.json({
      "id":1,
      "name":"Apple",
      "unit": "个", 
      "price": 3.4, 
      "barcode": "23232"
    });
    return chakram.wait();
  });

  it('will get an increased id when inserting product', function() {
    let res = chakram.post(basePath, {
      "name":"Apple",
      "unit": "个", 
      "price": 3.4, 
      "barcode": "23232"
    });
    expect(res).to.have.status(201);
    expect(res).to.have.json({
      "id":2,
      "name":"Apple",
      "unit": "个", 
      "price": 3.4, 
      "barcode": "23232"
    });
    return chakram.wait();
  });

  it('will get 2 products now', function() {
    let res = chakram.get(basePath);
    expect(res).to.have.status(200);
    expect(res).to.have.json([{"id":1,"barcode":"23232","name":"Apple","unit":"个","price":3.4},{"id":2,"barcode":"23232","name":"Apple","unit":"个","price":3.4}]);
    return chakram.wait();
  });

  it('will find an existent product', function() {
    let res = chakram.get(`${basePath}/1`);
    expect(res).to.have.status(200);
    expect(res).to.have.json({"id":1,"barcode":"23232","name":"Apple","unit":"个","price":3.4});
    return chakram.wait();
  });

  it('gets 204 when deleting an existent product successfully', function() {
    let res = chakram.delete(`${basePath}/2`);
    expect(res).to.have.status(204);
    return chakram.wait();
  });

  // =======================
  // from now on,
  // `1` exist
  // `2` deleted

  it('will not found the deleted product', function() {
    let res = chakram.get(`${basePath}/2`);
    expect(res).to.have.status(404);
    return chakram.wait();
  });

  it('cannot delete an non-existent product', function() {
    let res = chakram.delete(`${basePath}/2`);
    expect(res).to.have.status(404);
    return chakram.wait();
  });

  it('will update an existent product', function() {
    let res = chakram.put(`${basePath}/1`, {
      "name":"Orange", 
      "unit": "个", 
      "price": 5.5, 
      "barcode": "sdfsdfsf"});
    expect(res).to.have.status(200);
    expect(res).to.have.json({
      "id":1,
      "name":"Orange", 
      "unit": "个", 
      "price": 5.5, 
      "barcode": "sdfsdfsf"});
    return chakram.wait();
  });

  it('cannot update an non-existent product', function() {
    let res = chakram.put(`${basePath}/2`, {
      "name":"Orange", 
      "unit": "个", 
      "price": 5.5, 
      "barcode": "sdfsdfsf"});
    expect(res).to.have.status(404);
    return chakram.wait();
  });

  it('is a bad request if missing required fields when updating', function() {
    let res = chakram.put(`${basePath}/1`, {
      // "name":"Orange", 
      "unit": "个", 
      "price": 5.5, 
      "barcode": "sdfsdfsf"});
    expect(res).to.have.status(400);
    return chakram.wait();
  });

  it('is a bad request if has invalid type when updating', function() {
    let res = chakram.put(`${basePath}/1`, {
      "name":"Orange", 
      "unit": "个", 
      "price": "abc", // invalid type
      "barcode": "sdfsdfsf"});
    expect(res).to.have.status(400);
    return chakram.wait();
  });

  it('generates unused new id when inserting product', function() {
    let res = chakram.post(basePath, {
      "name":"Apple",
      "unit": "个", 
      "price": 3.4, 
      "barcode": "23232"
    });
    expect(res).to.have.status(201);
    expect(res).to.have.json({
      "id":3,
      "name":"Apple",
      "unit": "个", 
      "price": 3.4, 
      "barcode": "23232"
    });
    return chakram.wait();
  });

  it('is a bad request if required fields missing when inserting a product', function() {
    let res = chakram.post(basePath, {
      // "name":"Apple",
      "unit": "个", 
      "price": 3.4, 
      "barcode": "23232"
    });
    expect(res).to.have.status(400);
    return chakram.wait();
  });

  it('is a bad request if required fields missing when inserting a product', function() {
    let res = chakram.post(basePath, {
      "name":"Apple",
      "unit": "个", 
      "price": "abc", // invalid type
      "barcode": "23232"
    });
    expect(res).to.have.status(400);
    return chakram.wait();
  });

});