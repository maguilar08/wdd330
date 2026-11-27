const baseURL = import.meta.env.VITE_SERVER_URL;


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

//name changed ProductData
export default class ExternalServices {
  //constructor(category) {
  //  this.category = category;
  //  this.path = `../json/${this.category}.json`;
  //}
  //getData() {
  //  return fetch(this.path)
  //    .then(convertToJson)
  //    .then((data) => data);
  //}

  //Added W03 IndAct
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  //to use API
  //async findProductById(id) {
  //  const products = await this.getData();
  //  return products.find((item) => item.Id === id);
  //}
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // W04 TA: Submit the order to the server
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };

    const response = await fetch(`${baseURL}checkout`, options);
    const data = await convertToJson(response);
    return data;
  }
}
