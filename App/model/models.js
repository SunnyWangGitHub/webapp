var mongoose=require("mongoose");
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId
var Books=new mongoose.Schema({
	subject:String,
	category:String,
	summary:String,
	poster:String,
	chapter:[{chapter_id:Number,id:ObjectId}]
});

Books.statics={
	fetch:function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById:function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}
}

var Book=mongoose.model('book',Books);

module.exports=Book;
