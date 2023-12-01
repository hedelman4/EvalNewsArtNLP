require('dotenv').config();
const myKey = process.env.MY_API_KEY
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key='
var path = require('path')
const express = require('express')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')
const app = express()
projectData = {};
projectData['myKey'] = myKey;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'))

console.log(__dirname)


app.get('/', function (req, res) {
    console.log('res success')
    // res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/all', async function (req, res) {
    res.send(projectData)
});

app.post('/add', addData);

function addData(req,res) {
    let data = req.body;
    projectData['text'] = data.text;
    projectData['score_tag'] = data.score_tag;
    projectData['subjectivity'] = data.subjectivity;
    console.log(projectData)
    res.send(projectData)
};
