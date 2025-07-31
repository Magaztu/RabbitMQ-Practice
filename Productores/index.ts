import { sendToQueueWrapper } from './dispositivo_IoT';
import axios from 'axios';

const TASK_INTERVAL = 5000;  // Intervalo para enviar tareas (en milisegundos)

console.log('Iniciando productor IoT...');

const startProducer = () => {
  setInterval(async () => {
    const task = await generateTask();  // ? Permite crear la tarea
    console.log('Tarea generadita:', task);
    sendToQueueWrapper(task);  // ! Envía la tarea a RabbitMQ
  }, TASK_INTERVAL); // * El intervalo de arriba
};

interface Idata {
  message: string;
  status: string;
}

const generateTask = async () => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random'); // Api de perritos como en Prog3
    const data: Idata = response.data;

    return {
      id: Date.now(),
      type: 'image-analysis',
      payload: {
        imageUrl: data.message, // La URL de la imagen aleatoria de perros
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    throw error;
  }
};

// generateTask().then(task => console.log(task)); // ! Comprobar si funciona

startProducer();
