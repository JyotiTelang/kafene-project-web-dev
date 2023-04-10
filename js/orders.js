const orderCount = document.querySelector("#order-count");
const orders = document.querySelector("#orders");
// setting filters
// new orders filter
const newfilter = document.getElementById("newfilter");
let newfilterStatus = true;
newfilter.addEventListener("change", (e) => {
  console.log((newfilterStatus = e.target.checked));
  setOrders();
});
//packed status filter
const packedfilter = document.getElementById("packed");
let packedfilterStatus = true;
packedfilter.addEventListener("change", (e) => {
  console.log((packedfilterStatus = e.target.checked));
  setOrders();
});
// in transist status filter
const inTransist = document.getElementById("inTransit");
let inTransistStatus = true;
inTransist.addEventListener("change", (e) => {
  console.log((inTransistStatus = e.target.checked));
  setOrders();
});
// delivered status filter
const delivered = document.getElementById("delivered");
let deliveredStatus = true;
delivered.addEventListener("change", (e) => {
  console.log((deliveredStatus = e.target.checked));
  setOrders();
});
// setting orders on page

async function setOrders() {
  if (localStorage.getItem("orders")) {
    orders.innerHTML = await JSON.parse(localStorage.getItem("orders"))
      .filter((value) => {
        // console.log(value.orderStatus === "New");
        if (
          (newfilterStatus && value.orderStatus === "New") ||
          (inTransistStatus && value.orderStatus === "In Transit") ||
          (packedfilterStatus && value.orderStatus === "Packed") ||
          (deliveredStatus && value.orderStatus === "Delivered")
        ) {
          return true;
        }
        return false;
      })
      .map((item, index) => {
        // console.log(item);
        orderCount.innerHTML = index + 1;
        return `<tr>
        <td class='unique id'>${item.id}</td>
        <td>${item.customerName}</td>
        <td>${item.orderDate}<br/><span class='unique'> ${item.orderTime}</span></td>
        <td class='unique'>$${item.amount}</td>
        <td>${item.orderStatus}</td>
      </tr>
    `;
      })
      .join("");
  }
  // checking status
}
setTimeout(() => {
  loginStatus = false;
  alert("Your Session has been end!");
  window.location.replace("../index.html");
}, 50000);

// setOrders();
