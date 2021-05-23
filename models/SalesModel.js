const mongoose=require('mongoose');

const StoreSalesSchema = new mongoose.Schema({
    sid:{type:Number, required:true},
    sloc:{type:String,required:true},
    bid:{type:Number, required:true},
    sales:{type:Number, required:true},
    DayOfWeek:{type:Number, required:true},
    Customers:{type:Number, required:true},
})
// to make collection in database cloud 
const Sales = mongoose.model("StoreSlaes",StoreSalesSchema);

//export to other files 
module.exports = Sales;