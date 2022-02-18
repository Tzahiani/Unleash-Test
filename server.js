var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const validUrl = require('valid-url');
const tinyurl = require('tinyurl-api');


var app = express();
var tinyUrl;

//define the route for "/"
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({ 
    extended: true               
}));                             
app.use(bodyParser.json());      

app.use(express.static(path.join(__dirname, '../static')));


app.post('/data', function(req, res) {
    var longUrl = req.body.longUrl;
    if (longUrl != "") {
        if (validUrl.isHttpUri(longUrl)) {
            (async () => {
                tinyUrl = await tinyurl("https://google.com");
                sendResponse(tinyUrl,res)
            })();
        } else {
            sendResponse("invalid URL", res)
        }
    } else {
        sendResponse("Faild to Cut the URL", res)
    }
})

function sendResponse(str, res) {
    res.send(str);
}

//start the server
app.listen(8080);
