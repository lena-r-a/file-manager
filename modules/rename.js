import fs from 'fs'
import path from 'path'

export const rename = async (pathToFile, fileName) => {

  fs.stat(pathToFile, (err, stats) => {
    if (err) {
      console.log('Invalid input');
    } else {
      if (stats.isFile()) {
        let pathToFolder = path.dirname(pathToFile);
        fs.access(path.join(pathToFolder, fileName), (err) => {
          if (err) {
            fs.rename(pathToFile, path.join(pathToFolder, fileName), (error) => {
              if (error) console.log(error)
            })
          } else {
            console.log('Invalid input');
          }

        })
      } else {
        console.log('Invalid input');
      }

    }
  })

};
