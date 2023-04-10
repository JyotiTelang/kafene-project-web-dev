const search = document.querySelector("#search");
const users = document.querySelector("#users");
const reset = document.querySelector("#reset");
// set users

function setUsers() {
  console.log("loaded");
  if (localStorage.getItem("users")) {
    users.innerHTML = JSON.parse(localStorage.getItem("users"))
      .filter((value) => {
        if (search) {
          if (search === "") {
            return value;
          } else if (value.fullName.toLowerCase().includes(searchValue)) {
            return value;
          } else if (searchValue.length <= 1) {
            return value;
          }
        } else {
          return value;
        }
      })
      .map((item) => {
        return `<tr>
              <td class='unique userId'>${item.id}</td>
              <td class='avatar'><img  src='${item.profilePic}'/></td>
              <td class='unique'>${item.fullName}</td>
              <td >${item.dob}</td>
              <td class='unique'>${item.gender}</td>
              <td class='unique'>${item.currentCity}, ${item.currentCountry}</td>
            </tr>
          `;
      })
      .join("");
  }
}
// setUsers();

let searchValue = "";
search.addEventListener("input", (e) => {
  searchValue = "";
  searchValue = e.target.value;
  if (searchValue.length > 1) {
    // e.preventDefault();
    searchValue = e.target.value.toLowerCase();
    // console.log(searchValue);
    setUsers();
  } else if (search.reset) {
  } else {
    setUsers();
  }
  setTimeout(() => {
    loginStatus = false;
    alert("Your Session has been end!");
    window.location.replace("../index.html");
  }, 50000);
});

function resetData() {
  window.location.reload();
}
