const path = require("path")

const filePath = "/user/local/bin/win/zip/file.txt"

// const fileName = path.basename(filePath)

// console.log(fileName);

// const dirName = path.dirname(filePath)

// console.log(dirName);

// const fileExt = path.extname(filePath)
// console.log(fileExt);

// const fullPath = path.join('/user', 'local', 'bin', 'file.txt')

const parsedPath = path.parse('/user/local/bin/win/zip/file.txt')
console.log(parsedPath);



