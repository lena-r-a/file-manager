import fs, { stat } from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'
import { greetings } from './modules/greetings.js'
import { ls } from './modules/ls.js'
import { read } from './modules/readFile.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let username;

const main = async () => {

  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
  });

  const userHomeDir = os.homedir();
  let currentDir = userHomeDir;

  if (process.argv.find(el => el.includes('--username'))) {
    username = process.argv.find(el => el.includes('--username')).split('=')[1];
  }

  await greetings(username);
  console.log(`You are currently in ${userHomeDir}`);

  rl.prompt();
  rl.on('line', (input) => {

    switch (true) {

      case input == '.exit':
        rl.close();

      case input == 'up':
        if (currentDir.split('\\')[1]) {
          currentDir = currentDir.split('\\').slice(0, -1).join('\\');
          console.log(`You are currently in ${currentDir}`);
        } else {
          console.log(`You are currently in ${currentDir}`);
        }
        break;
      case input.startsWith('cd '):
        fs.stat(input.substring(3), (err, stats) => {
          if (err) {
            fs.stat(path.join(currentDir, input.substring(3)), (error, st) => {
              if (error) {
                console.log('Invalid input');
                console.log(`You are currently in ${currentDir}`);
              } else {
                if (st.isFile()) {
                  console.log('Invalid input');
                  console.log(`You are currently in ${currentDir}`);
                } else {
                  currentDir = path.join(currentDir, input.substring(3));
                  console.log(`You are currently in ${currentDir}`);
                }
              }
            })
          } else {
            if (stats.isFile()) {
              console.log('Invalid input');
              console.log(`You are currently in ${currentDir}`);
            } else {
              currentDir = input.substring(3);
              console.log(`You are currently in ${currentDir}`);
            }

          }
        })
        break;

      case input=='ls':
        ls(currentDir);
        break;

      case input.startsWith('cat '):
        fs.stat(input.substring(4), (err, stats) => {
          if (err) {
            console.log('Invalid input');
          } else {
            if (stats.isFile()) {
              read(input.substring(4));
            } else {
              console.log('Invalid input');
            }
          }
        })
        break;
        default:

    }

  });
  rl.on('close', () => console.log(`Thank you for using File Manager, ${username}, goodbye!`))


}

await main();