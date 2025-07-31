import { Connection } from 'rabbitmq-client';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
const EXCHANGE = 'tasks-exchange'; // & Nombre del intercambio
const ROUTING_KEY = 'task.routing'; // & Clave de enrutamiento
const QUEUE_NAME = 'imagenes_queue'; // & Nombre de la cola
let primera_vez = true;

const rabbit = new Connection(RABBITMQ_URL);

if(primera_vez){
  
  // * Declaración de la cola
  rabbit.queueDeclare({ queue: QUEUE_NAME, durable: true});

  // ! Hay que declarar el exchange porque el rabbitMQ es bien tontote y no puede generarlo implícitamente
 // rabbit.exchangeDeclare({ exchange: EXCHANGE, type: 'direct', durable: true }); // ? Pasive: true evita errores de conflicto, es como un if exists de sql
  
 // rabbit.queueBind({ queue: QUEUE_NAME, exchange: EXCHANGE, routingKey: ROUTING_KEY });

}

const pub = rabbit.createPublisher({
  confirm: true
  // exchanges: [{ exchange: EXCHANGE, type: 'direct'}]
});

// ~ Función para enviar tareas a la cola de RabbitMQ
export const sendToQueueWrapper = async (task: any) => {
  try {

    await pub.send(QUEUE_NAME, task);
    console.log(`Tarea enviada a la cola: ${JSON.stringify(task)}`);


    // await pub.close();
    // await rabbit.close();
  } catch (error) {
    console.error('Error al enviar tarea a RabbitMQ:', error);
  }
};
