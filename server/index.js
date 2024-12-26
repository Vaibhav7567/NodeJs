const http = require("http")
const fs = require("fs")
const url = require("url")

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.url} New req received\n`

    const myUrl = url.parse(req.url, true)
    console.log(myUrl);
    

    if(req.url === '/favicon.ico') return res.end();
    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case '/': res.end("Home page")
                break

            case '/about':
                const username = myUrl.query.myname;
                const userid = myUrl.query.userid;
            res.end(`hi, ${username} ${userid}`)
                break

            default : res.end("404 page not found")

        }
    })

});

myServer.listen(8000, () => console.log("Server Started"))
