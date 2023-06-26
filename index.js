import fs from 'fs'
import os from 'os'
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

  const userHomeDir = os.homedir();
  let currentDir = userHomeDir;

  if (process.argv.find(el => el.includes('--username'))) {
    username = process.argv.find(el => el.includes('--username')).split('=')[1];
  }

  await greetings(username);
  console.log(`You are currently in ${userHomeDir}`);

  rl.prompt();
  rl.on('line', (input) => {

    switch (input) {

      case '.exit':
        rl.close();

      case 'up':
        if (currentDir.split('\\')[1]) {
          currentDir = currentDir.split('\\').slice(0, -1).join('\\');
          console.log(`You are currently in ${currentDir}`);
        } else {
          console.log(`You are currently in ${currentDir}`);
        }
        break;
      // case startsWith("cd "):
      //   console.log("works")

      default:
        if (input.startsWith('cd ')) {
          console.log(input)
          let newpath; 
          fs.access(input.substring(3), (err) => {
            if (err) {
              newpath = path.join(currentDir, input.substring(3))
              console.log(newpath)
            } else {
              newpath = input.substring(3) ;
            }           
          })
          fs.stat(newpath, () => {
            if (err) {
              console.log('Invalid input')
            } else {
              if (!stats.isFile()) {
                currentDir = newpath;
                console.log(`You are currently in ${currentDir}`);
              } else {
                console.log('Invalid input')
              }
            }
          })

        } else {
          console.log('Invalid input');
        }
        
    }

  });
  rl.on('close', () => console.log(`Thank you for using File Manager, ${username}, goodbye!`))


}

await main();