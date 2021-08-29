function mountAccordions() {
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
}

function createContent(res) {
  if (res.status == 200) {
    let content = "";
    const { data } = res;
    if (data.length == 0) {
      document.querySelector(
        ".banks"
      ).innerHTML = `<p style="text-align: center; color: black;">Nothing to show</p>`;
      return;
    }
    data.forEach((bank) => {
      content += `      
            <div class="banks__content">
            
                <div class="accordion">
                    <div class="banks_content__logo-name">
                    <img src="${bank.imgUrl}" alt="" class="bank-logo">
                    <p class="banks_content__bank-name">${bank.name}</p>
                    </div>
                </div>
                <div class="panel">
                    <h4 class="panel__heading">
                        Floof will be able to access your:
                    </h4>
                    <ul class="floof-list">
                        <li class="floof-list__item">Account holder name</li>
                        <li class="floof-list__item">Account type</li>
                        <li class="floof-list__item">Account transaction history</li>
                        <li class="floof-list__item">Account balance</li>
                    </ul>
                    <button class="btn__more-info">More info</button>
                </div>
            </div>
        `;
      document.querySelector(".banks").innerHTML = content;
      mountAccordions();
    });
  }
}

function getBankLists(url) {
  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      createContent(res);
    });
}

const searchBox = document.getElementById("searchBox");
function search(url, bankName) {
  fetch(`${url}/filter?key=${bankName}`, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      createContent(res);
    });
}

searchBox.addEventListener("keyup", function (event) {
  event.preventDefault();
  const searchText = document.getElementById("searchBox").value;
  if (searchText != "") {
    setTimeout(() => {
      search("http://localhost:3000/banks", searchText);
    }, 700);
  } else {
    getBankLists("http://localhost:3000/banks");
  }
});

window.onload = () => {
  getBankLists("http://localhost:3000/banks");
};
