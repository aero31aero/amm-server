module.exports = function getEndPoints(configuration) {
  var mongoose = require("mongoose");
  var Posts = require("./models.js")(configuration.collections).posts;
  var conf = require("./conf.js");

  function _isPostDuplicate(post, callback) {
    Posts.count({
      url: post.url
    }, function isDuplicate(err, count) {
      if (err) {
        return callback(err);
      }
      if (count > 0) {
        return callback(new Error('Duplicate URL'));
      }
      callback(null);
    });
  }

  function createPost(post, callback) {
    _isPostDuplicate(post, function createPostIfNotDuplicate(err) {
      if (err) {
        return callback(null, {
          error: "duplicate-url"
        });
      }
      Posts.create(post, function afterPostCreate(err, newpost) {
        if (err) {
          return callback(err);
        }
        return callback(null, {
          _id: "newpost.id",
          message: "success"
        });
      });
    });
  }

  function getPostByUrl(url, callback) {
    Posts.findOne({
      url: url
    }, function (err, post) {
      if (err) {
        return callback(err);
      }
      return callback(null, post);
    });
  }

  function getPost(id, callback) {
    Posts.findById(id, function (err, post) {
      if (err) {
        return callback(err);
      }
      return callback(null, post);
    });
  }

  function _paginatePostsAndReturn(query, callback, start, end) {
    start = start || 1;
    end = end || 10;
    query.
    skip(start - 1).
    limit(end - start + 1).
    sort('created_at').
    exec(function (err, posts) {
      if (err) {
        return callback(err);
      }
      return callback(null, posts);
    });
  }

  function getPosts(callback, start, end) {
    start = start || 1;
    end = end || 10;
    var query = Posts.find({});
    return _paginatePostsAndReturn(query, callback, start, end);
  }

  function getPostsByCategory(category, callback, start, end) {
    start = start || 1;
    end = end || 10;
    var query = Posts.find({
      category: category
    });
    return _paginatePostsAndReturn(query, callback, start, end);
  }

  function getPostsByAuthor(author, callback, start, end) {
    start = start || 1;
    end = end || 10;
    var query = Posts.find({
      author: author
    });
    return _paginatePostsAndReturn(query, callback, start, end);
  }

  function deletePost(id, callback) {
    Posts.findByIdAndRemove(id, function (err, post) {
      if (err) {
        return callback(err);
      }
      return callback(null, post);
    });
  }

  function updatePost(id, changes, callback) {
    Posts.findByIdAndUpdate(id, changes, function (err, post) {
      if (err) {
        return callback(err);
      }
      return callback(null, post);
    });
  }

  return {
    createPost: createPost,
    getPostByUrl: getPostByUrl,
    getPost: getPost,
    getPosts: getPosts,
    getPostsByAuthor: getPostsByAuthor,
    getPostsByCategory: getPostsByCategory,
    deletePost: deletePost,
    updatePost: updatePost,
  };
};
