import { Connection } from 'rabbitmq-client';
import axios from 'axios';
import { processP1 } from './Grupito-de-operaciones/trabajador1';
import { processP2 } from './Grupito-de-operaciones/trabajador2';
import { processP3 } from './Grupito-de-operaciones/trabajador3';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
const QUEUE_NAME = 'imagenes_queue';

async function startWorker() {
    try {
        const rabbit = new Connection(RABBITMQ_URL);

        rabbit.on('error', (err) => {
            console.error('RabbitMQ connection error', err);
        });

        rabbit.on('connection', () => {
            console.log('Connection successfully (re)established');
        });

        // ! Consumidor
        const sub = rabbit.createConsumer(
            {
                queue: QUEUE_NAME,
                queueOptions: { durable: true },
                qos: { prefetchCount: 2 },
            },
            async (msg) => {
                try {
                    if (msg) {
                        // & Parseo
                        const { id, type, payload } = JSON.parse(msg.body.toString());
                        
                        // & Deconstrucción del payload
                        const { imageUrl, timestamp } = payload;
                        console.log('Received message:', { id, type, imageUrl, timestamp });

                        // & Fetch del binario
                        const imageBuffer = await fetchImage(imageUrl);

                        // ! Operaciones
                        await processP1(imageBuffer);  // Conversión a Base64
                        await processP2(imageBuffer);  // Extracción de colores / píxeles
                        await processP3(imageBuffer);  // Cálculo de hash porcentual
                    }
                } catch (err) {
                    console.error('Error processing message:', err);
                }
            }
        );

        sub.on('error', (err) => {
            console.error('Error in consumer:', err);
        });
    } catch (err) {
        console.error('Error connecting to RabbitMQ:', err);
    }
}

// Axios function to fetch image
export async function fetchImage(url: string): Promise<Buffer> {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data);
    } catch (err) {
        console.error('Error fetching image from URL:', err);
        throw err;
    }
}

startWorker();
