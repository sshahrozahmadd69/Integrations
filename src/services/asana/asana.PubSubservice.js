const amqp = require("amqplib");
const { bugsAsanapubsub } = require("../../controllers/asaana/pubsubAsaana");

const {sendBugTrello} = require("../../controllers/trello/pubsubtrello")

exports.subscribeAsana = async function () {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
  
    const exchangeName = 'logs';
  
    await channel.assertExchange(exchangeName, 'fanout', { durable: false });
  
    const { queue } = await channel.assertQueue('', { exclusive: true });
    console.log(`Waiting for messages in PubSub Asan queue: ${queue}`);
  
    channel.bindQueue(queue, exchangeName, '');
  
    channel.consume(queue, async (msg) => {
        const content = msg.content.toString();
      console.log(`Received: ${msg.content.toString()}`);
      await bugsAsanapubsub(content);
      await sendBugTrello(content);

    }, { noAck: true });
  }
 
