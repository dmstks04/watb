const chatBtn = document.querySelector('.chatBtn');

chatBtn.addEventListener('click', () => {
    const chatBox = document.querySelector('.chatBox');
    const expanded = chatBtn.getAttribute("aria-expanded") === "true";
    chatBtn.setAttribute("aria-expanded", !expanded);
    if (chatBtn.getAttribute("aria-expanded") === 'true') {
        chatBox.style.display = 'block';
        chat();
    } else {
        chatBox.style.display = 'none';
    }
})

window.addEventListener('load', () => {
    
});

const chat = () => {
    // const username = document.querySelector('#username').value;
    const username = 'test';
    $("#disconn").on("click", (e) => {
        disconnect();
    })
    
    $("#button-send").on("click", (e) => {
        send();
    });

    const websocket = new WebSocket("ws://localhost:8082/ws/chat");
    websocket.onmessage = onMessage;
    // websocket.onopen = onOpen;
    // websocket.onclose = onClose;

    function send() {
        let msg = document.getElementById("msg");
        console.log(username + ":" + msg.value);
        websocket.send(username + ":" + msg.value);
        msg.value = '';
    }
    //채팅창에서 나갔을 때
    // function onClose(evt) {
    //     var str = username + ": 님이 방을 나가셨습니다.";
    //     websocket.send(str);
    // }
    
    //채팅창에 들어왔을 때
    // function onOpen(evt) {
    //     var str = username + ": 님이 입장하셨습니다.";
    //     websocket.send(str);
    // }
    function onMessage(msg) {
        var data = msg.data;
        var sessionId = null;
        //데이터를 보낸 사람
        var message = null;
        var arr = data.split(":");

        var cur_session = username;

        //현재 세션에 로그인 한 사람
        console.log("cur_session : " + cur_session);
        sessionId = arr[0];
        message = arr[1];

        console.log("sessionID : " + sessionId);
        console.log("cur_session : " + cur_session);

        //로그인 한 클라이언트와 타 클라이언트를 분류하기 위함
        if(sessionId == cur_session){
            var str = "<div class=>";
            str += "<div class='alert alert-secondary'>";
            str += "<b>" + sessionId + " : " + message + "</b>";
            str += "</div></div>";
            $("#msgArea").append(str);
        }
        else{
            var str = "<div class=>";
            str += "<div class='alert alert-warning'>";
            str += "<b>" + sessionId + " : " + message + "</b>";
            str += "</div></div>";
            $("#msgArea").append(str);
        }
    }
}

function notification(msg) {
    let notification;
    let notificationPermission = Notification.permission;
    if (notificationPermission === "granted") {
        notification = new Notification(`실시간 채팅 알림`, {
            body: `${msg}`,
        });
    } else if (notificationPermission !== 'denied') {
        alert("채팅 기능을 위해 알람 허용을 해주세요!")
        //Notification을 거부했을 경우 재 허용 창 띄우기
        Notification.requestPermission(res => res);
    }
}
