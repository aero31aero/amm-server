var supertest = require('supertest');
var should = require("should");
var request = supertest.agent("http://localhost:3000");
var mongoose = require('mongoose');

describe('Blogging Module', function () {
  var server;

  beforeEach(function () {
    var app = require('../lib/app.js');
    app.set('port', process.env.PORT || 3000);
    server = app.listen(app.get('port'));
  });

  afterEach(function () {
    server.close();
  });

  var post1 = {
    title: "This is a sample post",
    description: "This is the description of the post",
    url: "sample",
    author: "aero31aero",
    category: "nodejs",
    content: "This is the actual content of the post.",
    viewer: "markdown"
  };

  var post2 = {
    title: "Another post with same url",
    description: "This don't matter",
    url: "sample",
    author: "nischay",
    category: "nodejs",
    content: "The content is different as well.",
    viewer: "markdown"
  };

  it('should create new post', function createPost(done) {
    request.post('/blog/posts/create')
      .send(post1)
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.message.should.equal("success");
        post1._id = res.body._id;
        done();
      });
  });

  it('should not create post with duplicate url', function createDupPost(done) {
    request.post('/blog/posts/create')
      .send(post2)
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.error.should.equal("duplicate-url");
        done();
      });
  });

  it('should create new post with different url', function createPost(done) {
    post2.url = "new-sample";
    request.post('/blog/posts/create')
      .send(post2)
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.message.should.equal("success");
        post2._id = res.body._id;
        done();
      });
  });

  it('should fetch post by url', function getPostByUrl(done) {
    request.get('/blog/posts/url/new-sample')
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        (post2 == res.body).should.be.ok;
        done();
      });
  });

  it('should fetch post by _id', function getPostById(done) {
    request.get('/blog/posts/id/' + post1._id)
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        (post1 == res.body).should.be.ok;
        done();
      });
  });

});
