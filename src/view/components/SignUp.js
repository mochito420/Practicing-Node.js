export class SignUp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.submitForm();
  }

  submitForm() {
    const button = this.shadowRoot.querySelector(".container__button");
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const newUserData = {
        fullname: this.shadowRoot.querySelector(".container__input-fullname")
          .value,
        username: this.shadowRoot.querySelector(".container__input-username")
          .value,
        password: this.shadowRoot.querySelector(".container__input-password")
          .value,
      };
      console.log(newUserData);

      fetch("http://localhost:9000/users", {
        method: "POST",
        body: JSON.stringify(newUserData),
        headers: { "content-type": "application/json" },
      })
        .then((res) => res.json())
        .catch((error) => console.error("error", error))
        .then((response) => console.log("succes", response));
    });
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
        <style>${this.styles()}</style>
        <div class='container'>
            <h2 class="container__h1">Signup</h2>
            <p class="container__p">you are not registred yet?</p>
            <form class="container__Form">
                <input type="text" class="container__input container__input-fullname" placeholder="Full Name">
                <input type="text" class="container__input container__input-username" placeholder="User Name">
                <input type="password" class="container__input container__input-password" placeholder="Password">
                
                <button type="submit" class="container__button">Sing Up</button>
            </form>
        </div>
    `;
  }
  styles() {
    return /*css*/ `
        .container{
            color: #000;
            width : 400px;
            background: #fff;
            display:flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border-radius:10px;
        }
        .container__h1{
            margin:0;
            padding:10px;
        }
        .container__p{
            margin:0;
            padding:10px;
        }
        .container__form{
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            justify-content: center;
            gap:15px;
        }
        .container__input{
            padding:5px;
        }

    `;
  }
}

customElements.define("sign-up", SignUp);
