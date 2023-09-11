class BooksController {
    // Manages the books section behavior, including the add to cart button
    #bookList;
    constructor() {
    }
    reloadFilteredBooks() {
        // Reloads the books section with the filtered books from the book list
        const bookList = document.getElementById("books-list");
        bookList.innerHTML = "";
        for (let i = 0; i < this.#bookList.filteredBooks.length; i++) {
            const book = this.#bookList.filteredBooks[i];
            bookList.innerHTML += this.#createBookView(book, i);
        }
        for (let i = 0; i < this.#bookList.filteredBooks.length; i++) {
            const book = this.#bookList.filteredBooks[i];
            if (book.availability) {
                this.#addHandler(book, i);
            }
        }
    }
    setBookList(bookList) {
        this.#bookList = bookList;
    }
    setAddToCartHandler(handler) {
        this.addToCart = handler
    }
    #addHandler(book, idNumber) {
        // Adds the add to cart button handler
        const btn = document.getElementById("add-to-cart-btn" + idNumber);
        const addToCartFn = this.addToCart;
        btn.onclick = () => addToCartFn(book);
    }
    #createBookView(book, idNumber) {
        return `
        <div class="book" id="book${idNumber}">
            <img src="./assets/book-cover.png" alt="book">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p class="book-price">${book.isOnDiscount() ? "<del>" + "$"+book.price + "</del> -> " + "$"+book.priceDiscounted : "$"+book.price}</p>
            ${book.availability ? '<button class="add-to-cart-btn" id="add-to-cart-btn' + idNumber + '">Add to Cart</button>' : '<button class="out-of-stock" disabled>Out of Stock</button>'}
        </div>
        `
    }
}

export default BooksController;