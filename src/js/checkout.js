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