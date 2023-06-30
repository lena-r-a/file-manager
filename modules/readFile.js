import fs from 'fs'

export const read = async (currDir) => {
  const fileStream = fs.createReadStream(currDir);
  fileStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  })
}