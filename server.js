var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
const server = app.listen(5000);
const io = require('socket.io')(server);


//session
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


io.on('connection', function (socket) {
    socket.on('posting_form', function (data) { 
      console.log(data.name);
      console.log(data.location);
      console.log(data.language);
      console.log(data.textarea);
      message = {
          name: data.name,
          location: data.location,
          language: data.language,
          textarea: data.textarea
      }
      socket.emit('updated_message', message);
    });
    var num = Math.floor(Math.random() * 11000);
    console.log(`rand num => ${num}`);
    socket.emit('rand_num', num);
});



app.get('/', function(request, respond){
    console.log('========> inside "/"');
    respond.render('home');
})


// app.post('/users', function(req, res) {
//     console.log("POST DATA", req.body);
//     res.redirect('/');
//    })
   