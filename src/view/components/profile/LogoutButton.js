export class LogoutButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.logout();
  }

  logout() {
    const button = this.shadowRoot.querySelector(".container__button");
    button.addEventListener("click", async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:9000/api/users/logout", {
          method: "POST",
          credentials: "include",
        });

        if(response.ok){
          window.location.href = "/login"
        } else {
          console.error("fail logout");
        }
      } catch (error) {
        console.error(`Error= ${error}`);
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
        <style>${this.styles()}</style>
        <div class='container'>
            <button class="container__button">
                <div class="container__svg-container">
                    <svg viewBox="0 0 512 512" class="container__svg"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg>
                </div>
                <div class="container__text">Logout</div>    
            </button>
        
        </div>
    `;
  }
  styles() {
    return /*css*/ `
        .container__button{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 45px;
            height: 45px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition-duration: .3s;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
            background-color: #f3f3f3;
        }
        .container__svg-container{
            width: 100%;
            transition-duration: .3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container__svg{
            width: 17px;
        }
        .container__text{
            position: absolute;
            right: 0%;
            width: 0%;
            opacity: 0;
            font-size: 1.2em;
            font-weight: 600;
            transition-duration: .3s;
        }
        .container__button:hover{
            width: 120px;
            border-radius: 5px;
            transition-duration: .3s;
        }
        .container__button:hover .container__svg-container {
            width: 30%;
            transition-duration: .3s;
            padding-left: 10px;
        }
        .container__button:hover .container__text{
            opacity: 1;
            width: 70%;
            transition-duration: .3s;
            padding-right: 5px;
        }
        .container__button:active{
            transform: translate(2px ,2px);
        }
    `;
  }
}

customElements.define("logout-button", LogoutButton);
