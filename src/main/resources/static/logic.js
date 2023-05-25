var stompClient = null;

function connect(){
    let socket = new SockJS("/server1");
    stompClient = Stomp.over(socket);

    stompClient.connect({},function(frame){
        console.log("Connected : " + frame)

        $("#name-form").addClass("d-none");
        $("#chatroom").removeClass("d-none");

        //subscribe URL
        stompClient.subscribe("/topic/return-to", function(response){
            showMessage(JSON.parse(response.body));
        });
    })
}

function showMessage(message)
{
    $("#messagecontainer").prepend(`<tr><td><b>${message.name} :</b>${message.content}</td></tr>`)
}

function sendMessage()
{
    let jsonOb={
        name: localStorage.getItem("name"),
        content:$("#message-value").val()
    }
    stompClient.send("/app/message", {}, JSON.stringify(jsonOb));
}

$(document).ready(e=>{

    $("#login").click(()=>{
        let name = $("#name-value").val();
        localStorage.setItem("name", name);
        $(".card-title").append(`<h1>Welcome, ${name}</h1>`)
        connect();
    })

    $("#send").click(()=>{
        sendMessage();
    })

    $("#logout").click(()=>{
        localStorage.removeItem("name");
        if(stompClient!=null)
        {
            stompClient.disconnect();
            $("#name-form").removeClass("d-none");
        $("#chatroom").addClass("d-none");
        }
    })
})