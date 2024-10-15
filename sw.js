// console.log("This message is sent to the server worker and sending notification")

const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

// api calling
const saveSubscription = async (subscription) => {
    const response = await fetch('http://localhost:3000/save-subscription', {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription)
    })

    return response.json()
}


self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BBgJy34yGdAmlJ_0e1ODNo7anJ35ypw76HcviZBU4EqVG_NjuaqqWMeIj0jGn4bVdzc9lEFfJ3BVQJRXhm21K08")
    })
    console.log(subscription)
    const response = await saveSubscription(subscription)
    console.log(response)
})

self.addEventListener("push", e => {
    self.registration.showNotification("Wohoo!!", { body: e.data.text() })
})


// Public Key:
// BBgJy34yGdAmlJ_0e1ODNo7anJ35ypw76HcviZBU4EqVG_NjuaqqWMeIj0jGn4bVdzc9lEFfJ3BVQJRXhm21K08

// Private Key:
// E7jyK3IC4b4VmArAHFYb-RnARlHD76KDtCZhvO9pA58




// const saveSubscription = async (subscription) => {
//     const response = await fetch('http://localhost:3000/save-subscription', {
//         method: 'post',
//         headers: { 'Content-type': "application/json" },
//         body: JSON.stringify(subscription)
//     })

//     return response.json()
// }

// self.addEventListener("activate", async (e) => {
//     const subscription = await self.registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlBase64ToUint8Array("YOUR_PUBLIC_KEY")
//     })

//     const response = await saveSubscription(subscription)
//     console.log(response)
// })

// self.addEventListener("push", e => {
//     self.registration.showNotification("Wohoo!!", { body: e.data.text() })
// })