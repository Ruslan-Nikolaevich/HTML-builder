const fs = require('fs');
const readline = require('readline');

const writeStream = fs.createWriteStream('./02-write-file/data.txt');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Привет !!!');

rl.question('Увековечьте Ваши мысли )) \n', (userInput) => {
    if (userInput.trim() == 'exit') {
        rl.close();
    } else {
        writeStream.write(`${userInput}\n`);
        rl.setPrompt('Продолжаем ?\n для Выхода наберите exit или ctrl + c\n')
        rl.prompt();
        rl.on('line', (userInput) => {
            if (userInput == 'exit') {
                rl.close();
            } else {
                writeStream.write(`${userInput}\n`);
                rl.setPrompt('Продолжаем ?\n для Выхода наберите exit или ctrl + c\n')
                rl.prompt();
            }
        });
    }
})


rl.on('close',() => {
    console.log('Всего доброго !!!');
});
