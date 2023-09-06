const express = require("express")
const app = express()
const { connectAsana } = require("./src/services/asana/asana.service")
const { subscribeAsana } = require("./src/services/asana/asana.PubSubservice")
const { connectTrelloQueue } = require('./src/services/trello/rabbitMQTrello')
const { subscribetrello } = require('./src/services/trello/trello.PubSubservice')


connectAsana ()
subscribeAsana()

subscribetrello()
connectTrelloQueue()


app.use(express.json())
const cors = require("cors")

app.use(cors());



const port = 3004;
app.listen( port, () => {
    console.log(`Server Running on port ${port}`);
})