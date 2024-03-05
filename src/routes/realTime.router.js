import  express  from "express";
const router = express.Router();

import ProductManager from "../controllers/productManager.js"
const products = new ProductManager("./src/model/products.json");

router.get("/realTimeProducts", async (req,res)=>{
    try {
        let reqProducts = await products.getProducts();
        res.render("realTime", {reqProducts})

    } catch (error) {
        console.log("error while getting products",error)
        res.send("No products found", error)
    }
})

export default router;

