const express = require('express');
const validUrl = require('valid-url');
const tinyurl = require('tinyurl-api');

//use the application off of express.
var app = express();
var tinyUrl;

//define the route for "/"
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.get("/getURL", function (request, response) {
    var longUrl = request.query.longUrl;

    if (longUrl != "") {
        if (validUrl.isHttpUri(longUrl)) {
            (async () => {
                tinyUrl = await tinyurl("https://google.com");
                sendResponse(tinyUrl, response)
            })();
        } else {
            sendResponse("invalid URL", response)
        }
    } else {
        sendResponse("Faild to Cut the URL", response)
    }
});

function sendResponse(str, response) {
    response.send("<div id='result'>" + str + "</div>");
}


//start the server
app.listen(8080);
