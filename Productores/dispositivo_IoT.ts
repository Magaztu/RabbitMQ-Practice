import { Connection } from 'rabbitmq-client';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
const EXCHANGE = 'tasks-exchange'; // & Nombre del intercambio
const ROUTING_KEY = 'task.routing'; // & Clave de enrutamiento

// ~ Función para enviar tareas a la cola de RabbitMQ
export const sendToQueueWrapper = async (task: any) => {
  try {
    const rabbit = new Connection(RABBITMQ_URL);

    const pub = rabbit.createPublisher({
      confirm: true,
      exchanges: [{ exchange: EXCHANGE, type: 'direct' }]
    });

    // Publicamos el mensaje (task) con la clave de enrutamiento
    await pub.send({ exchange: EXCHANGE, routingKey: ROUTING_KEY }, task);
    console.log(`Tarea enviada a la cola: ${JSON.stringify(task)}`);

    await pub.close();
    await rabbit.close();
  } catch (error) {
    console.error('Error al enviar tarea a RabbitMQ:', error);
  }
};
