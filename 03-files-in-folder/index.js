const fs = require('fs');
const path = require('path');

fs.readdir('./03-files-in-folder/secret-folder', (err,data) =>{
if (err) {
    throw new Error(err);
}
data.forEach(element => {
  
    fs.stat(`./03-files-in-folder/secret-folder/${element}`,(err,stats) =>{
    if (err) {
        throw new Error(err);
    }
        if (stats.isFile()) {
            console.log(`<имя файла>: ${element}  <расширение файла>: ${path.extname(element)} <вес файла>: ${(stats.size/1024).toFixed(2)} Кб`);
        }
   })
});

});