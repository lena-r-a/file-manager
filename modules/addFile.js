import fs from 'fs'
import path from 'path'

export const addFile = async(currDir, fileName) => {
  fs.writeFile(path.join(currDir, fileName), "Текст", function(err){
    if (err) {
        console.log('Invalid input');
    } else {
        console.log("File created");
    }
});
}