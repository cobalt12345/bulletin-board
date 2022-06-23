self.addEventListener("push", function (event) {
    const message = event.data.json();
    console.debug("Received push notification", JSON.stringify(message));
    self.registration.showNotification( message.title, { body: message.body });
})