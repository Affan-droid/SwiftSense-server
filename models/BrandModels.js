const mongoose=require('mongoose');

const BrandSchema = new mongoose.Schema({
    bid:{
        type:Number, 
        required:true
    },
    email:{type:String, unique:true, required:true},
    passwordHash:{type:String, required:true},
    bname:{type:String,required:true},
    btype:{type:String,required:true},
    bowner:{type:String, required:true}
}
);
 

//export to other files 
module.exports = mongoose.model("Brand",BrandSchema);
