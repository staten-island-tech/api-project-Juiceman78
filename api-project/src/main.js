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
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    `
  );
}

const data = await getData();
if (data) {
  data.forEach((digimon) => inject(digimon));
}
