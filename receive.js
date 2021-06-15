// comprendre assertQueue et durable
// promisify ?
// tuer RabbitMQ et relancer
// transactional outbox avec un PG

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (err) {
    throw err;
  }
  connection.createChannel(channelCallback);
});

function channelCallback(err, channel) {
  if (err) {
    throw err;
  }

  var queue = 'seb';

  channel.assertQueue(queue, { durable: true });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

  channel.consume(queue, function(msg) {
    console.log(" [x] Received %s", msg.content.toString());
  }, {
    noAck: true
  });
}
