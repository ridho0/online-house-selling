const mongoose = require('mongoose')
const Schema = mongoose.Schema

let houseSchema = new Schema({
  title: {
    type : String,
    require : true
  },
  description: {
    type : String,
    require : true
  },
  price: {
    type: Number,
    require: true
  },
  img: String,
  created_at: {
    type: Date,
    default: Date.now()
  }
})

let House = mongoose.model('House', houseSchema)

module.exports = House
