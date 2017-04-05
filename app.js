var express=require("express");
var app=express();
var fs=require("fs");
var multer=require("multer");
var upload=multer({dest:'uploads/'});
var Book=require('./App/model/NovelModel.js');
var mongoose=require('mongoose');
var port=process.env.PORT || 3000
mongoose.Promise=Promise
var dburl="mongodb://localhost/test"
mongoose.connect(dburl);

app.use("/static",express.static("public",{
	"maxAge":"0",
	setHeaders:function(res,path){
		if(express.static.mime.lookup(path)==="textml"){
			res.setHeader("Cache-Control","public,max-age=0")
		}
		if(express.static.mime.lookup(path)==="video/mp4"){
			res.setHeader("Cache-Control","public,max-age=1000")
			res.setHeader("Content-Type","video/webm")
		}
	}
}));


app.set("env","production")
app.set("view engine",'ejs')
app.set("views","./views");

require("./config/routes.js")(app)
app.listen(port);
console.log("start at "+port)