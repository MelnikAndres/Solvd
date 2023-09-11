import Book from './Book.js';

class NonFiction extends Book{
    //Allows Books to be differentiated by genre
    genre;
    static TYPE = {
        NON_FICTION:"Non Fiction",
        POLITICAL_PHILOSOPHY: "Political Philosophy",
        SELF_HELP: "Self Help",
        MILITARY_STRATEGY: "Military Strategy",
        SPIRITUALITY: "Spirituality",
    };
    constructor({title, author, isbn, price, availability, genre, discount}){
        if(!Object.keys(NonFiction.TYPE).includes(genre)){
            throw new Error("Invalid non-fiction genre");
        }
        super({title, author, isbn, price, availability, discount});
        this.genre = genre;
    }
}

export default NonFiction;