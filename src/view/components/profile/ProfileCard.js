export class ProfileCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // this.render();
    this.fetchUser();
  }

  async fetchUser() {
    try {
      const response = await fetch(
        "http://localhost:9000/api/users/info?id=2531430f-dd7e-4c4b-871b-862c56cbf7a3",
        { method: "GET" }
      );

      if (response.ok) {
        const data = await response.json();
        this.render(data.user);
      } else {
        console.error("failed fetching");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  render(user) {
    this.shadowRoot.innerHTML = /*html*/ `
        <style>${this.styles()}</style>
        <div class='container'>
          <picture><img src="${user.profilepic}" class="container__img"></picture>
          <h1 class="container__h1">${user.fullname}</h1>
          <p class="container__p">${user.username}</p>
        </div>
    `;
  }
  styles() {
    return /*css*/ `
    .container{
      color: #000;
      width : 100px;
      background: #fff;
      display:flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius:10px;
      padding:10px;
    } 
    .container__img{
      height:60px;
      width:60px;
      overflow: hidden;
      object-fit: cover;
      border: 4px solid #4A9DEC;
      border-radius: 999px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
    }
    .container__h1{
      margin: 0;
      padding: 10px 10px 0px 10px;
      font-size: 1rem;
      font-weight: bold;
      color: #000
    }
    .container__p{
      margin:0;
      font-size:0.9rem;
      font-weight:bold;
      color:#666
    }
    `;
  }
}

customElements.define("profile-card", ProfileCard);
