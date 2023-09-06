const amqp = require("amqplib");
const { sendBugTrello } = require("../../controllers/trello/pubsubtrello");

exports.subscribetrello = async function () {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();

  const exchangeName = 'topic_logs';

  // Use 'topic' as the exchange type, not 'topic_logs'
  await channel.assertExchange(exchangeName, 'topic', { durable: false });

  const routingKey = 'bugs';

  const { queue } = await channel.assertQueue('', { exclusive: true });
  console.log(`Waiting for messages in PubSub Trello queue: ${queue}`);

  // Bind the queue to the specified routing key
  channel.bindQueue(queue, exchangeName, routingKey);

  channel.consume(queue, async (msg) => {
    const content = msg.content.toString();
    console.log(`Received: ${msg.content.toString()}`);

    await sendBugTrello(content);

  }, { noAck: true });
}

    // channel.consume(queue, async (msg) => {
    //     const content = msg.content.toString();
    //   console.log(`Received: ${msg.content.toString()}`);
    //   await bugsAsanapubsub(content);
    //   await sendBugTrello(content);

    // }, { noAck: true });
  // }
 
