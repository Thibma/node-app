var express = require('express');
var router = express.Router();

const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node App' });
});

router.post('/ville', async function(req, res, next) {
  var param = req.body.ville
  param = param.replace(" ", "+")
  console.log(param)
  var url = "https://geocode.xyz/" + param + "?json=1"
  var jsonData
  try {
    await axios.get(url).then(response => {
      jsonData = response.data
    })
    console.log(jsonData)
    if (jsonData['error'] != null) {
      res.render('error', {
        message: jsonData['error']['description']
      })
    }
    else {
      res.render('ville', { 
        ville: req.body.ville,
        longitude: jsonData["longt"],
        latitude: jsonData["latt"]})
      } 
  }
  catch (err) {
    res.send(err)
  }
  
})

module.exports = router;
