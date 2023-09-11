class CartController {
    //Manages the cart modal behavior
    #user;
    #app;
    constructor(app) {
        this.#app = app;
        this.setNoUserBehavior();
    }

    reloadCartContent(books, totalPrice) {
        //Reloads the cart content with the new books and total price
        const cartBooks = document.getElementById("cart-books");
        cartBooks.innerHTML = "";
        for (let i = 0; i < books.length; i++) {
            const book= books[i];
            cartBooks.innerHTML += this.#createBookView(book,i);
        }
        for (let i = 0; i < books.length; i++) {
            const book= books[i];
            this.#addHandler(book,i);
        }
        document.getElementById("total-price").innerHTML = totalPrice;
    }
    #createBookView(book,idNumber) {
        return `
        <div class="cart-book">
            <h3>${book.title}</h3>
            <p>$${book.priceDiscounted}</p>
            <button class="remove-from-cart-btn" id="remove-from-cart-btn${idNumber}"><img src="./assets/remove.png" alt="remove"></button>
        </div>
        `
    }
    #addHandler(book, idNumber) {
        const btn = document.getElementById("remove-from-cart-btn" + idNumber);
        const removeFromCartFn = this.#user.cart.removeBook.bind(this.#user.cart);
        btn.onclick = () => {removeFromCartFn(book)}; 
    }
    setUser(user) {
        if (user) {
            this.setUserLoggedBehavior();
        } else {
            this.setNoUserBehavior();
        }
        this.#user = user;
    }
    setUserLoggedBehavior() {
        //Sets the behavior of the cart modal when the user is logged in
        document.getElementById("cart-close").onclick = () => document.getElementById("cart-modal").style.display = "none";
        document.getElementById("cart-btn").onclick = () => document.getElementById("cart-modal").style.display = "block";
        document.getElementById("checkout-btn").onclick = this.createCheckoutFn();
    }
    setNoUserBehavior() {
        //Sets the behavior of the cart modal when the user is not logged in
        document.getElementById("cart-btn").onclick = () => document.getElementById("login-modal").style.display = "block";
        document.getElementById("checkout-btn").onclick = () => alert("NOT LOGGED IN")
    }
    createCheckoutFn() {
        const thisApp = this.#app;
        return () => {
            thisApp.createOrder();
        }
    }
}

export default CartController;