// module extract
var express = require('express');
var http = require('http');
var path = require('path');
var cors = require('cors');

var app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors());

// server 3000 port로 연결
var server = http.createServer(app).listen(3000, function(){
	
	console.log('서버가 시작되었습니다');
	
});

var io = require('socket.io').listen(server);

// routing
app.get('/', function(req, res){
	
	res.sendfile(__dirname + '/index.html');
	
});

// 채팅 서버에 현재 접속한 사용자 명을 저장할 변수
var usernames = {};

io.sockets.on('connection', function(socket){
	
	// client가 sendchat 이벤트를 전송할 경우 처리할 리스너 함수
	socket.on('sendchat', function(data){
		
		io.sockets.emit('updatechat', socket.username, data);
		
	});
	
	// client가 adduser 이벤트를 전송할 경우 처리할 리스너 함수
	socket.on('adduser', function(username){
		
		socket.username = username;
		usernames[username] = username;
		//socket.emit('updatechat', 'SERVER', '채팅방에 입장하셨습니다');
		socket.broadcast.emit('updatechat', '알림', username + '님이 접속하셨습니다');
		io.sockets.emit('updateusers', usernames);
		
	});
	
	// user가 접속을 끊을 경우 처리할 리스너 함수
	socket.on('disconnect', function(){
	
		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.broadcast.emit('updatechat', '알림', socket.username + '님이 나갔습니다');
		
	});
	
});
