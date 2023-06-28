import { createHash } from "crypto"
import fs from 'fs/promises'

export const calculateHash = async (filepath) => {
  try {
    const read = await fs.readFile(filepath);
    const hash = createHash("sha256").update(read).digest('hex');

    console.log(hash);
  } catch {
    console.log('File not found')
  }



};