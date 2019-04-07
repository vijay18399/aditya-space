var express = require('express');
var router = express.Router();
var monk=require('monk');
var db=monk('localhost:27017/aspace');
var dummy=db.get('dummy');
/* GET home page. */
router.get('/', function(req, res, next) {
	 dummy.find({ }, function(e, dummy){ 
  res.render('index', {'dummy' : dummy});

}); });
router.post('/add',function(req,res){
   

    var data={
         required : req.body.required,
      email : req.body.email,
        number:req.body.number
       
         
          } 
    dummy.insert(data,function(err,docs){
  
    if(err)
  {
    console.log(err);
  }
  else
  {
    console.log(docs);

  }
   
  res.redirect('/');
});
});
router.post('/edit', function(req, res) {
    console.log(req.body.sno);
    var id = req.body.sno;
    dummy.find({"_id":id}, function(err,docs){
        console.log(docs);
      res.send(docs);
    });
});
router.post('/update', function(req, res) {
    console.log(req.body._id);
    console.log(req.body.email);
    console.log(req.body.required);
     console.log(req.body.number);
    var data = {

    email : req.body.email,
    required :req.body.required,
    number :req.body.number
         
    }
  dummy.update({"_id":req.body._id},{$set:data}, function(err,docs){
    console.log(docs);
    res.redirect('/');
  });
});
router.post('/remove', function(req, res) {
    //console.log(req.body.sno);
    var id = req.body.sno;
    dummy.remove({"_id":id}, function(err,docs){
        //console.log(docs);
      res.send(docs);
    });
});

module.exports = router;
