import fs from 'fs'

export const ls = async (dirPath) => {
  let folders = [];
  let files = [];
  fs.readdir(dirPath, { withFileTypes: true }, (error, data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].isFile()) {
        files.push({'Name': data[i].name, 'Type': 'file'});
      } else {
        folders.push({'Name': data[i].name, 'Type': 'directory'});
      }
    }
    // console.log(files.sort(),'files')
    // console.log(folders.sort(), 'folders');
    console.table(folders.sort().concat(files.sort()));
  })
}