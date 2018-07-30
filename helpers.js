const helpers = {};

const chars = [
    "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", "~",
    ".", "/", ":", ";", "<", "=", ">", "?", "[", "\\", "]", "_", "{", "}",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " ",
]
helpers.getRandomArbitrary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
helpers.getRandomChar = function () {
    return chars[this.getRandomArbitrary(0, chars.length)]
}
helpers.write = function (char, x, y) {
    if(x !==undefined && y!==undefined) process.stdout.cursorTo(x,y);
    process.stdout.write(char)
}
module.exports = helpers;