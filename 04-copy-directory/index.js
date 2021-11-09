const fs = require('fs');
const path = require('path');

const folderFilesPath = path.join(__dirname,'files');
const folderCopyFilesPath = path.join(__dirname,'files-copy');


function copyFolder(folderFilesPath,folderCopyFilesPath) {
    fs.mkdir(folderCopyFilesPath,{recursive: true}, (err) =>{
        if (err) {
            throw new Error(err);
        }
    
        fs.readdir(folderCopyFilesPath, (err,data) => {
            if (err) {
                throw new Error(err);
            }
    
            if (data.length >0) {
                data.forEach(element => {
                    fs.unlink(`${folderCopyFilesPath}\\${element}`,(err) => {
                        if (err) {
                            throw new Error(err);
                        }
                    });
                });
            }
            
        });
    
        fs.readdir(folderFilesPath,(err,data) => {
            if (err) {
                throw new Error(err);
            }
            
            data.forEach(element => {
                fs.copyFile(`${folderFilesPath}\\${element}`,`${folderCopyFilesPath}\\${element}`,(err) => {
                    if (err) {
                        throw new Error(err);
                    }
    
                });
               
            });
        });
    });
}

copyFolder(folderFilesPath,folderCopyFilesPath);

