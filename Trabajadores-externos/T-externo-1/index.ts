import { Connection } from 'rabbitmq-client';

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
        const sub2 = rabbit.createConsumer(
            {
                queue: QUEUE_NAME,
                queueOptions: { durable: true },
                qos: { prefetchCount: 2 },
            },
            async (msg) => {
                try {
                    if (msg) {
                        // & Parseo
                        const { id, type, payload } = msg.body;
                        
                        // & Deconstrucción del payload
                        const { imageUrl, timestamp } = payload;
                        console.log('Received message:', { id, type, imageUrl, timestamp });

                        // & Procesamiento del timestamp
                        const messageDate = new Date(timestamp);
                        const etapaDia = getEtapaDelDia(messageDate);
                        const estacion = getEstacion(messageDate);
                        const etapaMes = getEtapaDelMes(messageDate);

                        console.log(`ID: ${id}, Timestamp: ${timestamp}`);
                        console.log(`Etapa del día: ${etapaDia}`);
                        console.log(`Estación: ${estacion}`);
                        console.log(`Etapa del mes: ${etapaMes}`);
                    }
                } catch (err) {
                    console.error('Error processing message:', err);
                }
            }
        );

        sub2.on('error', (err) => {
            console.error('Error in consumer:', err);
        });
    } catch (err) {
        console.error('Error connecting to RabbitMQ:', err);
    }
}

// * Funciones para el procesamiento de fechas

function getEtapaDelDia(date: Date) {
    const hour = date.getHours();
    if (hour >= 6 && hour < 12) {
        return 'mañana';
    } else if (hour >= 12 && hour < 19) {
        return 'tarde';
    } else {
        return 'noche';
    }
}

function getEstacion(date: Date) {
    const month = date.getMonth(); 

    if (month >= 0 && month <= 4) { // Enero, Febrero, Marzo, Abril, Mayo
        return 'invierno (época de lluvias)';
    } else { // Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre
        return 'verano (época seca)';
    }
}

function getEtapaDelMes(date: Date) {
    const dayOfMonth = date.getDate();
    if (dayOfMonth <= 7) {
        return 'primera semana';
    } else if (dayOfMonth <= 14) {
        return 'segunda semana';
    } else if (dayOfMonth <= 21) {
        return 'tercera semana';
    } else {
        return 'cuarta semana';
    }
}

// ! Función para iniciar el trabajador
startWorker();