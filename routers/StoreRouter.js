const router = require("express").Router();
const User = require("../models/StoreModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// register
router.post("/", async (req, res) => {
  try {
    const {sid,password,sloc,bid} = req.body;    
    if(!sid || !password || !sloc || !bid)
    {
         return res.status(400).json({ errorMessage:"Please enter all required field: "});
    }
    if (password.length < 6 )
    {
        return res.status(400).json({ errorMessage:"Please enter a password more than 6 chracters: "});
    }

    const existingUser = await User.findOne({ sid });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newUser = new User({
        sid,
        passwordHash,
        sloc,
        bid
    });

    const savedUser = await newUser.save();

    // sign the token

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// update Store
router.put('/updateStore', auth, async(req,res) => {
  const id = req.body.id;
  const newLocation = req.body.newLocation;
  try{
    await User.findById(id, (err,newloc)=>{
      newloc.sloc=newLocation;
      newloc.save();
      res.send('Updated')
    })
  }catch(err){
    console.log(err);
  }

})

//delete Store
router.delete('/deleteStore/:id', auth, async(req, res)=>{
  const sid = req.params.id;
  try{
    await User.findByIdAndRemove(sid).exec();
    res.send('Deleted');
  }catch(err){
    console.log(err);
  }
})
// log in

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

router.get("/show", auth, async (req, res) => {
  try {
    //const brand = req.user;
    //console.log(brand);
    const stores = await User.find();
    res.json(stores); 
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
