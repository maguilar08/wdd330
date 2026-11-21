import { renderListWithTemplate, calculateDiscount } from "./utils.mjs";

function productCardTemplate(product) {
    //W02 Indiv.Task
    const discount = calculateDiscount(
        product.SuggestedRetailPrice,
        product.FinalPrice
    );
    // This is the old links-now are replace to use the API
    //<a href="product_pages/?product=${product.Id}">
    //<img src="${product.Image}" alt="Image of ">
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
      ${discount > 0 ? `<span class="discount-badge">${discount}% OFF</span>` : ""}
    </a>
  </li>`;
}


export default class ProductList {
    constructor(category, dataSource, listElement) {
        // You passed in this information to make the class as reusable as possible.
        // Being able to define these things when you use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    //W03 IndAct: This will be replace to use all the products
    /*async init() {
        // the dataSource will return a Promise...so you can use await to resolve it.
        //const list = await this.dataSource.getData();
        //This is being update to use the API W03 IndAct
        const list = await this.dataSource.getData(this.category);

        const allowedIds = ["880RR", "985RF", "985PR", "344YJ"];

        const filteredList = list.filter((product) =>
            allowedIds.includes(product.Id)
        );

        this.renderList(filteredList);
    }*/
    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }


    renderList(list) {
        renderListWithTemplate(
            productCardTemplate,
            this.listElement,
            list,
            "afterbegin",
            true
        );
    }

}   
