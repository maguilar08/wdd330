// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//W02 Team Act
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}


//W02 Ind. Act.
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

//W02 Individual Task
export function calculateDiscount(originalPrice, finalPrice) {
  const original = Number(originalPrice);
  const final = Number(finalPrice);

  if (!Number.isFinite(original) || !Number.isFinite(final) || original <= 0 || final >= original) {
    return 0;
  }

  return Math.round(((original - final) / original) * 100);
}

// W03 Team Activity
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// W03 Team Activity - Load an HTML template
export async function loadTemplate(path) {
  const response = await fetch(path);

  // Check if the request failed (e.g., 404 Not Found) and throw an error.
  //  if (!response.ok) {
  //   throw new Error(`Failed to load template: ${response.status}`);
  // }

  const template = await response.text();
  return template;
}

// W03 Team Activity - Load and display the header and footer
export async function loadHeaderFooter() {
  // Load the HTML templates
  // Use an absolute path from the website root so the templates load correctly on all pages.
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  // Find the header and footer elements in the HTML
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  // Insert the templates into the elements
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}