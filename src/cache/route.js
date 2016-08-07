module.exports = function (configuration) {
  var express = require('express');
  var router = express.Router();
  var handles = require('./handles')(configuration);

  var _authorEvaluator = function (author) {
    return author;
  };
  var _contentEvaluator = function (content) {
    return content;
  };

  if (configuration.functions) {
    if (configuration.functions.authorEvaluator) {
      _authorEvaluator = configuration.functions.authorEvaluator;
    }
    if (configuration.functions.contentEvaluator) {
      _contentEvaluator = configuration.functions.contentEvaluator;
    }
  }

  function _runFunctions(data) {
    if (typeof data[0] == 'object') {
      data.forEach(function (elem) {
        elem.author = _authorEvaluator(elem.author);
        elem.content = _contentEvaluator(elem.content);
      });
    } else {
      data.author = _authorEvaluator(data.author);
      data.content = _contentEvaluator(data.content);
    }
    return data;
  }

  function _prepResponse(err, data) {
    if (err) {
      return err;
    }
    data = data || {};
    data = _runFunctions(data);
    return data;
  }

  router.get('/posts/id/:id', function (req, res) {
    handles.getPost(req.params.id, function (err, data) {
      res.json(_prepResponse(err, data));
    });
  });

  router.put('/posts/id/:id', function (req, res) {
    handles.updatePost(req.params.id, req.body, function (err, data) {
      res.json(_prepResponse(err, data));
    });
  });

  router.delete('/posts/id/:id', function (req, res) {
    handles.deletePost(req.params.id, function (err, data) {
      res.json(_prepResponse(err, data));
    });
  });

  router.get('/posts/url/:url', function (req, res) {
    handles.getPostByUrl(req.params.url, function (err, data) {
      res.json(_prepResponse(err, data));
    });
  });

  router.post('/posts/create', function (req, res) {
    handles.createPost(req.body, function (err, data) {
      res.json(_prepResponse(err, data));
    });
  });

  router.post('/pages/', function (req, res) {
    var start = req.body.start || 1;
    var end = req.body.end || 10;
    handles.getPosts(function (err, data) {
      res.json(_prepResponse(err, data));
    }, start, end);
  });

  router.post('/pages/author/:author', function (req, res) {
    var start = req.body.start || 1;
    var end = req.body.end || 10;
    handles.getPostsByAuthor(req.params.author, function (err, data) {
      res.json(_prepResponse(err, data));
    }, start, end);
  });

  router.post('/pages/category/:category', function (req, res) {
    var start = req.body.start || 1;
    var end = req.body.end || 10;
    handles.getPostsByCategory(req.params.category, function (err, data) {
      res.json(_prepResponse(err, data));
    }, start, end);
  });

  return router;
};
