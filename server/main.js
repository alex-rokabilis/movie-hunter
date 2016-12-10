var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var request = require('request');


app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.post('/authorize', function (req, res) {
    if (!req.body || !req.body.code) return res.sendStatus(400);

    var code = req.body.code;

    var options = JSON.stringify({
            code: code,
            client_id: "3b1a622b6f17a0f2d99618629a3e1c072fce2ae803203af643a1f882b12c15c4",
            client_secret: "3a3fac71fc36e9380cc1f38bf67e38ef4e08ac31a655b83e00c1bb62eb16aadc",
            redirect_uri: "http://localhost:4200/",
            grant_type: "authorization_code"
        });

    console.log(options)
    request({
        method: 'POST',
        url: 'https://api.trakt.tv/oauth/token',
        headers: {
            'Content-Type': 'application/json'
        },
        body: options
    }, function (error, response, body) {
        if(error) return res.sendStatus(400);

        try{
            body = JSON.parse(body);
        }catch(err){
            return res.status(500).send('Internal Server Error');
        }
        console.log(body)
        if(body.error) return res.status(400).send(body.error_description);

        if(body.access_token) return res.json(body);

        return res.status(500).send('Internal Server Error');
        
        
    });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})