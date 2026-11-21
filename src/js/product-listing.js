import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// W03 TA: Load the shared header and footer
loadHeaderFooter();

const category = getParam("category");
// first create an instance of the ProductData class.
// to modify the title
const categoryName = {
  tents: "Tents",
  backpacks: "Backpacks",
  "sleeping-bags": "Sleeping Bags",
  hammocks: "Hammocks",
};

document.querySelector(".products h2").textContent =
  `Top Products: ${categoryName[category]}`;

// W03 IndAct
//const dataSource = new ProductData("tents");
const dataSource = new ProductData();
// then get the element you want the product list to render in

const listElement = document.querySelector(".product-list");
// then create an instance of the ProductList class and send it the correct information.

const productList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products

productList.init();
