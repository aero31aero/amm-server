module.exports = function getEndPoints(configuration) {
  var mongoose = require("mongoose");
  var Songs = require("./models.js")(configuration.collections).Songs;
  var conf = require("./conf.js");

  function _isSongDuplicate(Song, callback) {
    Songs.count({
      url: Song.url
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

  function createSong(Song, callback) {
    _isSongDuplicate(Song, function createSongIfNotDuplicate(err) {
      if (err) {
        return callback(null, {
          error: "duplicate-url"
        });
      }
      Songs.create(Song, function afterSongCreate(err, newSong) {
        if (err) {
          return callback(err);
        }
        return callback(null, {
          _id: "newSong.id",
          message: "success"
        });
      });
    });
  }

  function getSongByUrl(url, callback) {
    Songs.findOne({
      url: url
    }, function (err, Song) {
      if (err) {
        return callback(err);
      }
      return callback(null, Song);
    });
  }

  function getSong(id, callback) {
    Songs.findById(id, function (err, Song) {
      if (err) {
        return callback(err);
      }
      return callback(null, Song);
    });
  }

  function _paginateSongsAndReturn(query, callback, start, end) {
    start = start || 1;
    end = end || 10;
    query.
    skip(start - 1).
    limit(end - start + 1).
    sort('created_at').
    exec(function (err, Songs) {
      if (err) {
        return callback(err);
      }
      return callback(null, Songs);
    });
  }

  function getSongs(callback, start, end) {
    start = start || 1;
    end = end || 10;
    var query = Songs.find({});
    return _paginateSongsAndReturn(query, callback, start, end);
  }

  function getSongsByCategory(category, callback, start, end) {
    start = start || 1;
    end = end || 10;
    var query = Songs.find({
      category: category
    });
    return _paginateSongsAndReturn(query, callback, start, end);
  }

  function getSongsByAuthor(author, callback, start, end) {
    start = start || 1;
    end = end || 10;
    var query = Songs.find({
      author: author
    });
    return _paginateSongsAndReturn(query, callback, start, end);
  }

  function deleteSong(id, callback) {
    Songs.findByIdAndRemove(id, function (err, Song) {
      if (err) {
        return callback(err);
      }
      return callback(null, Song);
    });
  }

  function updateSong(id, changes, callback) {
    Songs.findByIdAndUpdate(id, changes, function (err, Song) {
      if (err) {
        return callback(err);
      }
      return callback(null, Song);
    });
  }

  return {
    
  };
};
