var upload=require("multer")()
var Novel=require("../App/model/Novel_.js")
var mongo=require('mongodb').MongoClient
var dburl="mongodb://123.206.183.239/ibooktest"

module.exports=function(app){
	app.get("/",function(req,res){
		Novel.fetch(function(err,books){
			res.render("index.ejs",{
				books:books
			})
		})
	})
	app.get("/details",function(req,res){
		var id=parseInt(req.query.book_id)
		Novel.findById(id,function(err,book){
			if(err){
				console.log(err)
				res.end('chucuole')
				return
			}
			var c_id=book.book_id
			mongo.connect(dburl,function(err,db){
				var cl=db.collection('chapters_'+c_id)
				var chapters=[]
				cl.find().each(function(err,item){
					var temp={}
					if(item!==null){
						temp.chapter_name=item.chapter_name
						temp.chapter_id=item.chapter_id+''
						chapters.push(temp)
					}else{
						db.close()
						res.render("details",{
							name:book.book_name,
							id:book.book_id,
							author:book.book_auther,
							chapters:chapters
						})
					}
				})
				
			})
		})
	})
	app.get('/read',function(req,res){
		var b_id=req.query.book_id
		var c_id=parseInt(req.query.chapter_id)
		mongo.connect(dburl,function(err,db){
			var cl=db.collection('chapters_'+b_id)
			var chapter={}
			cl.find({chapter_id:c_id}).each(function(err,item){
				if(err){
					console.log(err)
					console.log('err')
					return 
				}
				console.log('each')
				console.log(item)
				if(item!==null){
					chapter.chapter_name=item.chapter_name
					chapter.chapter_id=item.chapter_id+''
					chapter.chapter_content=item.chapter_content
					console.log(chapter)
				}else{
					db.close()
					res.render("read",{
						chapter:chapter
					})
				}
			})
			
		})

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