import dotenv from 'dotenv';
dotenv.config();

import { App } from './App';

async function main () {
    const app = new App(3100);
    await app.listen();
}

main();