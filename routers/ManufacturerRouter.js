const router = require("express").Router();
const User = require("../models/ManufacturerModels");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const ProductPrepared = require("../models/ProductsPrepared");

// register
router.post("/", async (req, res) => {
  try {
    const {email,password,bid} = req.body;    
    if(!email || !password || !bid)
    {
         return res.status(400).json({ errorMessage:"Please enter all required field: "});
    }
    if (password.length < 6 )
    {
        return res.status(400).json({ errorMessage:"Please enter a password more than 6 chracters: "});
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newUser = new User({
        email,
        passwordHash,
        bid
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/products" , async (req, res) => {
    try {
      const productsPrepared = await ProductPrepared.find();
      res.json(productsPrepared)
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });

// // update Store
// router.put('/updateStore', auth, async(req,res) => {
//   const id = req.body.id;
//   const newLocation = req.body.newLocation;
//   try{
//     await User.findById(id, (err,newloc)=>{
//       newloc.sloc=newLocation;
//       newloc.save();
//       res.send('Updated')
//     })
//   }catch(err){
//     console.log(err);
//   }

// })

// //delete Store
// router.delete('/deleteStore/:id', auth, async(req, res)=>{
//   const sid = req.params.id;
//   try{
//     await User.findByIdAndRemove(sid).exec();
//     res.send('Deleted');
//   }catch(err){
//     console.log(err);
//   }
// })


// router.get("/show", auth, async (req, res) => {
//   try {
//     const stores = await User.find();
//     res.json(stores)
//   } catch (err) {
//     console.error(err);
//     res.status(500).send();
//   }
// });

module.exports = router;