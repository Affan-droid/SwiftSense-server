const mongoose=require('mongoose');

const ManufSchema = new mongoose.Schema({
    email:{type:String, required:true},
    passwordHash:{type:String, required:true},
    bid:{type:Number, required:true}
})
// to make collection in database cloud 
const Manufacturer = mongoose.model("Manufacturer",ManufSchema);

//export to other files 
module.exports = Manufacturer;