const API_URL = "https://mono-backend-olusola.herokuapp.com/banks";

function handlePanel(panel) {
  if (panel && panel.style.maxHeight) {
    panel.innerHTML = null;
    panel.style.maxHeight = null;
  } else {
    panel.innerHTML = `
          <h4 class="panel__heading">
              Floof will be able to access your:
          </h4>
          <ul class="floof-list">
              <li class="floof-list__item">Account holder name</li>
              <li class="floof-list__item">Account type</li>
              <li class="floof-list__item">Account transaction history</li>
              <li class="floof-list__item">Account balance</li>
          </ul>
          <button class="btn__more-info" id="btn_moreInfo">More info</button>
        `;
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
}

function togglePopup(popup, clientY) {
  if (popup.style.visibility == "hidden") {
    popup.style.bottom = window.innerHeight - clientY + 30 + "px";
    popup.style.visibility = "visible";
  } else {
    popup.style.visibility = "hidden";
  }
}

function handlePopUp() {
  const btnInfo = document.getElementById("btn_moreInfo");
  if (btnInfo) {
    btnInfo.addEventListener("click", function (event) {
      const clientY = event.clientY;
      const popup = document.getElementById("popup");
      togglePopup(popup, clientY);
      setTimeout(() => {
        popup.style.visibility = "hidden";
      }, 4000);
    });
  }
}

function mountAccordions() {
  const accordions = document.getElementsByClassName("accordion");

  for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;

      handlePanel(panel);
      handlePopUp();

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

// Handle search text input
let timeout = null;
searchBox.addEventListener("keyup", function (event) {
  clearTimeout(timeout);
  event.preventDefault();
  const searchText = document.getElementById("searchBox").value;
  if (searchText != "") {
    timeout = setTimeout(() => {
      search(API_URL, searchText);
    }, 1000);
  } else {
    getBankLists(API_URL);
  }
});

window.onload = () => {
  getBankLists(API_URL);
};
