var express = require('express');
const { findByIdAndUpdate } = require('./users');
var router = express.Router();
let taskscollection = require('./users');

const app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
 taskscollection.find({}, (err,docs) => {
   res.render('index', {taskscollection: docs});
 });
});

router.get('/mytasks', (req, res) => {
 taskscollection.find({}, (err,docs) => {
  if(err){
    console.log(err);
  }
  else{
    res.render('index', {taskscollection: docs});
  }
 });
});

router.post('/submit', (req, res) => {
  taskscollection.create({
    content: req.body.task
  })
  .then(() => {
    res.redirect('/');
  })
});

router.get('/remove/:id', (req, res) => {
  const id = req.params.id;
  taskscollection.findByIdAndRemove(id, err => {
    if(err) {
      res.send("ERROR");
    }
    else{
      res.redirect("/");
    }
  })
})

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  taskscollection.find({}, (err, docs) => {
    res.render('update', {taskscollection: docs, idupdate: id});
  });
})

router.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  taskscollection.findByIdAndUpdate(id, {
    content: req.body.task
     }, err => {
      if (err) {
        res.send(err);
      }
      else {
        res.redirect("/");
      }
     })
})

module.exports = router;
