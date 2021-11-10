const { TIMEOUT } = require('dns');
const fs = require('fs');
const path = require('path');

const folderProjectDist = path.join(__dirname,'project-dist');
const folderComponents = path.join(__dirname,'components');
const PathTemplateHTML = path.join(__dirname,'template.html');
const folderStyles = path.join(__dirname,'styles');
const folderAssets = path.join(__dirname,'assets');

const folderPDAssets = path.join(__dirname,'project-dist','assets');
const folderPDAssetsFonts = path.join(__dirname,'project-dist','assets','fonts');
const folderPDAssetsImg = path.join(__dirname,'project-dist','assets','img');
const folderPDAssetsSvg = path.join(__dirname,'project-dist','assets','svg');


// console.log(folderProjectDist);
// console.log(folderComponents);
// console.log(PathTemplateHTML);
// console.log(folderPDAssets);
// console.log(folderPDAssetsFonts);
// console.log(folderStyles);

let buferComponents ='';

function createDir(pathDir) {
    fs.mkdir(pathDir,{recursive: true},(err) =>{
        if (err) {
            throw new Error(err);
        }
    });
    fs.readdir(pathDir, (err,data) => {
        if (err) {
            throw new Error(err);
        }
        if (data.length >0 ) {
            data.forEach(element => {

                fs.stat(`${pathDir}\\${element}`,(err,stats) =>{
                    if (err) {
                        throw new Error(err);
                    }

                    if (stats.isFile()) {
                        fs.unlink(`${pathDir}\\${element}`,(err) => {
                            if (err) {
                                throw new Error(err);
                            }
                        });
                    }
                })
            });
        }
        
    });
   
}
//--------------------------------------------------
function copyFile(startFolder,finishFolder) {
    fs.readdir(startFolder,(err,data) => {
        if (err) {
            throw new Error(err);
        }
        
        data.forEach(element => {
            fs.copyFile(`${startFolder}\\${element}`,`${finishFolder}\\${element}`,(err) => {
                if (err) {
                    throw new Error(err);
                }

            });
        
        });
    });
    
}

function createCSS() {

    fs.readdir(folderStyles, (err,data) =>{  // собираем css
        if (err) {
            throw new Error(err);
        }
        const writeStream = fs.createWriteStream(`${folderProjectDist}\\style.css`);
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
                }
           })
        });
        
        });   
}

function createHTML() {
    fs.copyFile(PathTemplateHTML,`${folderProjectDist}\\index.html`,(err)=>{  //собираем HTML
        if (err) {
            throw new Error(err);
        }
        
            fs.readFile(`${folderProjectDist}\\index.html`,'utf-8',(err,dataFile) =>{

                fs.readdir(folderComponents,(err,data) => {
                    if (err) {
                        throw new Error(err);
                    }
                   // console.log(data);
                    data.forEach(element => {
                        const readStream = fs.createReadStream(`${folderComponents}\\${element}`); // откр поток для кажд файла в дир.
                        let name = path.basename(element).replace((path.extname(element)),'');
                        readStream.on('data',(chunk) =>{
                            buferComponents = chunk.toString();
                            dataFile = dataFile.replace(`{{${name}}}`,buferComponents);

                            fs.writeFile(`${folderProjectDist}\\index.html`,dataFile,(err) =>{
                                if (err) {
                                    throw new Error(err);
                                }
                            });

                        })
                    });
                });
            });
    });
}
//---------------------------------------------

fs.mkdir(folderProjectDist,{recursive: true},(err) => {
    if (err) {
        throw new Error(err);
    }


    fs.readdir(folderProjectDist, (err,data) => {
        if (err) {
            throw new Error(err);
        }
            createDir(folderPDAssets);
            createDir(folderPDAssetsFonts);
            createDir(folderPDAssetsImg);
            createDir(folderPDAssetsSvg);

           
            setTimeout(() => {
                copyFile(`${folderAssets}\\fonts`,folderPDAssetsFonts);
                copyFile(`${folderAssets}\\img`,folderPDAssetsImg);
                copyFile(`${folderAssets}\\svg`,folderPDAssetsSvg);
             }, 20);
        


        if (data.length >0 ) {
            data.forEach(element => {

                fs.stat(`${folderProjectDist}\\${element}`,(err,stats) =>{
                    if (err) {
                        throw new Error(err);
                    }

                    if (stats.isFile()) {
                        fs.unlink(`${folderProjectDist}\\${element}`,(err) => {
                            if (err) {
                                throw new Error(err);
                            }
                        });
                    }
                })
            });
        }
        
    });
    setTimeout(() => {
        createCSS();
        createHTML();
     }, 20);

  

});