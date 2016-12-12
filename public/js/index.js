var socket = io.connect('http://localhost:3000');

// 서버에 접속할 때, 사용자 명을 확인한다.
socket.on('connect', function(){
	
	socket.emit('adduser', prompt('채팅 아이디를 입력해주세요'));
	
});

// 서버에서 updatechat을 전송할 때마다 인자 함수가 실행하여 채팅 내용을 업데이트 한다.
socket.on('updatechat', function(username, data){
	
	$('#conversation').append('<b>' + username + ' : </b>' + data + '<br>');
				
});

//서버에서 updateusers를 전송할 때마다, 인자 함수가 실행하여 사용자 목록을 업데이트한다.
socket.on('updateusers', function(data){
	
	$('#users').empty();
	
	$.each(data, function(key, value){
		$('#users').append('<div>' + key + '님이 접속되어 있습니다. </div>');
	});
	
});

// page onload
$(function(){
	
	// client가 send button을 click할 때
	$('#datasend').click(function(){
		
		var message = $('#data').val();
		$('#data').val('');
		socket.emit('sendchat', message);
		
	});
	
	// client에서 keyboard의 enter키를 입력시
	$('#data').keypress(function(e){
		
		if(e.which == 13){
			
			$(this).blur();
			$('#datasend').focus().click();
			
		}
		
	});
	
});