import Book from './Book.js';

class Fiction extends Book{
    //Allows Books to be differentiated by genre
    genre;
    static TYPE = {
        FICTION: "Fiction",
        SCIENCE_FICTION: "Science Fiction",
        FANTASY: "Fantasy",
        ROMANCE: "Romance",
        HORROR: "Horror",
        DYSTOPIAN: "Dystopian",
        ADVENTURE: "Adventure",
        MYSTERY: "Mystery",
        POETRY: "Poetry",
        PSYCHOLOGICAL_THRILLER: "Psychological Thriller",
        SELF_HELP: "Self Help",
        EPIC_POETRY: "Epic Poetry",
        MILITARY_STRATEGY: "Military Strategy",
        HISTORICAL_FICTION: "Historical Fiction",
        POLITICAL_PHILOSOPHY: "Political Philosophy",
        CLASSICS: "Classics",
        PHILOSOPHICAL_FICTION: "Philosophical Fiction",
        MEMOIR: "Memoir",
        CONTEMPORARY_FICTION: "Contemporary Fiction"
    };
    constructor({title, author, isbn, price, availability, genre, discount}){
        if(!Object.keys(Fiction.TYPE).includes(genre)){
            throw new Error("Invalid fiction genre");
        }
        super({title, author, isbn, price, availability, discount});
        this.genre = genre;
    }
}

export default Fiction;