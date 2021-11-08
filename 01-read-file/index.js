const fs = require('fs');

let readData = fs.createReadStream('./01-read-file/text.txt');
readData.on('data',(chunk)=>{
    console.log(chunk.toString());
});

