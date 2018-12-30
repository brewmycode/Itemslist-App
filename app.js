// Select DOM elements
const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const clearList = document.querySelector(".clear-btn");
const items = JSON.parse(localStorage.getItem("items")) || [];

function init() {
  populateList(items, itemsList);
  if (!itemsList.firstElementChild) {
    itemsList.innerHTML = `<li>Loading Items...</li>`;
  }
}

// Add Item
function addItem(e) {
  e.preventDefault();
  const text = document.querySelector("[name=item]").value;

  const item = {
    text: text,
    done: false
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));

  this.reset();
}

// Populate list
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
    <li>
    <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      } /> 
    <label for="item${i}"> ${plate.text} </label>
    </li>
    `;
    })
    .join("");
}

// Toggle done
function toggleDone(e) {
  const el = e.target;
  const index = el.dataset.index;
  if (!e.target.matches("input")) return;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
}

// Clear list
function deleteAllItems(e) {
  localStorage.clear();
  if (itemsList.firstElementChild) {
    itemsList.firstElementChild.remove();
  }
  itemsList.innerHTML = `<li>Loading Items...</li>`;
}

// Add event listeners
addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
clearList.addEventListener("click", deleteAllItems);

init();
