const observer = new MutationObserver(async (mutations) => {
  const y = document.getElementsByClassName("liste-imbriquee")[0];
  if (y) {
    async function fetchData() {
      const url =
        "https://missing-work-endpoint-68px8fq1u-ivnogoods-projects.vercel.app/get-db";
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

    Object.entries(data.data).map(([key, value]) => {
      console.log(`Key: ${key}, Value:`, value);
      var divElement = document.getElementById(key);
      if (divElement != null) {
        console.log("Element exists");
      } else {
        console.log("Element does not exist");

        const widget = document.createElement("div");
        widget.id = key;
        widget.classList.add("widget-extension");
        widget.textContent = `Devoir de ${value.matiere} pour le ${value.date}: ${value.contenu}`;
        y.appendChild(widget);
      }
    });

    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
