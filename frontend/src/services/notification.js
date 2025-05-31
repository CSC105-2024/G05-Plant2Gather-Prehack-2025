const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

async function subscribeToPush() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      console.log("This is my VAPID");
      console.log(VAPID_PUBLIC_KEY);

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      console.log("Push Subscription:", JSON.stringify(sub));

      return sub;
    } catch (err) {
      console.error("Error subscribing to push notifications", err);
    }
  } else {
    console.error(
      "PushManager or ServiceWorker is not supported in this browser.",
    );
  }
}

// Helper: converts VAPID key format
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) {
    output[i] = raw.charCodeAt(i);
  }
  return output;
}

export { subscribeToPush };
