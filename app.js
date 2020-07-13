const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");

const app=express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=6c252b0933c90c98fd0b13edd0fe224a&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
     const weatherdata=JSON.parse(data)
     //console.log(weatherdata);
     const temp=weatherdata.main.temp
     console.log(temp);
      const weatherdescription=weatherdata.weather[0].description
      const icon=weatherdata.weather[0].icon
     console.log(weatherdescription);
     const imageurl=" http://openweathermap.org/img/wn/"+icon+"@2x.png";
     console.log(imageurl);
     res.render("tt.ejs",{kweatherdata:weatherdescription, ktemp:temp, kquery:query, kimageurl:imageurl});
      /*res.write("<p> The Weather is currently "+weatherdescription+"<p>");
      res.write("<h1>The temperature in "+query+" is "+temp+" degree celcius </h1>");
      res.write("<img src="+ imageurl+">");*/

    })
  });
})
  //const query="Paris";




app.listen(3000,function(){
  console.log("server is running on port 3000");
});
