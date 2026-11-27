import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.itemCount = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSubTotal();
    }

    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    calculateItemSubTotal() {
        this.itemCount = this.list.length;

        this.itemTotal = this.list.reduce((sum, item) => {
            return sum + Number(item.FinalPrice);
        }, 0);

        const subtotal = document.querySelector(
            `${this.outputSelector} #subtotal`
        );

        subtotal.textContent = `$${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        // Calculate tax and shipping
        this.tax = this.itemTotal * 0.06;

        this.shipping = this.itemCount > 0
            ? 10 + (this.itemCount - 1) * 2
            : 0;

        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // Display the totals
        this.displayOrderTotals();
    }
    
    // Once the totals are all calculated display them in the order summary page
    displayOrderTotals() {
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotal = document.querySelector(`${this.outputSelector} #order-total`);

        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }
}