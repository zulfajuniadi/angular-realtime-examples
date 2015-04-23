var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
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
    res.sendFile(__dirname + '/views/ex2.html');
});

//  When the user posts to /message get the text param and add it to the datas array
app.post('/message', function(req, res) {
    var length = datas.push({
        message: req.body.message,
        username: req.body.username,
        timestamp: Date.now()
    });
    res.send(length + '');
});

//  When the user goes to /messages only send the spliced array if its length > 0
app.get('/messages', function(req, res) {
    var last = parseInt(req.query.last, 10);
    var interval = setInterval(function(){
        var data = datas.slice(last);
        // only send response when data length > 0
        if(data.length > 0) {
            clearInterval(interval);
            res.send(data);
        }
    }, 10);
});

//  Start the server
app.listen(3000, function(){
    console.log('Express serving on port 3000');
});