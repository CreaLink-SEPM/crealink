document.addEventListener("DOMContentLoaded", () => {
  const { enqueueNotification } = require("./socket.js");

  function enqueueBrowserNotification(message) {
    console.log(message);
    enqueueNotification(message);
  }

  function enqueueInputNotification() {
    let inputText = document.getElementById("inputField").value;
    const message = "Input button clicked with input value: " + inputText;
    enqueueNotification(message);
  }

  // You can attach these functions to the button click events here
  document.getElementById("browserButton").addEventListener("click", () => {
    enqueueBrowserNotification('First button clicked');
  });

  document.getElementById("inputButton").addEventListener("click", () => {
    enqueueInputNotification();
  });
});
