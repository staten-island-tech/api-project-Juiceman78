// Get the container where Digimon cards will go
const container = document.getElementById("app");

// connect css
import "./style.css";

async function getData() {
  try {
    const response = await fetch("https://digimon-api.vercel.app/api/digimon");

    if (response.status != 200) {
      throw new Error(response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getOneDigimon(name) {
  try {
    const response = await fetch(
      `https://digimon-api.vercel.app/api/digimon/name/${name}`
    );

    if (response.status != 200) {
      throw new Error(response);
    }

    const data = await response.json();
    return data[0]; // API returns array
  } catch (error) {
    console.error(error);
  }
}

function inject(digimon) {
  container.insertAdjacentHTML(
    "beforeend",
    `
    <div class="card bg-base-100 w-96 shadow-sm">
      <figure class="px-10 pt-10">
        <img
          src="${digimon.img}"
          alt="Digimon"
          class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="Name">${digimon.name}</h2>
        <h3 class="Level">${digimon.level}</h3>
        <div class="card-actions">
          <button class="Showmore" data-name="${digimon.name}">
            Show more
          </button>
        </div>
      </div>
    </div>
    `
  );
}

function showmore(digimon) {
  container.innerHTML = "";
  container.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="card bg-base-100 w-96 shadow-sm">
      <figure class="px-10 pt-10">
        <img
          src="${digimon.img}"
          alt="Digimon"
          class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="Name">${digimon.name}</h2>
        <h3 class="Level">${digimon.level}</h3>
        <button class="BackBtn">Back</button>
      </div>
    </div>
    `
  );

  document.querySelector(".BackBtn").addEventListener("click", loadAll);
}

container.addEventListener("click", async function (e) {
  if (e.target.classList.contains("Showmore")) {
    const name = e.target.dataset.name;

    container.innerHTML = "";

    const digimon = await getOneDigimon(name);
    if (digimon) {
      showmore(digimon);
    }
  }
});

async function loadAll() {
  container.innerHTML = "";
  const data = await getData();

  if (data) {
    data.forEach((digimon) => inject(digimon));
  }
}

loadAll();
