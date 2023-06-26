import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'
import { greetings } from './modules/greetings.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let username;

const main = async () => {

  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
  });

  if (process.argv.find(el => el.includes('--username'))) {
    username = process.argv.find(el => el.includes('--username')).split('=')[1];
  }

  await greetings(username);

  rl.prompt();
  rl.on('line', (input) => {
    if (input == '.exit') {
      rl.close();
    }
  });
  rl.on('close', () => console.log(`Thank you for using File Manager, ${username}, goodbye!`))

  
}

await main();