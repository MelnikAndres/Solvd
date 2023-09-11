import Fiction from '../model/Fiction.js';
import NonFiction from '../model/NonFiction.js';
import debounce from '../support/debounce.js';

class FiltersController {
    //Manages the filters section behavior
    #bookList
    constructor() {
    }
    loadSelectableData() {
        //Loads the selectable data for the genre and author filters
        const genreList = document.getElementById('genre-list');
        for (let genre in Fiction.TYPE) {
            genreList.innerHTML += this.createOption(Fiction.TYPE[genre]);
        }
        for (let genre in NonFiction.TYPE) {
            genreList.innerHTML += this.createOption(NonFiction.TYPE[genre]);
        }
        const authorSet = new Set();
        const authorList = document.getElementById('authors-list');
        for (const book of this.#bookList.books) {
            if (authorSet.has(book.author)) {
                continue;
            }
            authorSet.add(book.author);
            authorList.innerHTML += this.createOption(book.author);
        }
    }
    createOption(value) {
        return `
        <option>${value}</option>
        `
    }
    setBookList(bookList) {
        this.#bookList = bookList;
        this.setFiltersHandlers();
    }
    setFiltersHandlers() {
        //Sets the handlers for the filters, using the debounce function to avoid calling the filter functions too often
        const thisController = this
        const debounceTime = 300;
        const titleFilter = document.getElementById('title-filter');
        titleFilter.oninput = debounce(function () { thisController.#bookList.filterByTitle(titleFilter.value) }, debounceTime);
        const authorFilter = document.getElementById('authors-filter');
        authorFilter.oninput = debounce(function () { thisController.#bookList.filterByAuthor(authorFilter.value) }, debounceTime);
        const genreFilter = document.getElementById('genre-filter');
        genreFilter.oninput = debounce(function () {
            thisController.#bookList.filterByGenre(genreFilter.value.toUpperCase().replaceAll(" ", "_"))
        }, debounceTime);
        const isbnFilter = document.getElementById('isbn-filter');
        isbnFilter.oninput = debounce(function () { thisController.#bookList.filterByISBN(isbnFilter.value) }, debounceTime);
        const priceFilter = document.getElementById('price-filter');
        priceFilter.oninput = debounce(function () { thisController.#bookList.filterByPrice(+priceFilter.value) }, debounceTime);
        const discountFilter = document.getElementById('discount-filter');
        discountFilter.oninput = debounce(function () { thisController.#bookList.filterByDiscount(+discountFilter.value) }, debounceTime);
        const availabilityFilter = document.getElementById('available-checkbox');
        availabilityFilter.onclick = debounce(function () { thisController.#bookList.filterByAvailability(availabilityFilter.checked) }, debounceTime);
    }
}

export default FiltersController;