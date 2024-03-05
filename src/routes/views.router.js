import  express  from "express";
const router = express.Router();

import ProductManager from "../controllers/productManager.js"
const products = new ProductManager("./src/model/products.json");

router.get("/", async (req, res) => {
    try {
        let reqProducts = await products.getProducts();
        res.render("index", {reqProducts})

    } catch (error) {
        console.log("error while getting products",error)
        res.send("No products found", error)
    }

})

router.get("/realTimeProducts", async (req,res)=>{
    try {
        let reqProducts = await products.getProducts();
        res.render("realTime", {reqProducts})

    } catch (error) {
        console.log("error while getting products",error)
        res.send("No products found", error)
    }
})

// router.delete("/prodID?:pid", async (req,res)=>{
//     try {
//         const id = req.params.pid;
//         let deletedItem = await products.deleteProduct(id)
//         let reqProducts = await products.getProducts();
//         res.render("realTime",{reqProducts})
//     } catch (error) {
//                 console.log("error while getting products",error)
//         res.send("No products found", error)
//     }
// })

export default router;