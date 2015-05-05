var mongoose = require('mongoose');

var tipSchema = mongoose.Schema({
  tip_id: {type: Number, index: true},
  created: {type: Date, default: Date.now()},
  updated: {type: Date, default: Date.now()},
  message: String,
  original_message: String,
  username: String
});

//Handle pre save for original message and updated time
tipSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updated = Date.now();
    console.log("Updating Tip");
  }
  else {
    this.original_message = this.message;
    console.log("Creating Tip");
  }

  next();
});

//Helper function to build tip model
//expects the following data array: {tip_id, message, username}
tipSchema.statics.createOrFetch = function(data, callback) {
  Tip.findOne({ tip_id: data.tip_id }, function(err, tip) {
    if(err) callback(err);

    //If we do not find one, create one
    if(!tip) {
      tip = new Tip(data);
    }

    //Otherwise, update the data
    else {
      tip.message = data.message;
      tip.username = data.username;
    }

    //Return the object
    callback(null, tip);
  });
}

module.exports = mongoose.model('Tip', tipSchema);
