const accordions = document.getElementsByClassName("accordion");

for (let i = 0; i < accordions.length; i++) {
  accordions[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

    for (let j = 0; j < accordions.length; j++) {
      const currentAccordion = accordions[j];
      if (currentAccordion != this) {
        currentAccordion.classList.remove("active");
        const currentPanel = currentAccordion.nextElementSibling;
        currentPanel.style.maxHeight = null;
      }
    }
  });
}
