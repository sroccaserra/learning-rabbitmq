var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(channelCallback);

  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});

function channelCallback(err, channel) {
  if (err) {
    throw err;
  }
  const queue = 'seb';
  const msg = 'Hello world';

  channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(msg), {persistent: true});
  console.log(" [x] Sent %s", msg);
}
