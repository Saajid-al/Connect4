const socket = io("http://localhost:2000")
const messageBox = document.getElementById("container") //getting element from the message container
const messageChatBox = document.getElementById("text-wrapper")
const messageInput = document.getElementById("textfield") 


socket.on("chatmsg", data=> { 
    messageDIV(data)
    rdm = colors[Math.floor(Math.random() * colors.length)];
})
messageChatBox.addEventListener("submit", e =>{  //sending the message to the server
    e.preventDefault()
    const message = messageInput.value
    socket.emit("sendchatmsg", message) //sending msg from client to server
    console.log("Message sent from clientside")
    messageInput.value = "" // empties message every time the message is sent
})

var colors = ["#8a8a8a", "#454545", '#808080',"#303`030","#909090","#262626","#7a7a7a","#210000",];
var rdm = colors[Math.floor(Math.random())];
function messageDIV(message) { 
    const messageElement = document.createElement("div"); //appending the message to the divs
    console.log("server side");
    messageElement.innerText = message;
    messageElement.className="test"
    messageElement.style.backgroundColor = rdm; //to change id of the change create element
    messageBox.append(messageElement);
}