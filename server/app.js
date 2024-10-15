const express = require('express')
const cors = require('cors')
const webpush = require('web-push')

const app = express()

const port = 3000

const apiKeys = {
    publicKey: 'BBgJy34yGdAmlJ_0e1ODNo7anJ35ypw76HcviZBU4EqVG_NjuaqqWMeIj0jGn4bVdzc9lEFfJ3BVQJRXhm21K08',
    privateKey: 'E7jyK3IC4b4VmArAHFYb-RnARlHD76KDtCZhvO9pA58'
}

webpush.setVapidDetails(
    'mailto:ashutoshkumardsr@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey

)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to backend server")
})

const subDatabase = [];

app.post("/save-subscription", (req, res) => {
    console.log("Hello Kalua")
    subDatabase.push(req.body);
    console.log(subDatabase)
    res.json({ status: "success", message: 'Subscription saved successfully' })
})

app.get("/send-notification", (req, res) => {
    console.log(subDatabase.length)
    for (let i = 0; i < subDatabase.length; i++) {
        webpush.sendNotification(subDatabase[i], "hello Kalua")
    }
    res.json({ status: "success", message: 'Message sent to push services' })
})

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})

