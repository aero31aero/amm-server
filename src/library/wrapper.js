module.exports = function getEndPoints() {
  var Songs = require("./model.js").Songs;

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

  function createSong(song, callback) {
    _isSongDuplicate(Song, function createSongIfNotDuplicate(err) {
      if (err) {
        return callback(null, {
          message: "error",
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
  return {};
}();
