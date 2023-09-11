class Book {
    // Stores books data
    title;
    author;
    isbn;
    price;
    availability;
    discount;
    constructor({title, author, isbn, price, availability, discount}) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.price = +price;
        this.availability = availability;
        this.discount = +discount;
    }
    isOnDiscount(){
        return this.discount > 0;
    }
    get priceDiscounted(){
        return +(this.price*((100-this.discount)/100)).toFixed(2)
    }
}
export default Book;
export const BOOK_PROP = {
    TITLE: "title",
    AUTHOR: "author",
    ISBN: "isbn",
    PRICE: "priceDiscounted",
    AVAILABILITY: "availability",
    DISCOUNT: "discount",
    GENRE: "genre"
}