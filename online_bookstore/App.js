import {
    FirebaseApp, Fiction, NonFiction, BookList,
    User, Cart, NavController, LogInController,
    BooksController, FiltersController, CartController
} from "./importer.js";

class App {
    //Main class that handles the application, it is responsible for loading the essential data and creating the controllers
    #firebaseApp;
    bookList;
    #user;
    navController;
    loginController;
    booksController;
    filtersController;
    cartController;
    constructor() {
        this.#firebaseApp = new FirebaseApp();
        this.navController = new NavController(this);
        this.loginController = new LogInController(this);
        this.cartController = new CartController(this);
        this.booksController = new BooksController();
        this.filtersController = new FiltersController();
    }
    run() {
        this.loadUserIfLoggedIn();
        this.loadBooks();
        this.createCartIfNotExists();
    }
    loadBooks() {
        const dbBooks = this.#firebaseApp.fetchBooks()
        const books = []
        dbBooks.then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                let book;
                if (data.genre in Fiction.TYPE) {
                    book = new Fiction(data);
                } else {
                    book = new NonFiction(data);
                }
                books.push(book);
            })
            this.bookList = new BookList(books);

            this.booksController.setBookList(this.bookList);
            this.booksController.reloadFilteredBooks();

            const booksController = this.booksController;
            this.bookList.addFilterListener(() => {booksController.reloadFilteredBooks()});

            this.filtersController.setBookList(this.bookList);
            this.filtersController.loadSelectableData();
        })

    }
    loadUserIfLoggedIn() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const cart = this.#loadCart();
            this.#user = new User(user.name, user.email, user.id, cart);
            this.#handleLoggedIn();    
        }
    }
    
    createCartIfNotExists() {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
    }
    logIn(email, password) {
        if (this.#user) return;
        const dbUser = this.#firebaseApp.fetchUser(email, password)
        dbUser.then((querySnapshot) => {
            if (querySnapshot.empty) throw new Error('User not found or wrong password')
            const data = querySnapshot.docs[0].data()
            const cart = this.#loadCart();
            this.#user = new User(data.name, data.email, querySnapshot.docs[0].id, cart);
            localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email, id: querySnapshot.docs[0].id }));
            this.#handleLoggedIn();
            this.booksController.reloadFilteredBooks();
        }).catch((e) => {
            alert(e.message)
        })
    }
    logOut() {
        this.#user = null;
        localStorage.removeItem('user');
        this.navController.handleLogOut();
        this.cartController.setUser(null);
    }
    register(name, email, password) {
        this.#firebaseApp.createUser(name, email, password).then((docRef) => {
            const id = docRef.id;
            const cart = this.#loadCart();
            this.#user = new User(name, email, id,cart);
            localStorage.setItem('user', JSON.stringify({ name: name, email: email, id: id }));
            this.#handleLoggedIn()
            this.booksController.reloadFilteredBooks();
        }).catch((e) => {
            alert(e.message)
        });
    }
    createOrder() {
        const order = this.#user.createOrder();
        if(order.books.length === 0) return alert('Cart is empty')
        this.#firebaseApp.createOrder(order).then(() => {
            this.#user.cart.clear();
        }).catch((e) => {
            alert(e.message)
        });
    }
    #loadCart(){
        const cart = localStorage.getItem('cart') ? new Cart(JSON.parse(localStorage.getItem('cart')).map((nonParsedBook) => {
            let book;
            if (nonParsedBook.genre in Fiction.TYPE) {
                book = new Fiction(nonParsedBook);
            } else {
                book = new NonFiction(nonParsedBook);
            }
            return book
        })) : new Cart();
        cart.addListener(() => {
            localStorage.setItem('cart', JSON.stringify(cart.books));
        })
        return cart
    }
    #handleLoggedIn() {
        this.navController.handleLoggedIn();
        this.loginController.successLogIn();
        this.cartController.setUser(this.#user);
        this.cartController.reloadCartContent(this.#user.cart.books, this.#user.cart.calculateTotalPrice());
        const user = this.#user;
        this.booksController.setAddToCartHandler((book) => user.cart.addBook(book));
        user.cart.addListener(() => {
            this.cartController.reloadCartContent(user.cart.books, user.cart.calculateTotalPrice());
        })
    }
}

export default App;