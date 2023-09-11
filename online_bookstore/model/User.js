import Order from './Order.js';

class User {
    //Has a customer-like behavior who can create orders, have a cart and information about himself
    email;
    name;
    userId;
    cart;
    constructor(name, email, userId, cart) {
        // Properties and methods...
        this.name = name;
        this.email = email;
        this.userId = userId;
        this.cart = cart;
    }
    createOrder(){
        //Instantiates an order with the user's information and cart data
        return new Order(this.name, this.userId, this.cart.books, this.cart.calculateTotalPrice());
    }

}

export default User;