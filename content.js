const observer = new MutationObserver((mutations) => {
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
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    // Call the function
    console.log(fetchData());

    const matiere = "SVT";
    const date = "06/01";
    const contenu = "Casser les burnes";
    const widget = document.createElement("div");
    widget.classList.add("widget-extension");
    widget.textContent = `Devoir de ${matiere} pour le ${date}: ${contenu}`;

    y.appendChild(widget);
    observer.disconnect(); // Stop observing once the element is found
  }
});

observer.observe(document.body, { childList: true, subtree: true });
