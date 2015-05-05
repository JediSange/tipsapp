var express = require('express');
var router = express.Router();
var Tip = require('../models/tips.js');

router.get('/tips', function (req, res) {
  Tip.find(function(err, tips) {
    if(err) handleError(err, res);
    if(tips) res.json(tips);
    else res.json({message: 'no tips found'});    
  });
});

router.get('/tips/:tip_id', function (req, res) {
  Tip.findOne({ tip_id: req.params.tip_id }, function(err, tip) {
    if(err) handleError(err, res);
    if(tip) res.json(tip);
    else res.json({message: 'no tip found'});
  });
});

router.post('/tips', function (req, res) {
  var data = JSON.parse(req.body);

  data.forEach(function(tip_data) {
    Tip.createOrFetch(tip_data, function(err, tip) {
      if(err) handleError(err, res);

      tip.save(function(err, obj) {
        if(err) handleError(err, res);
      });
    });
  });

  res.json({message: 'success'});
});

router.put('/tips/:tip_id', function (req, res) {
  var data = {
    tip_id: req.params.tip_id,
    message: req.body.message,
    username: req.body.username
  }

  Tip.createOrFetch(data, function(err, tip) {
    if(err) handleError(err, res);

    tip.save(function(err, obj) {
      if(err) handleError(err, res);
      res.json({message: 'success'});
    });
  });
});

//Simply takes a tip_id and removes it
router.delete('/tips/:tip_id', function (req, res) {
  Tip.find({ tip_id: req.params.tip_id }).remove(function(err){
    if(err) handleError(err, res);
    res.json({message: 'success'});
  });  
});

//Helper function to make error handling easier in a node environment
function handleError(err, res) {
  console.error(err);
  res.json({message: 'failure', error: err});
}

module.exports = router;
