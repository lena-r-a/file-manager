import fs from 'fs'

export const removeFile = async (pathToFile) => {

    fs.access(pathToFile, (err) => {
        if (err) {
            console.log('Invalid input');
        } else {
            fs.unlink(pathToFile, (error) => {
                if (error) {
                    console.log(error)
                }
                console.log("Deleted.");
            });
        }
    })
};