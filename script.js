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
const checkoutFormSection = document.getElementById("checkoutFormSection");
const paymentSection = document.getElementById("paymentSection");

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
document.querySelector(".menu-toggle").onclick=()=>document.querySelector(".nav").classList.toggle("open");

// Formspree Submission Handler
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("customerEmail").value;
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (cartTotal === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderData = {
    email: email,
    total: cartTotal.toFixed(2),
    items: cart.map(item => `${item.name} (x${item.qty})`).join(", "),
    orderDate: new Date().toLocaleString()
  };

  fetch("https://formspree.io/f/xrpbvnal", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(orderData)
  })
  .then(response => {
    if (response.ok) {
      window.location.href = "success.html"; // Redirect to the success page
    } else {
      alert("Something went wrong. Please try again.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Network error. Please try again.");
  });
});

// Copy to Clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Copied!";
    btn.style.background = "var(--lime)";
    btn.style.color = "#000";
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.background = "var(--line)";
      btn.style.color = "#fff";
    }, 2000);
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
}

renderProducts();renderCart();
