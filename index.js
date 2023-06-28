import fs, { stat } from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'
import { greetings } from './modules/greetings.js'
import { ls } from './modules/ls.js'
import { read } from './modules/readFile.js'
import { addFile } from './modules/addFile.js'
import { rename } from './modules/rename.js'
import { copyFile } from './modules/cp.js'
import { moveFile } from './modules/mv.js'
import { removeFile } from './modules/rm.js'
import { getOSdata } from './modules/os.js'

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
        if (currentDir != path.parse(currentDir).root) {
          currentDir = path.dirname(currentDir);
          console.log(`You are currently in ${currentDir}`);
        } else {
          console.log(`You are currently in ${currentDir}`);
        }
        break;
      case input.startsWith('cd '):
        fs.stat(input.substring(3).replace(/"/g, ''), (err, stats) => {
          if (err) {
            fs.stat(path.join(currentDir, input.substring(3).replace(/"/g, '')), (error, st) => {
              if (error) {
                console.log('Invalid input');
                console.log(`You are currently in ${currentDir}`);
              } else {
                if (st.isFile()) {
                  console.log('Invalid input');
                  console.log(`You are currently in ${currentDir}`);
                } else {
                  currentDir = path.join(currentDir, input.substring(3).replace(/"/g, ''));
                  console.log(`You are currently in ${currentDir}`);
                }
              }
            })
          } else {
            if (stats.isFile()) {
              console.log('Invalid input');
              console.log(`You are currently in ${currentDir}`);
            } else {
              currentDir = input.substring(3).replace(/"/g, '');
              console.log(`You are currently in ${currentDir}`);
            }

          }
        })
        break;

      case input == 'ls':
        ls(currentDir);
        console.log(`You are currently in ${currentDir}`);
        break;

      case input.startsWith('cat '):
        fs.stat(input.substring(4).replace(/"/g, ''), (err, stats) => {
          if (err) {
            console.log('Invalid input');
            console.log(`You are currently in ${currentDir}`);
          } else {
            if (stats.isFile()) {
              read(input.substring(4).replace(/"/g, ''));
              console.log(`You are currently in ${currentDir}`);
            } else {
              console.log('Invalid input');
              console.log(`You are currently in ${currentDir}`);
            }
          }
        })
        break;

      case input.startsWith('add '):
        addFile(currentDir, input.substring(4).replace(/"/g, ''));
        console.log(`You are currently in ${currentDir}`);
        break;

      case input.startsWith('rn '):
        let parts = input.split(' ');
        if (parts.length == 3) {
          rename(parts[1].replace(/"/g, ''), parts[2].replace(/"/g, ''));
          console.log(`You are currently in ${currentDir}`);
        } else {
          console.log('Invalid input!')
        }
        break;
      case input.startsWith('cp '):
        let cp_parts = input.split(' ');
        if (cp_parts.length == 3) {
          copyFile(cp_parts[1].replace(/"/g, ''), cp_parts[2].replace(/"/g, ''));
          console.log(`You are currently in ${currentDir}`);
        } else {
          console.log('Invalid input!')
        }
        break;
      case input.startsWith('mv '):
        let mv_parts = input.split(' ');
        if (mv_parts.length == 3) {
          moveFile(mv_parts[1].replace(/"/g, ''), mv_parts[2].replace(/"/g, ''));
          console.log(`You are currently in ${currentDir}`);
        } else {
          console.log('Invalid input!')
        }
        break;

      case input.startsWith('rm '):
        removeFile(input.substring(3).replace(/"/g, ''));
        console.log(`You are currently in ${currentDir}`);
        break;

      case input.startsWith('os '):
        getOSdata(input);

      default:

    }

  });
  rl.on('close', () => console.log(`Thank you for using File Manager, ${username}, goodbye!`))


}

await main();