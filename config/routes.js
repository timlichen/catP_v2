module.exports = function(app) {
  //SHOW USER
  app.get('/', function(req, res){
    res.render('index.html');
  })
}
