class Order {
    //Stores order data
    userName;
    userId;
    books;
    price;
    constructor(userName,userId, books, price) {
        // Properties and methods...
        this.userName = userName;
        this.userId = userId;
        this.books = books;
        this.price = price;
    }
}

export default Order;