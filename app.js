/*
* @Author: SunnyWangGitHub
* @Date:   2017-03-30 21:27:41
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-04-05 19:51:07
*/

'use strict';

var express=require("express");
var app=express();
var fs=require("fs");
var multer=require("multer");
var upload=multer({dest:'uploads/'});
var Book=require('./App/model/NovelModel.js');
var mongoose=require('mongoose');
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


app.set("view engine",'ejs')
app.set("views","./views");

app.get("/watch",function(req,res){
	var book_id=req.	query.book_id;
	var chapter_id=req.query.chapter_id;
	console.log("book_id="+book_id);
	console.log("chapter_id="+chapter_id);
	fs.readFile("./public/"+"/"+book_id+"/"+chapter_id+".txt",function(err,buffer){
		if(err)
			return console.log(err);
		res.render("watch.ejs",{
			buffer:buffer
		});
	});
});
app.get("/list",function(req,res){
	Book.fetch(function(err,books){
		res.render("watch1.ejs",{books:books});
	});
});


require("./config/routes.js")(app)

app.listen(3000);