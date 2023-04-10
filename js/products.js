setTimeout(() => {
  loginStatus = false;
  alert("Your Session has been end!");
  window.location.replace("../index.html");
}, 50000);

//

const products = document.querySelector("#products");

// Filter products based on expiration date and stock status
const expired = document.getElementById("expired");
const lowStock = document.getElementById("lowStock");

let expiredStatus = false;
expired.addEventListener("change", (e) => {
  expiredStatus = e.target.checked;
  setProducts();
});

let lowStockStatus = false;
lowStock.addEventListener("change", (e) => {
  lowStockStatus = e.target.checked;
  setProducts();
});

// Setting products on page
async function setProducts() {
  if (localStorage.getItem("products")) {
    let filteredProducts = JSON.parse(localStorage.getItem("products"));

    if (expiredStatus) {
      const currentDate = new Date().toLocaleDateString();
      filteredProducts = filteredProducts.filter((product) => {
        const expiryDate = new Date(
          Date.parse(product.expiryDate)
        ).toLocaleDateString();
        return expiryDate < currentDate;
      });
    }

    if (lowStockStatus) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.stock < 100;
      });
    }

    products.innerHTML = filteredProducts
      .map((product) => {
        return `
          <tr>
            <td class='unique id'>${product.id}</td>
            <td class='brandName'>${product.medicineName}</td>
            <td class='unique brandName'>${product.medicineBrand}</td>
            <td>${product.expiryDate}</td>
            <td class='unique price'>$${product.unitPrice}</td>
            <td class='unique stock'>${product.stock}</td>
          </tr>
        `;
      })
      .join("");
  }
}
