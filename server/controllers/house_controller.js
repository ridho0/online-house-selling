const House = require('../models/house')

module.exports = {
  insert : function(req, res) {
    House.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      img: req.body.img
    }, (err, record) => {
      err ? res.json({ err }) : res.json(record)
    })
  },
  getAll : function(req, res) {
    House.find({}, (err, records) => {
      err ? res.json({ err }) : res.json(records)
    })
  },
  getById : function(req, res) {
    House.findById(req.params.id, (err, record) => {
      err ? res.json({ err }) : res.json(record)
    })
  },
  updateById : function(req, res) {
    House.findById(req.params.id, (err, data) => {
      if(err){
        res.json({err})
      }
      else {
        House.findByIdAndUpdate( req.params.id , {
          $set:{
            title : req.body.title || data.title,
            description : req.body.description || data.description,
            price: req.body.price || data.price,
            img: req.body.img || data.img
          }
        }, {new:true})
        .exec((err, record) => {
          err ? res.json({ err }) : res.json(record)
        })
      }
    })
  },
  deleteById : function(req, res) {
    House.findByIdAndRemove(req.params.id)
      .exec((err, record) => {
        err ? res.json({ err }) : res.json(record)
      })
  }
}
