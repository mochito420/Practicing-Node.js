import { SignUp } from "./components/signup/SignUp.js";
import { LoginForm } from "./components/login/LoginForm.js";




addEventListener("DOMContentLoaded", () => {
  console.log("page was loaded succesfully");
  const app = document.querySelector(".app")
  const path = window.location.pathname

  if(path.startsWith("/signup")){
    app.innerHTML = "<sign-up><sign-up>"
  } else if(path.startsWith("/login")){
    app.innerHTML = "<login-form><login-form>"
  }
});


