// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert"); // * <p>
const form = document.querySelector(".grocery-form"); // * <form>
const grocery = document.getElementById("grocery"); // * <input>
const submitBtn = document.querySelector(".submit-btn"); // * <buyyon>
const groceryContainer = document.querySelector(".grocery-container"); // * <div>
const list = document.querySelector(".grocery-list"); // * <div>
const clearBtn = document.querySelector(".clear-btn"); // * <button>

// *edit option
let editElement;
let editFlag = false;
let editID = '';
let mainTable = "data";
// ****** EVENT LISTENERS **********

// * submit form
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
window.addEventListener("DOMContentLoaded", setupItems);
// ****** FUNCTIONS **********

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        createLisItem(id, value);
        displayAlert("Add item to the list", "success");
        groceryContainer.classList.add("show-container");
        // add to locale storage
        addToLocaleStorage(id, grocery.value);
        // set back to default
        setBackToDefault();
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');
        editLocaleStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert('Empty value', "danger")
    }
}

// *    ----- display alert -----
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setInterval(function() {
        alert.classList.remove(`alert-${action}`);
        alert.textContent = "";
    }, 1200);
}
//* edit item

function editItem(e) {
    const element = (e.currentTarget.parentElement.parentElement); // * <div>  
    editElement = e.currentTarget.parentElement.previousElementSibling; // * <p>
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
    console.log("----id --->", editID);
}

// * delete item

function deleteItem(e) {
    const element = (e.currentTarget.parentElement.parentElement); // * <div>
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length == 0) {
        groceryContainer.classList.remove("show-container");
        displayAlert("Empty list", "danger");
        removeFromLocalStorage(id)
        setBackToDefault();
    }
}
// * clear Items 
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(function(item) {
            list.removeChild(item);
        })
    }
    groceryContainer.classList.remove("show-container");
    displayAlert("Empty list", "danger");
    localStorage.removeItem('list');
    setBackToDefault();
}

// set back to default 
function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}

// ****** LOCAL STORAGE **********
function addToLocaleStorage(id, value) {
    const grocery = { id, value }; //ES6 p0wer
    let items = getLocaleStorage();
    console.log(items);
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    let items = getLocaleStorage();
    items = items.filter(function(item) {
        if (item.id !== id) {
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function editLocaleStorage(id, value) {
    console.log(id);
    let items = getLocaleStorage();
    items = items.map(function(item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocaleStorage() {
    return localStorage.getItem("list") ?
        JSON.parse(localStorage.getItem("list")) : []; // if there is data return list else return an empty array ...........
}

// ****** SETUP ITEMS **********
function setupItems() {
    let items = getLocaleStorage();
    if (items.length > 0) {
        items.forEach(function(item) {
            createLisItem(item.id, item.value);
        });
        groceryContainer.classList.add("show-container")
    }

}

function createLisItem(id, value) {
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
                    <div class="btn-container">
                        <button class="edit-btn">
                             <i class="fas fa-edit"></i>
                         </button>
                        <button class="delete-btn">
                             <i class="fas fa-trash"></i>
                        </button>
                    </div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");

    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener('click', editItem);

    // * append child
    list.appendChild(element);
}