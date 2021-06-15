## What we wanted

We wanted to setup a small RabbitMQ server and send a persistend message in a queue, using Node.js.

## What we did

We installed the `rabbitmq:3-management` docker image, and followed this tutorial:

- <https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html>

When the server is running, the management console is available here: <http://localhost:15672/#/>

After making work the first send / receive non persistent example, we set on to make it persistent.

To set the data dir and node name in the rabbitmq-env.conf file:

```
MNESIA_DIR=/data
NODENAME=100rabbits@localhost
```

Start the server with a volume mounted on /data and on /etc/rabbitmq/rabbitmq-env.conf:

```
$ docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 -v $(pwd)/rabbitmq-env.conf:/etc/rabbitmq/rabbitmq-env.conf -v $(pwd)/data:/data rabbitmq:3-management
```

To persist the message, we need to create the queue with the `{durable: true}` option:

```
  channel.assertQueue(queue, { durable: true });
```

And to send the message with the `{persistent: true}` option:

```
  channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
```

## References

- <https://www.enterpriseintegrationpatterns.com/patterns/messaging/index.html>
- <https://www.squaremobius.net/amqp.node/channel_api.html>
- <https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html>
