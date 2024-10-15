const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("ServiceWorker is not supported")
    }

    if (!('Notification' in window)) {
        throw new Error("Notification Api is not supported")
    }
}

// Register

const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

// asking for notification permission 

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        throw new Error("Notification permission not granted")
    }
    // else {
    //     new Notification("Hello from notification service")
    // }
}


// calling function

// checkPermission();
// registerSW();

// const reg = registerSW();
// reg.showNotification();

const main = async () => {
    checkPermission();
    await requestNotificationPermission();
    await registerSW();
    // const reg = await registerSW();
    // reg.showNotification("Hello ji ", {});
}

// main();

// requestNotificationPermission();