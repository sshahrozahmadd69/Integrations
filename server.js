const express = require("express")
const app = express()
const { connect } = require("./src/rabbitMQ/rabbitMQ")
const { subscribeAsana } = require("./src/rabbitMQ/rabbitMQpubsub")
const { connectTrelloQueue } = require('./src/rabbitMQ/rabbitMQTrello/rabbitMQTrello')

connect ()
subscribeAsana()

connectTrelloQueue()


app.use(express.json())
const cors = require("cors")

app.use(cors());



const port = 3004;
app.listen( port, () => {
    console.log(`Server Running on port ${port}`);
})