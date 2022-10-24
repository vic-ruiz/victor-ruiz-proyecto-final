const socket = io();

const chatForm = document.querySelector(".chat-form");
const chatMessageInput = chatForm.querySelector('[name="message"]');
const messagesView = document.querySelector(".chat-messages");
const email = document.querySelector(".email");

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("estoy aqui");
  const message = {
    text: chatMessageInput.value,
    email: email.textContent,
  };
  socket.emit("message", message);
  chatMessageInput.value = "";
});



socket.on("messages", (data) => {
  const html = data.map((message) => {
    return `<div class="card col-2">
    <div>${message.email}</div>
    <div>${message.text}</div>
    <div>${message.date} </div>
    </div>`;
    })
    .join(" ");
    messagesView.innerHTML = html;
});
