
import fs from 'fs'
import zlib from 'zlib'
import path from 'path'


export const compressFile = async (path_to_file, path_to_destination) => {

  fs.stat(path_to_file, (err, _) => {
    if (err) console.log('File does not exist')
    else {
      fs.stat(path_to_destination, (err, stats) => {
        if (err) console.log('Destination folder does not exist')
        else {
          if (!stats.isFile()) {
            try {
              const readStream = fs.createReadStream(path_to_file);
              const writeStream = fs.createWriteStream(path.join(path_to_destination, `${path.parse(path_to_file).name}.br`));

              const brotli = zlib.createBrotliCompress();

              const stream = readStream.pipe(brotli).pipe(writeStream);
              stream.on('finish', () => {
                console.log('Compressed');
              });
            } catch (err) {
              console.log(err)
            }

          }
        }
      })
    }
  })

}


export const decompressFile = async (path_to_file, path_to_destination) => {

  fs.stat(path_to_file, (err, _) => {
    if (err) console.log('File does not exist')
    else {
      fs.stat(path_to_destination, (err, stats) => {
        if (err) console.log(err)
        else {
          if (!stats.isFile()) {
            try {
              const readStream = fs.createReadStream(path_to_file);
              const writeStream = fs.createWriteStream(path.join(path_to_destination, `${path.parse(path_to_file).name}`));

              const brotli = zlib.createBrotliDecompress();

              const stream = readStream.pipe(brotli).pipe(writeStream);
              stream.on('finish', () => {
                console.log('Decompressed');
              });
            } catch (err) {
              console.log(err)
            }

          }

        }
      })
    }
  })
}





