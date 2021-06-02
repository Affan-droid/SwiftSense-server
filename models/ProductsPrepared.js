const mongoose=require('mongoose');

const ProductPreparedSchema = new mongoose.Schema({
    sid:{type:Number, required:true},
    pid:{type:Number,required:true},
    bid:{type:Number, required:true},
    pname:{type:String, required:true},
    quantity:{type:Number, required:true},
    date:{type:Date, }
})
// to make collection in database cloud 
const ProductPrepared = mongoose.model("ProductPrepared",ProductPreparedSchema);

//export to other files 
module.exports = ProductPrepared;