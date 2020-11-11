const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  // res.sendFile(__dirname+ "/index.html");
  res.render('index');
});
app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey= "45749ddded47851d32c7aa70a063c363"
  const unit ="metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const w = JSON.parse(data);
      const humidity = w.main.humidity;
      const temp = w.main.temp;
      const country = w.sys.country
      const descrip = w.weather[0].description;
      const icon = w.weather[0].icon;
      const wind = w.wind.speed;
      const feelsLike = w.main.feels_like;
      const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.render('report',{ query:query, temp:temp , descrip:descrip ,imgUrl:imgUrl,humidity:humidity,country:country,wind:wind,feelsLike:feelsLike});
    //   res.write("<h1>The temp in "+ query+" is "+ temp+ " degree Celcius.</h1>");
    //   res.write("<h3>The weather is currently " + descrip + "</h3>");
    //   res.write("");
    // res.send();

    })
  })

});
app.listen(3000,function(){
  console.log("server is running on port 3000");
})
