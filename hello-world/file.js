const { isUtf8 } = require("buffer");
const { log } = require("console");
const fs = require("fs");
const os = require("os");


// fs.writeFileSync('./test.cpp', "#include<iostream> \n using namespace std;")
// 

// const result = fs.readFileSync("./contact.txt", "utf-8")
// console.log(result);

// fs.appendFileSync('./test.txt', `\n${new Date().getDate().toLocaleString()}`)


// sync - blocking req
/*
console.log("1");

const result = fs.readFileSync("./test.cpp", "utf-8")
console.log(result);

console.log("2");
*/

// async - non blocking


/*
console.log("1");

fs.readFile("./test.cpp", "utf-8", (err,result) =>{
    if(err)
        console.log("Error");
    else
        console.log(result);
          
})

console.log("2");
console.log("3");
*/

console.log(os.cpus().length);
