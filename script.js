// ===========================
// PRODUCTS DATA
// ===========================

const products = [
{
id:1,
name:"iPhone 15 Pro",
category:"mobile",
price:129999,
rating:4.8,
image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
description:"Apple iPhone 15 Pro with A17 Pro chip and premium titanium body."
},

{
id:2,
name:"Samsung Galaxy S25",
category:"mobile",
price:89999,
rating:4.7,
image:"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600",
description:"Flagship Samsung smartphone with advanced AI features."
},

{
id:3,
name:"MacBook Air M3",
category:"laptop",
price:114999,
rating:4.9,
image:"https://tse3.mm.bing.net/th/id/OIP.6VQeH-M-io-0o90sx01EOAHaEK?cb=thfvnextfalcon2&w=980&h=551&rs=1&pid=ImgDetMain&o=7&rm=3",
description:"Ultra thin laptop powered by Apple M3 chip."
},

{
id:4,
name:"Dell XPS 15",
category:"laptop",
price:99999,
rating:4.6,
image:"https://tse1.explicit.bing.net/th/id/OIP.n0DTV5IZC56a49KxwOex5wHaF7?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3",
description:"Premium Dell laptop with stunning display."
},

{
id:5,
name:"Sony WH-1000XM5",
category:"audio",
price:29999,
rating:4.8,
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
description:"Industry-leading noise cancelling headphones."
},

{
id:6,
name:"Boat Rockerz 550",
category:"audio",
price:2499,
rating:4.3,
image:"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600",
description:"Wireless headphones with immersive sound."
},

{
id:7,
name:"Men Casual T-Shirt",
category:"fashion",
price:799,
rating:4.2,
image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
description:"Comfortable cotton t-shirt for everyday wear."
},

{
id:8,
name:"Men Denim Jacket",
category:"fashion",
price:1999,
rating:4.5,
image:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
description:"Stylish denim jacket for modern fashion."
}
];

// ===========================
// GLOBAL VARIABLES
// ===========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = [];
let selectedProduct = null;

// ===========================
// DOM ELEMENTS
// ===========================

const productContainer =
document.getElementById("productContainer");

const cartItems =
document.getElementById("cartItems");

const cartCount =
document.getElementById("cartCount");

const totalItems =
document.getElementById("totalItems");

const totalPrice =
document.getElementById("totalPrice");

const searchInput =
document.getElementById("searchInput");

const cartSidebar =
document.getElementById("cartSidebar");

const openCart =
document.getElementById("openCart");

const closeCart =
document.getElementById("closeCart");

const toast =
document.getElementById("toast");

// ===========================
// RENDER PRODUCTS
// ===========================

function renderProducts(productList){

productContainer.innerHTML = "";

productList.forEach(product=>{

productContainer.innerHTML += `
<div class="product-card">

<div class="product-image">
<img src="${product.image}">
</div>

<div class="product-info">

<div class="product-title">
${product.name}
</div>

<div class="rating">
⭐ ${product.rating}
</div>

<div class="price">
₹${product.price.toLocaleString()}
</div>

<div class="product-buttons">

<button
class="view-btn"
onclick="openProduct(${product.id})">
View
</button>

<button
class="cart-add-btn"
onclick="addToCart(${product.id})">
Add Cart
</button>

</div>

</div>

</div>
`;

});

}

// ===========================
// PRODUCT MODAL
// ===========================

function openProduct(id){

const product =
products.find(p=>p.id===id);

selectedProduct = product;

document.getElementById("modalTitle").innerText =
product.name;

document.getElementById("modalDescription").innerText =
product.description;

document.getElementById("modalPrice").innerText =
"₹"+product.price.toLocaleString();

document.getElementById("modalRating").innerText =
product.rating;

document.getElementById("modalImg").src =
product.image;

document
.getElementById("productModal")
.classList.add("active");

}

document
.getElementById("closeModal")
.addEventListener("click",()=>{

document
.getElementById("productModal")
.classList.remove("active");

});

// ===========================
// MODAL ADD CART
// ===========================

