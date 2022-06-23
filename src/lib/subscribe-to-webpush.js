import BBoardApiClient from "./BBoardApiClient";

const config = { pushKey: process.env.REACT_APP_VAPID_PUBLIC_KEY};

export default async function subscribe(topic, apiClient: BBoardApiClient) {
    let swReg = await navigator.serviceWorker.register("/sw.js");
    let subscription = await swReg.pushManager.getSubscription();
    console.debug('Already subscribed to Web Push', JSON.stringify(subscription));
    if (!subscription) {
        subscription = await swReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(config.pushKey),
            topic
        });
        apiClient.storeWebPushSubscription(JSON.stringify(subscription), topic);
    }
}

function urlB64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
