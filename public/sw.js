self.addEventListener("push", function (event) {
    const message = event.data.json();
    self.registration.showNotification( message.title, { body: message.text });
})