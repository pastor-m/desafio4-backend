import  express  from "express";
const app = express();
const PORT = 8080;
import exphbs from "express-handlebars"
import {Server} from "socket.io"
import viewsRouter from "./routes/views.router.js"
import realTimeRouter from "./routes/views.router.js"

//Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static("./src/public"));

//Configuramos express handlebars
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views");

//Rutas
app.use("/",viewsRouter);
app.use("/realTimeProducts",realTimeRouter);

//Listen
const httpServer = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})

const io = new Server(httpServer);

//Importando productManager para obtener el array
import ProductManager from "./controllers/productManager.js"
const products = new ProductManager("./src/model/products.json");

//2) Configuramos socket.io
io.on("connection", async (socket) => {
    console.log("Client has connected");

    //Enviamos array al cliente:
    socket.emit("products",await products.getProducts())

    //Borrar producto
    socket.on("deleteProduct", async (id)=>{
        await products.deleteProduct(id);
        const newList = await products.getProducts();
        io.emit("products", newList);
    })

    //Agregar producto
    socket.on("addProduct", async (newProduct)=>{
        await products.addProduct(newProduct);
        const newList = await products.getProducts();
        io.emit("products", newList);
    })
})


