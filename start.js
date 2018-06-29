var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {}; 

app.get('/', function(req, res){
  res.send('Servidor rodando!');
});

io.on("connection", function (user) {  
    user.on("join", function(name){
    	console.log("Usuário: " + name + " entrou no chat");
        users[user.id] = name;
        user.emit("update", "Você entrou na sala!");
        user.broadcast.emit("update", name + " entrou na sala.")
    });

    user.on("send", function(msg){
    	console.log("Mensagem: " + msg);
        user.broadcast.emit("chat", users[user.id], msg);
    });

    user.on("disconnect", function(){
    	console.log("Desconectou");
        io.emit("update", users[user.id] + " saiu da sala.");
        delete users[user.id];
    });
});

http.listen(2626, function(){
  console.log('Rodando na porta 2626');
});