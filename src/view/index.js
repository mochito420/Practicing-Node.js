import { SignupForm } from "./components/signup/SignupForm.js";
import { LoginForm } from "./components/login/LoginForm.js";
import { ProfileCard } from "./components/profile/ProfileCard.js";
import { LogoutButton } from "./components/profile/LogoutButton.js";

addEventListener("DOMContentLoaded", () => {
  console.log("page was loaded succesfully");
  const app = document.querySelector("body");
  const path = window.location.pathname;

  if (path.startsWith("/signup")) {
    app.innerHTML = "<signup-form></signup-form>";
  } else if (path.startsWith("/login")) {
    app.innerHTML = "<login-form></login-form>";
  } else if (path.startsWith("/profile")) {
    app.innerHTML =
      "<profile-card></profile-card><logout-button></logout-button>";
  }
});
