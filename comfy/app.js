// Local varibles =>
const cartBtn = document.querySelector(".cart-btn");
const closeCarBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const catDOM = document.querySelector(".cart");
const cartOverLay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productDOM = document.querySelector(".products-center");


// cart =>
let cart = [];
// buttons alternative
let buttonsDOM = [];
// getting the products =>
class Products {
    async getProduct() {
        try {
            let result = await fetch("products.json"); // get data from JSON
            let data = await result.json(); // convert it to json format
            let products = data.items; // array elements
            products = products.map((item) => {
                // map () will loop through the array
                const { title, price } = item.fields; // get the title,price
                const { id } = item.sys; // get
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image };
            });
            return products; // this method returns an Arrray JS object !!
        } catch (error) {
            console.log(error);
        }
    }
}

// display product =>
class UI {
    displayProducts(product) {
        let result = "";
        product.forEach((element) => {
            result += `<article class="product">
                    <div class="img-container">
                        <img src=${element.image} alt="product" class="product-img" />
                        <button class="bag-btn" data-id=${element.id}>
                        <span class="nav-icon">
                        <i class="fa fa-cart-plus"></i>
                        add to bag </span>
                        </button>
                    </div>
                    <h3>${element.title}</h3>
                    <h4>${element.price}</h4>
                </article>`;
        });
        // console.log(result);
        productDOM.innerHTML = result;
    }
    getBagButtons() {
        const btns = [...document.querySelectorAll(".bag-btn")];
        buttonsDOM = btns;
        btns.forEach((button) => {
            let id = button.dataset.id;
            //  retrive data from button
            let inCart = cart.find((item) => item.id === id); //propably boolean !
            if (inCart) {
                button.innerText = "in cart";
                button.disabled = true;
            }
            button.addEventListener("click", (event) => {
                event.target.innerText = "In cart";
                event.target.disabled = true;
                // get product from products
                let careItem = {...Storage.getProduct(id), amount: 1 }; //add amount propriety 
                // add product to cart ! =>
                cart = [...cart, careItem];
                // save cart into Locale storage =>
                Storage.saveCart(cart);
                // set cart values =>
                this.setCartValue(cart);
                // display cart items =>
                this.addCartItem(careItem);
                // show cart =>
                setTimeout(this.showCart, 300);
            });
        });
    }
    setCartValue(Currentcart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        Currentcart.map((item) => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }
    addCartItem(cartItem) {
        const div = document.createElement("div"); // create div
        div.classList.add("cart-item");
        div.innerHTML = `<img src=${cartItem.image} alt="product">
                    <div>
                        <h4>${cartItem.title}</h4>
                        <h5>${cartItem.price}</h5>
                        <span class="remove-item" data-id=${cartItem.id} >remove</span>
                    </div>
                    <div>
                        <i class="fa fa-chevron-up" data-id=${cartItem.id}></i>
                        <p class="item-amount">${cartItem.amount}</p>
                        <i class="fa fa-chevron-down" data-id=${cartItem.id}></i>
                    </div>`;
        cartContent.appendChild(div);
    }
    showCart() {
        cartOverLay.classList.add("transparentBcg");
        catDOM.classList.add("showCart");
    }
    setUpAPP() {
        cart = Storage.getCart();
        this.setCartValue(cart);
        this.populateCart(cart);
        cartBtn.addEventListener("click", this.showCart);
        closeCarBtn.addEventListener("click", this.hideCart);
        this.cartLogic();
    }
    populateCart(cart) {
        cart.forEach((item) => this.addCartItem(item));
    }
    hideCart() {
            cartOverLay.classList.remove("transparentBcg");
            catDOM.classList.remove("showCart");
        }
        // clear all carts
    cartLogic() {
        clearCartBtn.addEventListener("click", () => {
            this.clearaLogic();
        });
        // cart functonality ...
        cartContent.addEventListener("click", (event) => {
            if (event.target.classList.contains("remove-item")) {
                let removedItem = event.target;
                let id = removedItem.dataset.id;
                cartContent.removeChild(removedItem.parentElement.parentElement);
                this.removeItem(id);
            } else if (event.target.classList.contains("fa-chevron-up")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find((item) => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValue(cart);
                document.querySelector(".item-amount").innerText =
                    tempItem.amount;
            } else if (event.target.classList.contains("fa-chevron-down")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find((item) => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.setCartValue(cart);
                    document.querySelector(".item-amount").innerText = tempItem.amount;
                } else {
                    cartContent.removeChild(
                        lowerAmount.parentElement.parentElement
                    );
                    this.removeItem(id);
                    Storage.saveCart(cart);
                    this.setCartValue(cart);
                    document.querySelector(".item-amount").innerText =
                        tempItem.amount;
                }
            }
        });
    }
    clearaLogic() {
        // clear cart button
        let cartItems = cart.map((item) => item.id); //loop through each item in the list
        cartItems.forEach((id) => this.removeItem(id));
        console.log(cartItems);
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    }
    removeItem(id) {
        cart = cart.filter((item) => item.id !== id); // recreate new array ....!
        this.setCartValue(cart);
        Storage.saveCart(cart);
        let button = this.getSinglButtn(id);
        button.disabled = false;
        button.innerHTML = `<span class="nav-icon">
                        <i class="fa fa-cart-plus"></i>
                        add to bag </span>`;
    }
    getSinglButtn(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}

// locale Storage =>
class Storage {
    static saveProduct(products) {
        localStorage.setItem("productsLocale", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("productsLocale")); // give array list
        return products.find((product) => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem("cart") ?
            JSON.parse(localStorage.getItem("cart")) : [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    ui.setUpAPP();
    // get all products=>
    products
        .getProduct()
        .then((product) => {
            ui.displayProducts(product);
            Storage.saveProduct(product);
        })
        .then(() => {
            ui.getBagButtons();
        });
});