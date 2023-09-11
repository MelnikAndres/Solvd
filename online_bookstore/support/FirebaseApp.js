import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const CONFIG = {
  apiKey: "AIzaSyCou5kZjzuOyGBzYbtiAdI6sv0_uAaMsiI",
  authDomain: "book-store-9c075.firebaseapp.com",
  projectId: "book-store-9c075",
  storageBucket: "book-store-9c075.appspot.com",
  messagingSenderId: "255018552616",
  appId: "1:255018552616:web:10acd23508a112e02e941d"
}
const DB_DOC ={
  USERS: "users",
  BOOKS: "books",
  ORDERS: "orders"
}

class FirebaseApp {
  //Allows to integrate Firebase into the application and provides the necessary methods to interact with the database
  #app;
  #db;
  constructor() {
    this.#app = initializeApp(CONFIG);// this is a singleton, creating new FirebaseApp instances will not initialize more apps
    this.#db = getFirestore(this.#app);
  }
  async fetchBooks() {
    //Returns a promise with the books query
    return getDocs(collection(this.#db, DB_DOC.BOOKS))
  }
  async fetchUser(email, password) {
    //Returns a promise with the user query
    const firestoreQuery = query(
      collection(this.#db, DB_DOC.USERS), 
      where('email', '==', email),
      where('password', '==', password)
    );
    return getDocs(firestoreQuery);
  }
  async createUser(name, email, password) {
    //Creates a new user in the database and returns the id of the created user
    const emailQuery = query(
      collection(this.#db, DB_DOC.USERS), 
      where('email', '==', email),
    );
    const emailRegistered = await getDocs(emailQuery);
    if(!emailRegistered.empty) {
      throw new Error('Email already registered')
    }
    return addDoc(collection(this.#db, DB_DOC.USERS), {
      name: name,
      email: email,
      password: password, //unsecure password storing, but this is just a demo
    });
  }
  async createOrder(order){
    //Creates a new order in the database
    addDoc(collection(this.#db, DB_DOC.ORDERS), {
      userName: order.userName,
      userId: order.userId,
      books: JSON.stringify(order.books),
      price: order.price,
    });
    return;
  }
}

export default FirebaseApp;