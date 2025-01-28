const observer = new MutationObserver((mutations) => {
  const y = document.getElementsByClassName("liste-imbriquee")[0];
  if (y) {
    const fetchDb = async (reference) => {
      try {
        const response = await fetch("http://localhost:5000/get-db", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch token");
        }
        return data.token;
      } catch (err) {
        console.error("Error fetching token:", err);
        throw err;
      }
    };

    console.log(fetchDb("/"));

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
