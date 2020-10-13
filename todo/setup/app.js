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
// ****** EVENT LISTENERS **********

// * submit form
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);

// ****** FUNCTIONS **********

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
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
        displayAlert("Add item to the list", "success");
        groceryContainer.classList.add("show-container");
        // add to locale storage
        addToLocaleStorage();
        // set back to default
        setBackToDefault();
    } else if (value && editFlag) {
        console.log('editing');
    } else {
        displayAlert('Empty value', "danger")
    }
}

// !    ----- display alert -----
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setInterval(function() {
        alert.classList.remove(`alert-${action}`);
        alert.textContent = "";
    }, 1200);
}
//* edit item

function editItem() {
    console.log("edit item");
}

// * delete item

function deleteItem(e) {
    console.log("delete");
    const element = (e.currentTarget.parentElement.parentElement);
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length == 0) {
        groceryContainer.classList.remove("show-container");
        displayAlert("Empty list", "danger");
        setBackToDefault();
        // TODO :  removeFromLocalStorage(id)
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
    // TODO : localStorage.removeItem('list');
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
function addToLocaleStorage() {
    console.log("add to locale storage");
}

function removeFromLocalStorage(id) {

}

// ****** SETUP ITEMS **********