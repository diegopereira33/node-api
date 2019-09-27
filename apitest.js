var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(bodyParser.json());
  
  // end point insert 
  app.post('/insertloglicenciamento', (req, res) => {
  var dados = req.body;
    
  console.log(dados);
  executar(dados);
  
  res.send("Sucess");
});


//Executa insert
function executar(dados) {
  
  MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("dbloglol");
   var myobj = dados;

   dbo.collection("loglicenciamento").insertOne(myobj, function(err, res) {
    if (err) throw err;
      console.log("1 document inserted");
    db.close();
    });

    
  });
}
  

 // end point select log 
 app.get('/selectloglicenciamento', (req, res) => {
    var base = "loglicenciamento";
    select(base, res);
    //res.send("Sucess"); 
 }); 


 //executa select 
 function select(base, res){

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dbloglol");
 
    dbo.collection("loglicenciamento").find({}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result); 
      db.close();
      res.send(JSON.stringify(result));
    });

    
  });

}

app.listen(8000, function() {
  console.log('------------------------------------Servidor Node.js Ativo--------------------------- Porta:8000');
});



