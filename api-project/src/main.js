async function getData() {
  try {
    // get data from API
    const response = await fetch(`https://digimon-api.vercel.app/api/digimon`);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      //converts reponse into json we can use
      const data = await response.json();
      console.log(data);
      document.getElementById("api-response").textContent = data.name;
    }
  } catch (error) {
    console.log(error);
  }
}

getData();
