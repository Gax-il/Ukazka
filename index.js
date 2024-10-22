const prumernaZnamkaElement = document.getElementById("prumerna_znamka");
const vstupZnamka = document.getElementById("znamka");
const vstupVaha = document.getElementById("vaha");
const pridatTlacitko = document.getElementById("pridat");
const znamkyDiv = document.getElementById("znamky");

const znamky = [];
const vahy = [];

pridatTlacitko.addEventListener("click", () => {
  const znamka = parseInt(vstupZnamka.value);
  const vaha = parseInt(vstupVaha.value);

  if (!isNaN(znamka) && !isNaN(vaha)) {
    znamky.push(znamka);
    vahy.push(vaha);

    spocitejPrumer();
    renderZnamkyList();
  }

  vstupZnamka.value = "";
  vstupVaha.value = "";
});

function spocitejPrumer() {
  let soucetVazenychZnamek = 0;
  let soucetVah = 0;

  for (let i = 0; i < znamky.length; i++) {
    soucetVazenychZnamek += znamky[i] * vahy[i];
    soucetVah += vahy[i];
  }

  const prumer = soucetVah !== 0 ? soucetVazenychZnamek / soucetVah : 0;
  prumernaZnamkaElement.innerHTML = prumer.toFixed(2);
}

function renderZnamkyList() {
  znamkyDiv.innerHTML = "";
  for (let i = 0; i < znamky.length; i++) {
    const div = document.createElement("div");
    div.classList.add("znamka-item");
    div.innerHTML = `
      <input type="number" value="${znamky[i]}" min="1" max="5" onchange="updateZnamka(${i}, this.value)" />
      <input type="number" value="${vahy[i]}" min="1" max="10" onchange="updateVaha(${i}, this.value)" />
      <button onclick="removeZnamka(${i})">X</button>
    `;
    znamkyDiv.appendChild(div);
  }
}

function updateZnamka(index, novyZnamka) {
  znamky[index] = parseInt(novyZnamka);
  spocitejPrumer();
}

function updateVaha(index, novaVaha) {
  vahy[index] = parseInt(novaVaha);
  spocitejPrumer();
}

function removeZnamka(index) {
  znamky.splice(index, 1);
  vahy.splice(index, 1);
  spocitejPrumer();
  renderZnamkyList();
}
