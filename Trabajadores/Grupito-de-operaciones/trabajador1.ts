import { Jimp } from 'jimp';

export async function processP1(imageBuffer: Buffer) {
    try {
        // ? Crear un objeto JIMP
        const image = await Jimp.read(imageBuffer);

        // ! Convertirlo a string con su método
        const base64Image = await image.getBase64("image/jpeg", { quality: 50 });

        console.log('Base64 Image:', base64Image);
    } catch (err) {
        console.error('Error en el procesamiento de P1:', err);
    }
}