var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var SSE = require('express-sse');
var sse = new SSE();
var dataFile = './data.txt';
var datas = [];
var lastDatas = '[]';

// To get post values
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set static dir
app.use('/assets', express.static('bower_components'));

// Check if data file exists, if not exists then create the file
if(!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '[]');
} else {
    lastDatas = fs.readFileSync(dataFile, 'utf8');
    datas = JSON.parse(lastDatas);
}
sse.updateInit(datas);

// Watch the datas array, on change, save to db
setInterval(function(){
    if(JSON.stringify(datas) !== lastDatas) {
        var stringified = JSON.stringify(datas);
        fs.writeFile(dataFile, stringified, function(err){
            if(err) throw err;
            console.log(dataFile + ' updated');
            lastDatas = stringified;
        });
    }
}, 300);


// When the user goes to the / route, send view
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/ex3.html');
});

//  When the user posts to /message get the text param and add it to the datas array
app.post('/message', function(req, res) {
    var newMessage = {
        message: req.body.message,
        username: req.body.username,
        timestamp: Date.now()
    };
    var length = datas.push(newMessage);
    sse.send(newMessage);
    sse.updateInit(datas);
    res.send(length + '');
});

//  When the user goes to /messages let sse does it's magic
app.get('/messages', sse.init);

//  Start the server
app.listen(3000, function(){
    console.log('Express serving on port 3000');
});