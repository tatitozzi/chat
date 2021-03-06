$(document).ready(function(){  
    var socket = io.connect("http://localhost:2626");
    var ready = false;

$("#submit").submit(function(e) {
	e.preventDefault();
	$("#nick").fadeOut();
	$("#chat").fadeIn();
	var name = $("#username").val();
	var time = new Date();
	$("#name").html(name);
	$("#time").html('Conectado às: ' + time.getHours() + ':' + time.getMinutes());

	ready = true;
	socket.emit("join", name);

});

$("#textarea").keypress(function(e){
	if(e.which == 13) {
		var text = $("#textarea").val();
		$("#textarea").val('');
		var time = new Date();
		$(".chat").append('<li class="self"><div class="msg"><span>' + $("#username").val() + ':</span><p>' + text + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
		socket.emit("send", text);

	}
});


    socket.on("update", function(msg) {
    	if (ready) {
    		$('.chat').append('<li class="info">' + msg + '</li>')
    	}
    }); 

    socket.on("chat", function(user,msg) {
    	if (ready) {
	    	var time = new Date();
	    	$(".chat").append('<li class="other"><div class="msg"><span>' + user + ':</span><p>' + msg + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
    	}
    });

});