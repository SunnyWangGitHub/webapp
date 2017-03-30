var mongoose=require("mongoose");
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId;
var Chapter=new mongoose.Schema({
	title:String,
	content:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	};
});
 var chapter= mongoose.model('Chapter',Chapter);
module.exports=chapter;