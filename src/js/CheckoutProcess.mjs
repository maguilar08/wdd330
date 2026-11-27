import { getLocalStorage } from "./utils.mjs";

import ExternalServices from "./ExternalServices.mjs";

// W04 TA: Prepare cart items for checkout
function packageItems(items) {
    return items.map((item) => {
        return {
            id: item.Id,
            name: item.Name,
            price: Number(item.FinalPrice),
            quantity: 1
        };
    });
}

// W04 TA: Convert form data into an object
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

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

        const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
        subtotal.textContent = `$${this.itemTotal.toFixed(2)}`;

        const itemCount = document.querySelector(`${this.outputSelector} #item-count`);
        itemCount.textContent = this.itemCount;
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

    // W04 TA: Prepare and submit the order
    // get the form element data by the form name
    // convert the form data to a JSON order object using the formDataToJSON function
    // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
    // call the checkout method in the ExternalServices module and send it the JSON order data.
    async checkout(form) {
        // Convert the form data into an object
        const order = formDataToJSON(form);

        // Calculate the final totals
        this.calculateOrderTotal();

        // Populate the order object
        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.shipping = this.shipping;
        order.items = packageItems(this.list);

        // Send the order to ExternalServices
        const services = new ExternalServices();
        const response = await services.checkout(order);

        return response;
    }
}