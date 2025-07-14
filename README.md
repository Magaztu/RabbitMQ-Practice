# RabbitMQ-Practice
This is a little IOT implementation of a broker, in this case, RabbitMQ.

Create a descentralized system where multiple IoT send tasks (eg. updates, image analysis) to a group of workers that process them.

## Technologies:
  - RabbitMQ, working queues.
  - Npm RabbitMQ-client, producers and cosumers.
  - Docker Compose, arrange the containers.
  - Api with ExpessJS (might discard).
  - Simulated IoT component, code.

## Arrangement:
IoT Device -> RabbitMQ Producer -> RabbitMQ Queue -> Worker Pool

### Technologies placement:
These will be hosted in dockers:
  - RabbitMQ client
  - Worker Pool
  - IoT Device


It should... `tbr`
