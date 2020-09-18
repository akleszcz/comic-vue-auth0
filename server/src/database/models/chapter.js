const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const chapterSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  availableFor: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Chapter', chapterSchema);