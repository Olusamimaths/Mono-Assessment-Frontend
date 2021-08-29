window.onload = () => {
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
        if (res.status == 200) {
          let content = "";
          const { data } = res;
          data.forEach((bank) => {
            content += `      
            <div class="banks__content">
                <div class="accordion">${bank.name}</div>
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
          });

          console.log(res);
        }
      });
  }

  getBankLists("http://localhost:3000/banks");
};
