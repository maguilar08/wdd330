import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// W03 TA: Load the shared header and footer on the shopping cart page
loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // W04 IT: Display the total only if the cart contains items / Calculate and display the cart total
  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length > 0) {
    cartFooter.classList.remove("hide");

    const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);

    document.querySelector("#cart-total").textContent = `$${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const image = item.Images?.PrimaryMedium || item.Image;
  //src="${item.Image}" this was before using API
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img    
      src="${image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
