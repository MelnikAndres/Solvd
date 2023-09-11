class Cart {
    // Has a cart-like behavior where you can put and remove books,it also includes the total price calculation
    books;
    #listeners = new Set();
    constructor(books=[]) {
        this.books = books;
    }
    addBook(book) {
        this.books.push(book);
        this.notifyListeners();
    }
    removeBook(book) {
        this.books.splice(this.books.indexOf(book), 1);
        this.notifyListeners();
    }
    clear(){
        this.books.length = 0;
        this.notifyListeners();
    }
    calculateTotalPrice() {
        return this.books.reduce((total, book) => total + book.priceDiscounted, 0).toFixed(2);
    }

    addListener(listenerFn) {
        //Adds a listener function to the cart
        this.#listeners.add(listenerFn);
    }
    notifyListeners() {
        //Executes all the listeners functions placed on the cart
        for (let listenerFn of this.#listeners) {
            listenerFn(this.books, this.calculateTotalPrice());
        }
    }
}

export default Cart;