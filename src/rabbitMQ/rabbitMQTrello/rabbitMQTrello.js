const amqp = require("amqplib");
const { sendBugTrello } = require("../../Integrations/trello/bugTrello");

async function createChannel(){
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("trelloJobs");
    return channel;
}

exports.connectTrelloQueue = async function () {
    try {
        const channel = await createChannel();
        channel.consume("trelloJobs", async message => {
            const content = message.content.toString();
            console.log(content);
            await sendBugTrello(content);
  
            // Acknowledge the message to remove it from the queue
            channel.ack(message);
        });
        
        console.log("Waiting for messages for Trello Queue");
    } catch (error) {
        console.log(error);
    }
  }

