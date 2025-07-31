import { Jimp } from 'jimp';

export async function processP2(imageBuffer: Buffer) {
    try {
        // ! Crear
        const image = await Jimp.read(imageBuffer);

        // ? Coge el color en cierta coordenada
        const pixelColor = image.getPixelColor(1, 1); // Example coordinates

        console.log('Pixel Color at (0, 0):', pixelColor);
    } catch (err) {
        console.error('Error en el procesamiento de P2:', err);
    }
}
