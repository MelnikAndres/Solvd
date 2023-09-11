class NavController{
    //Manages the navigation bar behavior, mainly the login button
    #app;
    constructor(app){
        this.setOnClickHandlers();
        this.#app = app;
    }
    handleLoggedIn(){
        //Sets the navigation bar to the logged in state
        document.getElementById("login-btn").innerHTML = "Log Out";
        document.getElementById("login-btn").onclick = this.createLogOutFn();
    }
    handleLogOut(){
        //Sets the navigation bar to the not logged in state
        document.getElementById("login-btn").innerHTML = "Log In";
        document.getElementById("login-modal").style.display = "block"
    }

    setOnClickHandlers(){
        document.getElementById("login-btn").onclick = () => document.getElementById("login-modal").style.display = "block";
    }
    createLogOutFn(){
        const thisApp = this.#app
        return () =>{
            thisApp.logOut();
        }
    }
}
export default NavController;