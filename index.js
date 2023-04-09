/**
 * LOGIN SETTTING UP
 */

let loginStatus = false;
function login() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  if (username === password) {
    // 1) “username and password should be the same”.
    loginStatus = true;
    getData();
    alert("“Login Successful”"); // 3) If the values are the same then show an alert which says, “Login Successful” and redirect to the orders page.
    window.location.replace("./pages/orders.html");
    // setTimeout(() => {
    //   loginStatus = false;
    //   alert("Your Session has end!");
    // }, 5000);
  } else {
    alert("“Please enter valid credentials!”"); // 2) If the values differ then show an alert which says, “Please enter valid credentials!”
  }
}

/**
 * GETTING DATA FROM THE SERVER AFTER THE LOGIN
 */

const ordersFetch = fetch(
  "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders"
);
const productsFetch = fetch(
  "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products"
);
const usersFetch = fetch(
  "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users"
);

function getData() {
  Promise.all([ordersFetch, productsFetch, usersFetch]).then((values) => {
    console.log(values);
    return Promise.all(values.map((r) => r.json())).then(
      ([orders, products, users]) => {
        if (loginStatus == true && !localStorage.getItem("orders")) {
          localStorage.setItem("orders", JSON.stringify(orders));
          localStorage.setItem("products", JSON.stringify(products));
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
    );
  });
}

// checking status for session

function checkStatus() {
  console.log(loginStatus);
  if (loginStatus) {
    window.location.replace("./pages/orders.html");
  }
}
