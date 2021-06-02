const router = require("express").Router();
const auth = require("../middleware/auth");
const Sales = require("../models/SalesModel");

// router.post("/",auth, async (req, res) => {
      
//   try{
//       const {sid,sloc,bid,sales,day,customers,date} = req.body;    
//       // save a new user account to the db
//       const newSale = new Sales({
//           sid,
//           sloc,
//           bid,
//           sales,
//           day,
//           customers,
//           date
//       });
//       if(!sid  || !sloc || !bid || !sales || !day || !customers)
//       {
//            return res.status(400).json({ errorMessage:"Please enter all required field: "});
//       }
//       if(sid.lenght < 4)
//       {
//         return res.status(400).json({ errorMessage:"Please enter correct Store Id : "});
//       }
//       const savedSales = await newSale.save();
//       //console.log(savedSales)
//     }catch (err) {
//         console.log(err);
//         res.status(500).send();
//       }
// });



router.get("/show", async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales)
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;