const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favoriteitemSchema = new Schema({
    name: {type: String, required: true},
    owner:{type:mongoose.Schema.Types.ObjectId, ref: 'users',required: true},
    displayPicture: {type: String},
},
{
    versionKey: false
});

favoriteitemSchema.set('toObject', { virtuals: true })
favoriteitemSchema.set('toJSON', { virtuals: true })


favoriteitemSchema.virtual('id').get(function() {
  return this._id.toString();
});

const favoriteitemModel = mongoose.model('favoriteitem', favoriteitemSchema);
module.exports = favoriteitemModel;