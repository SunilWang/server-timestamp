var serverTimestamp = require('./');
var express = require('express');
var app = express();

//default
app.use(serverTimestamp());

//set header
app.use(serverTimestamp({header: 'Example-Server-Timestamp'}));

//set header and format
app.use(serverTimestamp({
    header: 'Example-Format-Server-Timestamp',
    format: function(timestamp){
        var now = new Date(timestamp);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();

        return year + '-' + month + '-' + date + ' '+ hour + ':' + minute + ':' + second;
    }
}));

// response
app.get('/', function (req, res) {
    /*
     res results:

       {
         "x-powered-by": "Express",
         "x-server-timestamp": 1493365865576,
         "example-server-timestamp": 1493365865576,
         "example-format-server-timestamp": "2017-4-28 15:51:5"
       }
     */
    res.send(res._headers)
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});