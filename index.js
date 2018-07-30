#!/usr/bin/env node
const readline = require('readline');
const Promise = require('bluebird');
const helpers = require('./helpers');

/**
 * Init Space to blank
 */
for (let i = 0; i < process.stdout.rows; i++) {
    console.log()
}

/**
 * Represent stdin terminal width 2D array
 */
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
let lines = []
rl.on('line', function (line) {
    line = line.split('')
    lines.push(line.map((letter, x) => {
        return {
            letter,
            done: false,
            y: lines.length,
            x
        }
    }));
})

/**
 * if randomState is true all characters are replace with random
 * else characters are replace only they're not good
 */
let randomState = true;
function writeDecode(waitTime) {
    lines = lines.map((line, y) => {
        return line.filter((character, x) => !character.done)
    })
    
    lines.map((line, y)=>{
        line.map((character, x) => {
            let randomCharacter = helpers.getRandomChar();
            if(y > process.stdout.rows - 2) {
                return
            }
            if (!randomState && (character.letter === randomCharacter )) {
                character.done = true;
                setTimeout(() => {
                    process.stdout.cursorTo(character.x, character.y);
                    process.stdout.write(character.letter + "\x1b[34m")
                }, waitTime);
            }else if(randomState){
                process.stdout.cursorTo(character.x, character.y);
                process.stdout.write(randomCharacter)
            }
        })
    })
}

/**
 * loop management 
 */
function decode(timeUntilDecode, decodeSpeed, waitTime) {
    waitTime = timeUntilDecode + waitTime
    let loop = setInterval(() => writeDecode(waitTime), 1);
    setTimeout(async () => {
        clearInterval(loop);
        randomState = false;
        lines.map((line, y) => helpers.write(' ', line.length, y))
        loop = setInterval(() => writeDecode(waitTime), decodeSpeed);
    }, timeUntilDecode);
}

/**
 * Write stdin in stdout with replaced characters 
 */
function writeFirstSchema() {
    return new Promise((resolve, reject) => {
        process.stdout.cursorTo(0,0);
        setTimeout(() => {
            return Promise.each(lines, (line, y) => {
                if (y > process.stdout.rows - 2) return;
                return Promise.each(line, (char, x) => {
                    return new Promise((resolve, reject) => {
                        helpers.write(helpers.getRandomChar())
                        setTimeout(() => {
                            resolve()
                        }, 2);
                    });
                }).then(_=>console.log())
            }).then(resolve).catch(reject)
        }, 100);
    });
}

/**
 * Launch
 */
writeFirstSchema().then(_=>{
    return decode(1000, 4, 1000);
}).catch(console.error)