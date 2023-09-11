class LogInController {
    //Manages the Log In and Register modal behavior
    #app;
    constructor(app) {
        this.#app = app;
        this.setOnClickHandlers();
    }
    setOnClickHandlers() {
        //Sets the onclick handlers for the Log In and Register modals buttons
        document.getElementById("login-close").onclick = this.fireCloseLogIn;
        document.getElementById("register-btn").onclick = this.fireOpenRegister;
        document.getElementById("back-to-login-btn").onclick = this.fireBackToLogIn;
        document.getElementById("register-close").onclick = this.fireCloseRegister;
        document.getElementById("try-login-btn").onclick = this.createLogInFn();
        document.getElementById("try-register-btn").onclick = this.createRegisterFn();
    }
    fireCloseLogIn() {
        //Closes the Log In modal
        document.getElementById("login-modal").style.display = "none";
    }
    fireOpenRegister() {
        //Opens the Register modal
        document.getElementById("login-modal").style.display = "none";
        document.getElementById("register-modal").style.display = "block";
    }
    fireCloseRegister() {
        //Closes the Register modal
        document.getElementById("register-modal").style.display = "none";
    }
    fireBackToLogIn() {
        //Goes back to the Log In modal
        document.getElementById("register-modal").style.display = "none";
        document.getElementById("login-modal").style.display = "block";
    }
    createLogInFn() {
        const thisApp = this.#app
        return () => {
            let email = document.getElementById("login-email").value;
            let password = document.getElementById("login-password").value;
            thisApp.logIn(email, password);
            document.getElementById("login-email").value = "";
            document.getElementById("login-password").value = "";
        }
    }
    createRegisterFn() {
        const thisApp = this.#app
        return () => {
            let name = document.getElementById("register-name").value;
            let email = document.getElementById("register-email").value;
            let password = document.getElementById("register-pass").value;
            let passwordConfirm = document.getElementById("register-pass-confirm").value;
            if (password !== passwordConfirm) {
                alert("Passwords don't match");
                return;
            }
            thisApp.register(name, email, password);
            document.getElementById("register-name").value = "";
            document.getElementById("register-email").value = "";
            document.getElementById("register-pass").value = "";
            document.getElementById("register-pass-confirm").value = "";
        }
    }
    successLogIn() {
        //Closes the Log In and Register modals when the user logs in
        document.getElementById("login-modal").style.display = "none";
        document.getElementById("register-modal").style.display = "none";
    }
}
export default LogInController;