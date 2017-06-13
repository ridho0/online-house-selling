var chai = require('chai')
var should = chai.should();
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
let server = 'localhost:3000'
let id = ''
let id_not = ''

describe('POST /house', function() {
  it('should return json house when given value housename and description', function(done) {
    chai.request(server)
    .post('/house')
    .send({ title: "rumah murah", description: "dijual cepat.. lagi BU gan..", price: 200000000, img: "ini image" })
    .end(function(err, res){
      res.body.title.should.equal("rumah murah")
      res.body.price.should.equal(200000000)
      res.should.have.status(200);
      res.body.should.be.an('object');
      id = res.body._id
      done()
    })
  });
  it('should not return array or string house when given value housename and description', function(done) {
    chai.request(server)
    .post('/house')
    .send({ title: "rmah murah", description: "dijual cepat.. lagi BU gan..", price: 20000000, img: "ini image" })
    .end(function(err, res){
      res.body.title.should.not.equal("rumah murah")
      res.body.price.should.not.equal(200000000)
      res.should.have.status(200);
      res.body.should.not.be.an('array');
      res.body.should.not.be.a('string');
      id_not = res.body._id
      done()
    })
  });
});

describe('GET /house', function() {
  it('should return array of house', function(done) {
    chai.request(server)
      .get('/house')
      .end(function(err, res){
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.an('array');
        done()
      })
  });
  it('should not return object or sring of house', function(done) {
    chai.request(server)
      .get('/house')
      .end(function(err, res){
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.not.be.an('object');
        res.body.should.not.be.a('string');
        done()
      })
  });
});

describe(`GET /house/:id`, function() {
  it('should return json house', function(done) {
    chai.request(server)
    .get(`/house/${id}`)
    .end(function(err, res){
      res.body.title.should.equal("rumah murah")
      res.body.price.should.equal(200000000)
      res.should.have.status(200);
      res.body.should.be.an('object')
      done()
    })
  });
  it('should not return array or string of house', function(done) {
    chai.request(server)
    .get(`/house/${id_not}`)
    .end(function(err, res){
      res.body.title.should.not.equal("rumah murah")
      res.body.price.should.not.equal(200000000)
      res.should.have.status(200);
      res.body.should.not.be.an('array')
      res.body.should.not.be.a('string')
      done()
    })
  });
});

describe(`PUT /house/:id`, function() {
  it('should return updated house object', function(done) {
    chai.request(server)
      .put(`/house/${id}`)
      .send({ title: "rumah dijual", description: "dijual cepat.. lagi BU gan..", price: 1000000, img: "ini image" })
      .end(function (err, res) {
        res.body.title.should.equal("rumah dijual")
        res.body.price.should.equal(1000000)
        res.should.have.status(200);
        res.body.should.be.an('object')
        done()
      });
  });
  it('should not return updated house array or string', function(done) {
    chai.request(server)
      .put(`/house/${id_not}`)
      .send({ title: "rumah dijual", description: "dijual cepat.. lagi BU gan..", price: 1000000, img: "ini image" })
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.not.be.an('array')
        res.body.should.not.be.a('string')
        done()
      });
  });
});

describe('DELETE /house/:id', function() {
  it('should return json of deleted house', function(done) {
    chai.request(server)
      .delete(`/house/${id}`)
      .end(function (err, res) {
        res.body.title.should.equal("rumah dijual")
        res.body.price.should.equal(1000000)
        res.body._id.should.equal(id)
        res.body.should.be.an('object')
        done()
      });
  });
  it('should not return array or string of deleted house', function(done) {
    chai.request(server)
      .delete(`/house/${id_not}`)
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.not.be.an('array')
        res.body.should.not.be.a('string')
        done()
      });
  });
});
