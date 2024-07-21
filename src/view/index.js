import { SignupForm } from "./components/signup/SignupForm.js";
import { LoginForm } from "./components/login/LoginForm.js";


addEventListener("DOMContentLoaded", () => {
  console.log("page was loaded succesfully");
  const app = document.querySelector("body")
  const path = window.location.pathname

  if(path.startsWith("/signup")){
    app.innerHTML = "<signup-form></signup-form>"
  } else if(path.startsWith("/login")){
    app.innerHTML = "<login-form></login-form>"
  }
});


