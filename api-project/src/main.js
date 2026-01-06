// Get the container where Digimon cards will go
const container = document.getElementById("app");
// Fetch Digimon data from API
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

function inject(digimon) {
  container.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="card">
      <div class="text">${digimon.name}</div>
      <div class="text">${digimon.level}</div>
      <img class="img" src="${digimon.img}">
    </div>
    `
  );
}

const data = await getData();
if (data) {
  data.forEach((digimon) => inject(digimon));
}
