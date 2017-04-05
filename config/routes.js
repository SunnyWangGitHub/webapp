var upload=require("multer")()
var Novel=require("../App/model/NovelModel.js")
module.exports=function(app){
	app.get("/",function(req,res){
		res.render("index.ejs",{})
	})
	app.post("/upload/novel",upload.array(),function(req,res){
		var novel=new Novel({
			subject:req.body.subject,
			category:req.body.category,
			summary:req.body.summary,
			poster:req.body.poster
		})
		novel.save(function(err,novel){
			if(err){
				console.log(err)
				res.end("save err")
			}else{
				res.end("save ok")
			}
		})
	})
	app.post("/upload/chapter",upload.array(),function(req,res){
		
	})
	app.get("/getCanEditNovels",function(req,res){
		Novel.getCanEdit(function(err,novels){
			if(novels.length==0){
				res.end("[]")
			}else{
				var arr=[]
				for(var i=0;i<novels.length;i++){
					var obj={}
					obj[novels[i]._id]=novels[i].subject
					arr.push(obj)
				}
				res.end(JSON.stringify(arr))
			}
		})
	})
}