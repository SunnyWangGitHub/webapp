var mongoose =require("mongoose")
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId
var NovelSchema=new mongoose.Schema({
	book_name:String,
	book_id:Number,
	book_author:String
})
NovelSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now()
	}
	else{
		this.meta.updateAt=Date.now()
	}

	next()
})

NovelSchema.statics={
	fetch:function(cb){
		return this
		.find({})
		.exec(cb)
	},
	findById:function(id,cb){
		return this
		.findOne({book_id:id})
		.exec(cb)
	}
}
var Novel=mongoose.model('book',NovelSchema)
module.exports=Novel