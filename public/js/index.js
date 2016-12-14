var socket = io.connect('http://52.78.224.181:3000/');


// 서버에 접속할 때, 사용자 명을 확인한다.
socket.on('connect', function(){
	
<<<<<<< HEAD
	socket.emit('adduser', prompt('채팅 아이디를 입력해주세요'));		//socket.emit( function() , '사용자 아이디')
	//socket.emit('adduser', function(){
		//call back으로 데이터를 받는다.
		
		
	//});
	
	//socket.emit('adduser', '아아 테스트중입니다.');
=======
	var name = 'anonymous'
	socket.emit('adduser', name);
>>>>>>> e41f3ea7817e7562e97026758b574c7144d117d1
	
});


// 서버에서 updatechat을 전송할 때마다 인자 함수가 실행하여 채팅 내용을 업데이트 한다.
socket.on('updatechat', function(username, data){
	
	$('#conversation').append('<b>' + username + ' : </b>' + data + '<br>');
				
});


//서버에서 updateusers를 전송할 때마다, 인자 함수가 실행하여 사용자 목록을 업데이트한다.
socket.on('updateusers', function(data){
	
	$('#users').empty();
	
	$.each(data, function(key, value){
		$('#users').append('<p>' + key + '</p>');
	});
	
});


// page onload
$(function(){
	
	
	// iconDiv 버튼을 눌렀을 때
	$('#iconDiv>a').click(function(){
		
		var openClose = $('#chatUsers').css('left');
		
		if(openClose == '-150px'){
		
			$('#chatUsers').animate({			
				left : 0		
			});
			
		} else {
			
			$('#chatUsers').animate({				
				left : -150				
			});
			
		}
		
	});

	
	// client가 send button을 click할 때
	$('#datasend').click(function(){
		
		var message = $('#data').val();
		$('#data').val('');
		socket.emit('sendchat', message);
		$('#data').focus();
		
		// 채팅창이 스크롤이 생길 경우 항상 최신이 보이도록 유지
		// $('#conversation').scrollTop($('#conversation').height());
		document.getElementById('conversation').scrollTop = document.getElementById('conversation').scrollHeight;
		
	});
	
	
	// client에서 keyboard의 enter키를 입력시
	$('#data').keypress(function(e){
		
		if(e.which == 13){
			
			$(this).blur();
			$('#datasend').focus().click();
			
		}
		
		// 채팅창이 스크롤이 생길 경우 항상 최신이 보이도록 유지
		// $('#conversation').scrollTop($('#conversation').height());
		document.getElementById('conversation').scrollTop = document.getElementById('conversation').scrollHeight;
		
	});
	
	
});