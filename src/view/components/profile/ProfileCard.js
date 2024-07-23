export class ProfileCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
        <style>${this.styles()}</style>
        <div class='container'>
            Testing profile-card Component
        </div>
    `;
  }
  styles() {
    return /*css*/ `

    `;
  }
}

customElements.define("profile-card", ProfileCard);
