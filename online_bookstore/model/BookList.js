import FilterManager from '../support/FilterManager.js';
import Filter from '../support/Filter.js';
import { BOOK_PROP } from './Book.js';

class BookList {
    //Manages Books filtering using a FilterManager
    #books;
    #filterManager;
    constructor(books) {
        this.#books = Array.from(books);
        this.#filterManager = new FilterManager(this.#books);
    }
    get books() {
        return Array.from(this.#books);
    }
    get filteredBooks() {
        return this.#filterManager.filteredList;
    }

    filterByTitle(title) {
        if(title===null || title===undefined || title===""){
            this.#filterManager.removeFilter(BOOK_PROP.TITLE);
            return;
        }
        this.#filterManager.addFilter(Filter.makeIncludes(new Filter(BOOK_PROP.TITLE, title)));
    }
    filterByAuthor(author) {
        if(author===null || author===undefined || author===""){
            this.#filterManager.removeFilter(BOOK_PROP.AUTHOR);
            return;
        }
        this.#filterManager.addFilter(Filter.makeIncludes(new Filter(BOOK_PROP.AUTHOR, author)));
    }
    filterByGenre(genre) {
        if(genre===null || genre===undefined || genre===""){
            this.#filterManager.removeFilter(BOOK_PROP.GENRE);
            return;
        }
        this.#filterManager.addFilter(Filter.makeEquality(new Filter(BOOK_PROP.GENRE, genre)));
    }
    filterByISBN(isbn) {
        if(isbn===null || isbn===undefined || isbn===""){
            this.#filterManager.removeFilter(BOOK_PROP.ISBN);
            return;
        }
        this.#filterManager.addFilter(Filter.makeEquality(new Filter(BOOK_PROP.ISBN, isbn)));
    }
    filterByPrice(price) {
        if(price===null || price===undefined || price==="" || price===0){
            this.#filterManager.removeFilter(BOOK_PROP.PRICE);
            return;
        }
        this.#filterManager.addFilter(Filter.makeLesserOrEqual(new Filter(BOOK_PROP.PRICE, price)));
    }
    filterByAvailability(availability) {
        if(availability===null || availability===undefined || availability==="" || availability===false){
            this.#filterManager.removeFilter(BOOK_PROP.AVAILABILITY);
            return;
        }
        this.#filterManager.addFilter(Filter.makeEquality(new Filter(BOOK_PROP.AVAILABILITY, availability)));
    }
    filterByDiscount(discount) {
        if(discount===null || discount===undefined || discount===""){
            this.#filterManager.removeFilter(BOOK_PROP.DISCOUNT);
            return;
        }
        this.#filterManager.addFilter(Filter.makeGreaterOrEqual(new Filter(BOOK_PROP.DISCOUNT, discount)));
    }
    addFilterListener(listenerFn){
        //Adds a listener to the filter manager
        this.#filterManager.addListener(listenerFn);
    }
}

export default BookList;