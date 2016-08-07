module.exports = function exportModels(collections) {
  var mongoose = require('mongoose');
  var songs = mongoose.model(collections.songs, new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    author: Object,
    category: String,
    content: String,
    viewer: {
      type: String,
      default: 'markdown',
      enum: ['markdown', 'html', 'ejs', 'pug'],
    },
    created_at: Date,
    updated_at: {
      type: Date,
      default: Date.now,
    },
    activity: {
      type: Array,
      default: [],
    }
  }));
  return {
    songs: songs,
  };
};
