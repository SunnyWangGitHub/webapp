var mongoose =require("mongoose")
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId
var NovelSchema=new mongoose.Schema({
	subject:String,
	category:String,
	summary:String,
	poster:String,
	unEdit:{
		type:Boolean,
		default:false
	},
	chapters:[{
		chapterId:Number,
		chapter:ObjectId
	}],
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
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
		.sort('meta.updateAt')
		.exec(cb)
	},
	getCanEdit:function(cb){
		return this
		.find({"unEdit":false})
		.exec(cb)
	},
	findById:function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}
}
var Novel=mongoose.model('Novel',NovelSchema)
module.exports=Novel