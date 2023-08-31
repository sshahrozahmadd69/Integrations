const amqp = require("amqplib");
const { bugsAsana } = require("../../controllers/asaana/bugsAsana");

async function createChannel(){
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("mongojobs");
    return channel;
}

exports.connectAsana = async function () {
    try {
        const channel = await createChannel();
        channel.consume("mongojobs", async message => {
            const content = message.content.toString();
            console.log(content);
            await bugsAsana(content);
  
            // Acknowledge the message to remove it from the queue
            channel.ack(message);
        });
        
        console.log("Waiting for messages for Asaana Queue");
    } catch (error) {
        console.log(error);
    }
  }

