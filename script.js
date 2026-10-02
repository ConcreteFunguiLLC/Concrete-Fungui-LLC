const products = [
  {id:1,name:"Neon Lion's Mane",price:34,desc:"Demo functional mushroom product.",icon:"🍄"},
  {id:2,name:"Cosmic Mushroom Blend",price:42,desc:"Demo proprietary blend placeholder.",icon:"✨"},
  {id:3,name:"Fungii Daily Capsules",price:29,desc:"Demo capsule product placeholder.",icon:"🧪"},
  {id:4,name:"Concrete Starter Bundle",price:68,desc:"Demo bundle placeholder.",icon:"📦"}
];
let cart = JSON.parse(localStorage.getItem("cf_cart") || "[]");

const grid=document.getElementById("productGrid");
const count=document.getElementById("cartCount");
const drawer=document.getElementById("cartDrawer");
const overlay=document.getElementById("overlay");
const items=document.getElementById("cartItems");
const total=document.getElementById("cartTotal");

function renderProducts(){
  grid.innerHTML=products.map(p=>`
    <article class="product">
      <div class="product-art">${p.icon}</div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price-row"><span class="price">$${p.price.toFixed(2)}</span><button class="add" onclick="addToCart(${p.id})">ADD</button></div>
      </div>
    </article>`).join("");
}
function addToCart(id){ const p=products.find(x=>x.id===id); const item=cart.find(x=>x.id===id); if(item)item.qty++;else cart.push({...p,qty:1}); save(); openCart(); }
function save(){localStorage.setItem("cf_cart",JSON.stringify(cart));renderCart();}
function renderCart(){
  const qty=cart.reduce((a,b)=>a+b.qty,0); count.textContent=qty;
  items.innerHTML=cart.length?cart.map(i=>`<div class="cart-line"><span>${i.name} × ${i.qty}</span><strong>$${(i.price*i.qty).toFixed(2)}</strong></div>`).join(""):"<p class='small-note'>Your cart is empty.</p>";
  total.textContent="$"+cart.reduce((a,b)=>a+b.price*b.qty,0).toFixed(2);
}
function openCart(){drawer.classList.add("open");overlay.classList.add("open");drawer.setAttribute("aria-hidden","false")}
function closeCart(){drawer.classList.remove("open");overlay.classList.remove("open");drawer.setAttribute("aria-hidden","true")}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
overlay.onclick=closeCart;
document.getElementById("checkoutBtn").onclick=()=>alert("Demo checkout. Connect your ecommerce provider before launch.");
document.querySelector(".menu-toggle").onclick=()=>document.querySelector(".nav").classList.toggle("open");
document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("formMessage").textContent="Demo form submitted — connect your email/form service to receive messages.";});
renderProducts();renderCart();
