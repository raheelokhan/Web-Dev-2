const express = require('express');
const app = express();
const https = require('node:https');
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});


 app.post("/" , function(req,res){

    const query = req.body.cityName;
const apikey = "df9204110983e0f1b42501d64eb09a4f"
units = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;

    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const weathernow = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>The weather in "+query+" is "+temp+" degrees.</h1>");    
        res.write("<p>The weather today is "+weatherDesc+"</p>");
        res.write("<img src = "+imageURL+">");
        res.send();    
        });
    });
 })

app.listen(3000, function(){
    console.log("server started at port 3000");
        });