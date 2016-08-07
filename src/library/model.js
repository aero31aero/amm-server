module.exports = function exportModels(collections) {
  var mongoose = require('mongoose');
  var songs = mongoose.model(collections.songs, new mongoose.Schema({
    title: String,
    artist: String,
    url: String,
    album: Object,
    hash: String,
    expirytime: {
      type: Date,
      expires: '900s',
      default: Date.now
    },
    created_at: Date,
    updated_at: {
      type: Date,
      default: Date.now,
    },
  }));
  return {
    Songs: songs,
  };
}();
