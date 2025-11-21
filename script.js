const cardsContainer = document.getElementById("cards");
const buttons = document.querySelectorAll("[data-period]");
let data = [];

async function loadData() {
  const response = await fetch("data.json");
  data = await response.json();
  renderCards("weekly");
}

function renderCards(period) {
  cardsContainer.innerHTML = "";

  data.forEach(item => {
    const title = item.title;
    const timeframe = item.timeframes[period];

    const previousLabel =
      period === "daily" ? "Yesterday" :
      period === "weekly" ? "Last Week" :
      "Last Month";

    const card = document.createElement("div");
    card.className = "card " + title.toLowerCase().replace(" ", "-");

    card.innerHTML = `
      <div class="card-top"></div>

      <div class="card-content">
        <div class="card-header">
          <h3>${title}</h3>
          <img src="images/icon-ellipsis.svg" alt="Menu">
        </div>

        <div class="hours">
          <p class="current-hours">${timeframe.current}hrs</p>
          <p class="previous-hours">${previousLabel} - ${timeframe.previous}hrs</p>
        </div>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderCards(btn.dataset.period);
  });
});

loadData();

