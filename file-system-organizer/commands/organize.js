
const fs = require('fs')
const path = require('path')

let types = {
    media: ['mp4' , 'mkv'],
    archives: ['zip' , '7z' , 'rar', 'tar', 'gz',, 'ar','iso', 'xz'],
    documents: ['docx', 'doc', 'pdf','xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'text'],
    app: ['exe', 'dmg', 'pkg', 'deb']
}

function organizeFn(dirPath){
    let destPath;
    if(dirPath == undefined){
       destPath = process.cwd();
    }else{
        let doesExist = fs.existsSync(dirPath)
        if(doesExist){
            destPath = path.join(dirPath,'organized_files');
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }
        }else{
            console.log('path does not exist')
            return;
        }
    }

    organizeHelper(dirPath,destPath);
}

function organizeHelper(src,dest){
    let childNames = fs.readdirSync(src);
    for(let i = 0; i < childNames.length; i++){
        let childAddress = path.join(src,childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            let category = getCategory(childNames[i]);

            sendFiles(childAddress , dest , category);
        }
    }
}

function getCategory(name){
    let ext = path.extname(name)
    ext = ext.slice(1)
    for(let type in types){
        let cTypeArray = types[type];
        for(let i = 0; i < cTypeArray.length; i++){
            if(cTypeArray[i] == ext){
                return type;
            }
        }
    }
    return 'others'
}

function sendFiles(srcFilePath , dest , category){
    let categoryPath = path.join(dest , category)
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }

    let filName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath,fileName)

    fs.copyFileSync(srcFilePath , destFilePath);
    fs.unlinkSync(srcFilePath);

    console.log(fileName , ' copied to ', category)
}

module.exports = {
    organizeKey:organizeFn
}