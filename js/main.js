import { generatePhotosArray } from './data.js';
import { writeMiniatures } from './miniaturesWriter.js';

const photosArray = generatePhotosArray();

writeMiniatures(photosArray);
