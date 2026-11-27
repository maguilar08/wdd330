import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// W03 TA: Load the shared header and footer on the checkout page
loadHeaderFooter();

// W04 TA: Initialize the checkout process
const checkout = new CheckoutProcess("so-cart", ".order-summary");

checkout.init();

document.querySelector("#zip").addEventListener("change", (event) => {
  if (event.target.value.trim() !== "") {
    checkout.calculateOrderTotal();
  }
});

// W04 TA: Submit the checkout form
document
  .querySelector("#checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const response = await checkout.checkout(event.target);
    console.log(response);
  });
