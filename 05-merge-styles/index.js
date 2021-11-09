const fs = require('fs');
const path = require('path');
const folderStyles = path.join(__dirname,'styles');
const folderProjectDist = path.join(__dirname,'project-dist');

fs.readdir(folderProjectDist, (err,data) =>{
    if (err) {
        throw new Error(err);
    }
    data.forEach(element => {
        if (element == 'bundle.css') {
           fs.unlink(`${folderProjectDist}\\bundle.css`, (err) => {
            if (err) {
                throw new Error(err);
            }
           
           })
        } 
    });
    

    fs.readdir(folderStyles, (err,data) =>{
        if (err) {
            throw new Error(err);
        }
        const writeStream = fs.createWriteStream(`${folderProjectDist}\\bundle.css`);
        data.forEach(element => {
          
            fs.stat(`${folderStyles}\\${element}`,(err,stats) =>{
            if (err) {
                throw new Error(err);
            }
                if (stats.isFile() && path.extname(element) == '.css') {
                    const readStream = fs.createReadStream(`${folderStyles}\\${element}`);
                    readStream.on('data',(chunk) =>{
                        writeStream.write(chunk);
                    })
                    // readStream.pipe(writeStream);
                    console.log(`Файл ${element} добавлен`);
                }
           })
        });
        
        });



});