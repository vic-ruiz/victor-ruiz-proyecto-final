const socket = io();

const btn = document.getElementById("btn-message");
const chatMessageInput = document.getElementById("message");
const messagesView = document.getElementById("chat-messages");
const email = document.getElementById("email");

if (btn) {
  btn.addEventListener("submit", (event) => {
    console.log("probando");
    event.preventDefault();
    console.log("estoy aqui");
    const message = {
      text: chatMessageInput.value,
      email: email.textContent,
    };
    socket.emit("message", message);
  });
}

function getMessages(data) {
  const html = data
    .map((message) => {
      return `<div class="card col-2">
      <div>${message.email}</div>
      <div>${message.date}</div>
      <div><${message.text}></div>
      </div>`;
    })
    .join(" ");
  document.getElementById("chat-messages").innerHTML = html;
}

socket.on("messages", getMessages(data));
