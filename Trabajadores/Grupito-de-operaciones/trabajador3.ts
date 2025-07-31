import { Jimp } from 'jimp';

export async function processP3(imageBuffer: Buffer) {
    try {
        // ! Crear
        const image = await Jimp.read(imageBuffer);

        // ? Calcular
        const pHash = image.hash();  // Devuelve un string

        console.log('Perceptual Hash:', pHash);
    } catch (err) {
        console.error('Error en el procesamiento de P3:', err);
    }
}