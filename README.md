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


So, long story short, a piece of code will simulate a IoT device generating data and it'll be sent to a RabbitMQ queue for workers to access and process off of.
`Preliminary idea`: One of the workers could be a monitoring device, using Prometheus(metrics) and Graphana(Dashboard).
