const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let FighterModel = {};

const convertID = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const FighterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
    
  level: {
    type: Number,
    min: 0,
    required: true,
  },
    
  health: {
    type: Number,
    min: 0,
    required: true,
  },

  attack: {
    type: Number,
    min: 0,
    required: true,
  },
    
  defense: {
    type: Number,
    min: 0,
    required: true,
  },
    
  experience: {
    type: Number,
    min: 0,
    required: true,
  },
    
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

FighterSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  level: doc.level,
  health: doc.health,
  attack: doc.attack,
  defense: doc.defense,
  experience: doc.experience,
});

FighterSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertID(ownerId),
  };

  return FighterModel.find(search).select('name level health attack defense experience').exec(callback);
};

FighterModel = mongoose.model('Fighter', FighterSchema);

module.exports.FighterModel = FighterModel;
module.exports.FighterSchema = FighterSchema;
