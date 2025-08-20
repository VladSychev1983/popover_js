export default class PopOver {
  constructor(container) {
    this.container = container;
  }
  renderWidget() {
    return `
    <div id=popover-wrapper>
    <button id="button" type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="Popover title">Click to toggle popover</button>
    </div>
    `;
  }
  renderPopover(title, content) {
    return `
    <div id="myPopover" class="popover" role="tooltip" aria-hidden="true">
    <div class="popover-content">
    <h3 class="popover-header">${title}</h3>
    <p class="popover-body">${content}</p>
    <div class="popover-arrow"></div>
    </div>
    </div>
    `;
  }
  insertWidget() {
    this.container.insertAdjacentHTML("beforeend", this.renderWidget());
    this.button = this.container.querySelector("button");
    const popoverContent = this.button.getAttribute("data-content");
    const popoverTitle = this.button.getAttribute("data-original-title");
    const popWrapper = this.container.querySelector("#popover-wrapper");
    popWrapper.insertAdjacentHTML(
      "beforeend",
      this.renderPopover(popoverTitle, popoverContent),
    );
    const popOver = this.container.querySelector("#myPopover");
    //обработка клика по кнопке.
    this.button.addEventListener("click", () => {
      this.togglePopover(popOver);
      console.log("button clicked");
    });

    //обработка клика вне кнопки.
    document.addEventListener("click", (event) => {
      if (
        popOver.classList.contains("show") &&
        !this.button.contains(event.target) &&
        !popOver.contains(event.target)
      ) {
        popOver.classList.remove("show");
        popOver.setAttribute("aria-hidden", "true");
      }
    });
    //this.getPosition(popOver);
  }

  getPosition(popOver) {
    popOver.style.display = "block";
    popOver.style.visibility = "hidden";
    popOver.style.opacity = "0";
    //получаем размеры и позицию кнопки.
    const buttonRect = this.button.getBoundingClientRect();
    const popoverRect = popOver.getBoundingClientRect();
    const top = buttonRect.top + window.scrollY - popoverRect.height - 10;
    const left =
      buttonRect.left +
      window.scrollX +
      buttonRect.width / 2 -
      popoverRect.width / 2;
    // Применяем рассчитанные стили
    popOver.style.top = `${top}px`;
    popOver.style.left = `${left}px`;
    popOver.style.visibility = "";
    popOver.style.opacity = "";
  }

  togglePopover(popOver) {
    const showIs = popOver.classList.toggle("show");
    if (showIs) {
      this.getPosition(popOver);
      popOver.setAttribute("aria-hidden", "false");
      popOver.style.display = "block";
    } else {
      popOver.setAttribute("aria-hidden", "true");
      popOver.style.display = "none";
    }
  }
}
