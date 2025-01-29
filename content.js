const observer = new MutationObserver(async (mutations) => {
  const y = document.getElementsByClassName("liste-imbriquee")[0];
  if (y) {
    async function fetchData() {
      const url = "http://localhost:5000/get-db";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({ reference: "/" });

      try {
        console.log("Making request to", url);
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: body,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        /* console.log(data); */
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    let data = await fetchData();

    /* data = data.data; */

    const extractedData = Object.entries(data.data).map(([key, value]) => {
      console.log(`Key: ${key}, Value:`, value);
      return {
        matiere: value.matiere,
        date: value.date,
        contenu: value.contenu,
      };
    });

    // Destructure the first (and only) item in the array
    const [{ matiere, date, contenu }] = extractedData;

    console.log(matiere, date, contenu);

    // Call the function
    const widget = document.createElement("div");
    widget.classList.add("widget-extension");
    widget.textContent = `Devoir de ${matiere} pour le ${date}: ${contenu}`;

    y.appendChild(widget);
    observer.disconnect(); // Stop observing once the element is found
  }
});

observer.observe(document.body, { childList: true, subtree: true });