document
.getElementById("modalAddCart")
.addEventListener("click",()=>{

if(selectedProduct){
addToCart(selectedProduct.id);
}

});

// ===========================
// ADD TO CART
// ===========================

function addToCart(id){

const existing =
cart.find(item=>item.id===id);

if(existing){

existing.quantity++;

}else{

const product =
products.find(p=>p.id===id);

cart.push({
...product,
quantity:1
});

}

saveCart();
updateCart();
showToast("Product Added To Cart");

}

// ===========================
// UPDATE CART
// ===========================

function updateCart(){

cartItems.innerHTML = "";

let totalQty = 0;
let totalAmount = 0;

cart.forEach(item=>{

totalQty += item.quantity;

totalAmount +=
item.price * item.quantity;

cartItems.innerHTML += `

<div class="cart-item">

<img src="${item.image}">

<div class="cart-item-info">

<h4>${item.name}</h4>

<p>₹${item.price}</p>

<div class="qty-controls">

<button onclick="decreaseQty(${item.id})">
-
</button>

<span>${item.quantity}</span>

<button onclick="increaseQty(${item.id})">
+
</button>

</div>

<button
class="remove-btn"
onclick="removeFromCart(${item.id})">
Remove
</button>

</div>

</div>

`;

});

cartCount.innerText = totalQty;
totalItems.innerText = totalQty;

totalPrice.innerText =
"₹"+totalAmount.toLocaleString();

}

// ===========================
// QUANTITY FUNCTIONS
// ===========================

function increaseQty(id){

const item =
cart.find(p=>p.id===id);

item.quantity++;

saveCart();
updateCart();

}

function decreaseQty(id){

const item =
cart.find(p=>p.id===id);

if(item.quantity>1){

item.quantity--;

}else{

cart =
cart.filter(p=>p.id!==id);

}

saveCart();
updateCart();

}

// ===========================
// REMOVE ITEM
// ===========================

function removeFromCart(id){

cart =
cart.filter(item=>item.id!==id);

saveCart();
updateCart();

showToast("Item Removed");

}

// ===========================
// SAVE LOCAL STORAGE
// ===========================

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}

// ===========================
// SEARCH FUNCTION
// ===========================

searchInput.addEventListener("keyup",()=>{

const keyword =
searchInput.value.toLowerCase();

const filtered =
products.filter(product=>

product.name
.toLowerCase()
.includes(keyword)

);

renderProducts(filtered);

});

// ===========================
// CATEGORY FILTER
// ===========================

const filterButtons =
document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

document
.querySelector(".filter-btn.active")
.classList.remove("active");

button.classList.add("active");

const category =
button.dataset.category;

if(category==="all"){

renderProducts(products);

}else{

const filtered =
products.filter(product=>

product.category===category

);

renderProducts(filtered);

}

});

});

// ===========================
// CART SIDEBAR
// ===========================

openCart.addEventListener("click",()=>{

cartSidebar.classList.add("active");

});

closeCart.addEventListener("click",()=>{

cartSidebar.classList.remove("active");

});

// ===========================
// TOAST
// ===========================

function showToast(message){

toast.innerText = message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

// ===========================
// THEME TOGGLE
// ===========================

const themeBtn =
document.getElementById("themeBtn");

let darkMode = false;

themeBtn.addEventListener("click",()=>{

darkMode = !darkMode;

if(darkMode){

document.body.style.background =
"#121212";

document.body.style.color =
"white";

themeBtn.innerHTML =
'<i class="fa-solid fa-sun"></i>';

}else{

document.body.style.background =
"#f1f3f6";

document.body.style.color =
"#222";

themeBtn.innerHTML =
'<i class="fa-solid fa-moon"></i>';

}

});

// ===========================
// CHECKOUT BUTTON
// ===========================

document
.querySelector(".checkout-btn")
.addEventListener("click",()=>{

if(cart.length===0){

alert("Cart is Empty");

return;

}

alert(
"Order Placed Successfully!"
);

cart = [];

saveCart();
updateCart();

});

// ===========================
// INIT
// ===========================

renderProducts(products);
updateCart();