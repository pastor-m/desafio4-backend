const socket = io();

socket.on("products", (data)=>{
    const prodList = document.getElementById("product-list");
    prodList.innerHTML = "";
    data.forEach((product) =>{
        prodList.innerHTML += `
        <div class="card">
            <h3>Product: ${product.title}</h3>
            <p>Price: $${product.price}</p>
        </div>
        `
    })
})

const addProductButton = document.getElementById("addProduct");
addProductButton.addEventListener("click",(event)=>{
    event.preventDefault();
    addProduct();
})

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click",(event)=>{
    event.preventDefault();
    deleteProduct();
})

const addProduct = () =>{
    const title = document.getElementById("title").value
    const price = document.getElementById("price").value
    const product = {
        title,
        price
    }

    socket.emit("addProduct",product)
}

const deleteProduct = (id) =>{
    id = document.getElementById("deleteProdId").value
    socket.emit("deleteProduct",id)
}

