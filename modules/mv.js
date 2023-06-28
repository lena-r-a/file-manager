import fs, { createWriteStream, createReadStream } from 'fs'
import path from 'path'
import { finished } from 'stream' 

export const moveFile = async (filePath, folderPath) => {

  fs.access(filePath, (err) => {
    if (err) { console.log('Invalid input') }
    else {
      const rs = createReadStream(filePath);
      fs.access(folderPath, (err) => {
        if (err) { console.log('Invaдid input') }
        else {
          const ws = createWriteStream(path.join(folderPath, path.parse(filePath).base));
          rs.pipe(ws);
          fs.unlink(filePath, () => {
            console.log('file moved');
          })
        }
      })
    }
  })
}