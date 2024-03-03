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

const deleteButton = document.querySelectorAll(".deleteButton");
deleteButton.forEach((button,index) => {
    button.addEventListener("click",()=>{
        deleteProduct(data[index].id)
    })
})

